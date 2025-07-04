const midtransClient = require('midtrans-client');
const Reservation = require('../models/reservation.model');
const Payment = require('../models/payment.model');

// Inisialisasi Snap dan Core API
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const createPaymentTransaction = async (userId, reservationId) => {
  const reservation = await Reservation.findById(reservationId).populate(
    'room'
  );
  if (!reservation) throw new Error('Reservation not found');
  if (reservation.status === 'confirmed')
    throw new Error('Reservation already paid');

  if (!reservation.room || !reservation.room.price_per_night) {
    throw new Error('Room details or price per night is missing.');
  }

  const checkIn = new Date(reservation.check_in);
  const checkOut = new Date(reservation.check_out);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 1;
  const totalAmount = nights * reservation.room.price_per_night;

  const transaction_id = `RESERVATION-${reservation._id}-${Date.now()}`;
  const parameter = {
    transaction_details: {
      order_id: transaction_id,
      gross_amount: totalAmount,
    },
    item_details: [
      {
        id: reservation.room._id,
        price: reservation.room.price_per_night,
        quantity: nights,
        name: `Booking Room for ${nights} night(s)`,
      },
    ],
    customer_details: {
      first_name: 'Customer Name', // Ganti dengan nama user
      email: 'customer@example.com', // Ganti dengan email user
    },
  };

  const transaction = await snap.createTransaction(parameter);
  const snapToken = transaction.token;

  // Logika "Update atau Buat Baru" untuk mencegah data duplikat
  let payment = await Payment.findOne({ reservation: reservationId });

  if (payment) {
    // Jika sudah ada, UPDATE datanya
    payment.amount = totalAmount;
    payment.midtrans_transaction_id = transaction_id;
    payment.snap_token = snapToken;
    payment.status = 'pending';
    await payment.save();
    console.log(`Payment document UPDATED for reservation ${reservationId}`);
  } else {
    // Jika belum ada, CREATE yang baru
    await Payment.create({
      reservation: reservationId,
      amount: totalAmount,
      midtrans_transaction_id: transaction_id,
      status: 'pending',
      snap_token: snapToken,
    });
    console.log(
      `New payment document CREATED for reservation ${reservationId}`
    );
  }

  return snapToken;
};

const checkAndUpdatePaymentStatus = async (orderId) => {
  try {
    const transactionStatus = await coreApi.transaction.status(orderId);
    const { transaction_status, payment_type } = transactionStatus;

    const payment = await Payment.findOne({
      midtrans_transaction_id: orderId,
    }).populate('reservation');
    if (!payment) return null;

    payment.status = transaction_status;
    payment.payment_type = payment_type;

    if (
      transaction_status === 'settlement' &&
      payment.reservation.status !== 'confirmed'
    ) {
      await Reservation.findByIdAndUpdate(payment.reservation._id, {
        status: 'confirmed',
      });
    }

    await payment.save();
    return payment;
  } catch (error) {
    const isMidtrans404 =
      error.response &&
      error.response.data &&
      error.response.data.status_code === '404';
    if (isMidtrans404) {
      console.log(
        `INFO: Transaksi dengan orderId ${orderId} tidak ditemukan di Midtrans (ini wajar).`
      );
      return null;
    }
    console.error(
      'CRITICAL ERROR checking Midtrans status:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Failed to check transaction status with Midtrans.');
  }
};

const findPaymentByReservationId = async (reservationId) => {
  const payment = await Payment.findOne({ reservation: reservationId });
  return payment;
};

// Fungsi handleMidtransNotification dinonaktifkan sesuai permintaan untuk tidak memakai webhook
const handleMidtransNotification = async (notification) => {
  try {
    const statusResponse = await coreApi.transaction.notification(notification);
    const { order_id, transaction_status, fraud_status, payment_type } =
      statusResponse;
    const payment = await Payment.findOne({
      midtrans_transaction_id: order_id,
    });
    if (!payment) {
      console.error(`Payment with order_id ${order_id} not found.`);
      return;
    }
    payment.status = transaction_status;
    payment.payment_type = payment_type;
    if (transaction_status === 'settlement' && fraud_status === 'accept') {
      await Reservation.findByIdAndUpdate(payment.reservation, {
        status: 'confirmed',
      });
    }
    await payment.save();
  } catch (error) {
    console.error(
      'Invalid notification received from Midtrans:',
      error.message
    );
    throw new Error('Invalid notification');
  }
};

module.exports = {
  createPaymentTransaction,
  checkAndUpdatePaymentStatus,
  findPaymentByReservationId,
  handleMidtransNotification, // Pastikan ini juga di-comment jika tidak dipakai
};
