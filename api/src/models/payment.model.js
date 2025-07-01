const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash', 'transfer', 'qris'], required: true },
  paid_at: { type: Date, default: Date.now }
}, {
  timestamps: true
});j

module.exports = mongoose.model('Payment', paymentSchema);
