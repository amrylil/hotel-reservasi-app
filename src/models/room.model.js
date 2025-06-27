const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room_number: { type: String, required: true, unique: true },
  room_type: { type: String, required: true },
  price_per_night: { type: Number, required: true },
  facilities: [String],
  availability: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);
