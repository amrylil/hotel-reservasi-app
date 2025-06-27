const RoomService = require('../services/room.service');
const { CreateRoomDTO } = require('../dtos/room.dto'); 

const RoomController = {
  async getAll(req, res) {
    try {
      const rooms = await RoomService.getAllRooms();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getAvailable(req, res) {
    try {
      const rooms = await RoomService.getAvailableRooms();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const roomDTO = new CreateRoomDTO(req.body);
      const room = await RoomService.createRoom(roomDTO);
      res.status(201).json(room);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = RoomController;
