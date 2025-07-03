const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation',
      required: true,
    },
    midtrans_transaction_id: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'settlement', 'expire', 'cancel', 'deny'],
      default: 'pending',
    },
    payment_type: {
      type: String,
    },
    snap_token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
