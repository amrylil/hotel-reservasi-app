const midtransClient = require('midtrans-client');
const crypto = require('crypto');
const Reservation = require('../models/reservation.model');
const Payment = require('../models/payment.model');

// Inisialisasi Midtrans Client (gunakan keys Sandbox untuk development)
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

/**
 * 1. Membuat transaksi pembayaran di Midtrans
 */
const createPaymentTransaction = async (userId, reservationId) => {
  const reservation = await Reservation.findById(reservationId).populate('room');
  if (!reservation) throw new Error('Reservation not found');
  if (reservation.status === 'confirmed') throw new Error('Reservation has already been paid');
  
  // Asumsi: Anda perlu memastikan reservasi ini milik user yang login (userId)
  
  // Hitung total harga (contoh: durasi x harga per malam)
  const duration = (new Date(reservation.check_out) - new Date(reservation.check_in)) / (1000 * 3600 * 24);
  const totalAmount = duration * reservation.room.price_per_night;

  const transaction_id = `RESERVATION-${reservation._id}-${Date.now()}`;
  const parameter = {
    transaction_details: {
      order_id: transaction_id,
      gross_amount: totalAmount,
    },
  };

  const transaction = await snap.createTransaction(parameter);
  const snapToken = transaction.token;

  // Buat record pembayaran di database Anda
  await Payment.create({
    reservation: reservationId,
    amount: totalAmount,
    midtrans_transaction_id: transaction_id,
    status: 'pending',
    snap_token: snapToken,
  });

  return snapToken;
};

/**
 * 2. Menangani notifikasi webhook dari Midtrans
 */
const handleMidtransNotification = async (notification) => {
  // Verifikasi signature key untuk keamanan
  const hash = crypto.createHash('sha512')
    .update(`${notification.order_id}${notification.status_code}${notification.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
    .digest('hex');
  
  if (hash !== notification.signature_key) {
    throw new Error('Invalid signature');
  }

  const { transaction_status, order_id, payment_type } = notification;

  const payment = await Payment.findOne({ midtrans_transaction_id: order_id });
  if (!payment) return;

  payment.status = transaction_status;
  payment.payment_type = payment_type;
  
  // Jika pembayaran berhasil, update status reservasi menjadi 'confirmed'
  if (transaction_status === 'settlement') {
    await Reservation.findByIdAndUpdate(payment.reservation, {
      status: 'confirmed',
    });
  }

  await payment.save();
};

module.exports = {
  createPaymentTransaction,
  handleMidtransNotification
};