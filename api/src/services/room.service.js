const Room = require('../models/room.model');

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
  }
};

module.exports = RoomService;
