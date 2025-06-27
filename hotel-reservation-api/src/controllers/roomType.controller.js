const RoomTypeService = require('../services/roomType.service');

const RoomTypeController = {
  async getAll(req, res) {
    try {
      const data = await RoomTypeService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async create(req, res) {
    try {
      const data = await RoomTypeService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = RoomTypeController;
