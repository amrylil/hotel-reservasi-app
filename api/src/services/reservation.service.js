// src/services/reservation.service.js

const Reservation = require('../models/reservation.model');
const Room = require('../models/room.model');
const User = require('../models/user.model'); // Asumsi model user Anda ada di sini

/**
 * Membuat reservasi baru
 * @param {string} userId - ID pengguna yang login
 * @param {object} reservationData - Data dari request body (room, check_in, check_out)
 */
const createReservation = async (userId, reservationData) => {
  const { room: roomId, check_in, check_out } = reservationData;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }
  if (!room.availability) {
    throw new Error('Room is currently not available for booking');
  }

  const conflictingReservation = await Reservation.findOne({
    room: roomId,
    status: { $in: ['pending', 'confirmed'] }, // Cek status yang masih aktif
    $or: [{ check_in: { $lt: check_out }, check_out: { $gt: check_in } }],
  });

  if (conflictingReservation) {
    throw new Error('Room is not available for the selected dates');
  }

  const newReservation = new Reservation({
    user_name: user.name,
    user: userId,
    room: roomId,
    check_in,
    check_out,
  });

  await newReservation.save();
  return newReservation;
};

/**
 * Mendapatkan semua reservasi (misalnya untuk admin)
 */
const getAllReservations = async () => {
  return await Reservation.find().populate('room');
};

function getUserReservations(userId) {
  return Reservation.find({ user: userId })
    .populate('room')
    .sort({ createdAt: -1 });
}

async function getReservationById(id, userId) {
  const resv = await Reservation.findOne({ _id: id, user: userId }).populate(
    'room'
  );
  if (!resv) throw new Error('Reservation not found');
  return resv;
}

module.exports = {
  createReservation,
  getAllReservations,
  getUserReservations,
  getReservationById,
};
