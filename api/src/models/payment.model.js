const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // Referensi ke reservasi yang dibayar
  reservation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Reservation', 
    required: true 
  },
  // ID unik transaksi dari sistem kita yang dikirim ke Midtrans
  midtrans_transaction_id: { 
    type: String, 
    required: true,
    unique: true
  },
  // Jumlah yang dibayar
  amount: { 
    type: Number, 
    required: true 
  },
  // Status transaksi yang diterima dari webhook Midtrans
  status: { 
    type: String, 
    enum: ['pending', 'settlement', 'expire', 'cancel', 'deny'], 
    default: 'pending' 
  },
  // Tipe pembayaran yang dipilih pengguna (misal: 'bca_va', 'gopay')
  payment_type: { 
    type: String 
  },
  // Token untuk membuka popup Midtrans Snap di frontend
  snap_token: { 
    type: String 
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);