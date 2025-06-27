const RoomType = require('../models/roomType.model');

const RoomTypeService = {
  async getAll() {
    return await RoomType.find();
  },
  async create(data) {
    const roomType = new RoomType(data);
    return await roomType.save();
  }
};

module.exports = RoomTypeService;