const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user_name: { type: String, required: true },  
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  check_in: { type: Date, required: true },
  check_out: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Reservation', reservationSchema);
