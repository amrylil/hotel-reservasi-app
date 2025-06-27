const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  capacity: Number
}, { timestamps: true });

module.exports = mongoose.model('RoomType', roomTypeSchema);