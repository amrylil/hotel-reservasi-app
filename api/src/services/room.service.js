const Room = require('../models/room.model');
const Reservation = require('../models/reservation.model');

const RoomService = {
  async getAllRooms() {
    return await Room.find();
  },

  async getAvailableRooms() {
    return await Room.find({ availability: true });
  },

  async createRoom(data) {
    const room = new Room(data);
    return await room.save();
  },

  async getRoomById(id) {
    return await Room.findById(id);
  },
  async updateRoom(id, data) {
    return await Room.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteRoom(id) {
    return await Room.findByIdAndDelete(id);
  },

  async findRoomsByDateAvailability(check_in, check_out) {
    const reservedRooms = await Reservation.find(
      {
        check_in: { $lt: check_out },
        check_out: { $gt: check_in },
      },
      'room_id'
    );

    const unavailableRoomIds = [
      ...new Set(reservedRooms.map((reservation) => reservation.room_id)),
    ];

    return await Room.find({
      _id: { $nin: unavailableRoomIds },
      availability: true,
    });
  },

  async updateRoom(id, data) {
    return await Room.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteRoom(id) {
    return await Room.findByIdAndDelete(id);
  },
};

module.exports = RoomService;
