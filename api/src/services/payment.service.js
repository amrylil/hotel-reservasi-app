const midtransClient = require('midtrans-client');
const crypto = require('crypto');
const Reservation = require('../models/reservation.model');
const Payment = require('../models/payment.model');

const snap = new midtransClient.Snap({
  isProduction: false, // Gunakan false untuk Sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const createPaymentTransaction = async (userId, reservationId) => {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) throw new Error('Reservation not found');
  if (reservation.status === 'confirmed')
    throw new Error('Reservation already paid');

  const totalAmount = 150000; // Ganti dengan kalkulasi harga asli

  const transaction_id = `RESERVATION-${reservation._id}-${Date.now()}`;
  const parameter = {
    transaction_details: {
      order_id: transaction_id,
      gross_amount: totalAmount,
    },
  };

  const transaction = await snap.createTransaction(parameter);
  const snapToken = transaction.token;

  await Payment.create({
    reservation: reservationId,
    amount: totalAmount,
    midtrans_transaction_id: transaction_id,
    status: 'pending',
    snap_token: snapToken,
  });

  return snapToken;
};

const handleMidtransNotification = async (notification) => {
  const hash = crypto
    .createHash('sha512')
    .update(
      `${notification.order_id}${notification.status_code}${notification.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
    )
    .digest('hex');

  if (hash !== notification.signature_key) {
    throw new Error('Invalid signature key');
  }

  const { transaction_status, order_id, payment_type } = notification;

  const payment = await Payment.findOne({ midtrans_transaction_id: order_id });
  if (!payment) return;

  payment.status = transaction_status;
  payment.payment_type = payment_type;

  if (transaction_status === 'settlement') {
    await Reservation.findByIdAndUpdate(payment.reservation, {
      status: 'confirmed',
    });
  }

  await payment.save();
};

const checkAndUpdatePaymentStatus = async (orderId) => {
  try {
    const transactionStatus = await coreApi.transaction.status(orderId);
    const { transaction_status, payment_type } = transactionStatus;

    const payment = await Payment.findOne({ midtrans_transaction_id: orderId });
    if (!payment) return null; // Tidak ditemukan

    payment.status = transaction_status;
    payment.payment_type = payment_type;

    if (
      transaction_status === 'settlement' &&
      payment.reservation.status !== 'confirmed'
    ) {
      await Reservation.findByIdAndUpdate(payment.reservation, {
        status: 'confirmed',
      });
    }

    await payment.save();
    return payment; // Kembalikan data pembayaran yang sudah diupdate
  } catch (error) {
    console.error('Error checking Midtrans status:', error);
    throw new Error('Failed to check transaction status');
  }
};

module.exports = {
  createPaymentTransaction,
  checkAndUpdatePaymentStatus,
  handleMidtransNotification,
};
