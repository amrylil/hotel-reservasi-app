const RoomService = require('../services/room.service');
const { CreateRoomDTO, UpdateRoomDTO } = require('../dtos/room.dto');
const { successResponse, errorResponse } = require('../utils/response');
const { ZodError } = require('zod');

const RoomController = {
  async getAll(req, res) {
    try {
      const rooms = await RoomService.getAllRooms();
      res.json(successResponse(rooms));
    } catch (err) {
      res.status(500).json(errorResponse(err.message));
    }
  },

  async getAvailable(req, res) {
    try {
      const rooms = await RoomService.getAvailableRooms();
      res.json(successResponse(rooms));
    } catch (err) {
      res.status(500).json(errorResponse(err.message));
    }
  },

  async create(req, res) {
    try {
      const imageUrls = req.files ? req.files.map((file) => file.path) : [];

      const roomData = {
        ...req.body,
        images: imageUrls,
      };
      // console.log('DATA YANG AKAN DISIMPAN:', roomData);
      const dto = new CreateRoomDTO(roomData);

      const room = await RoomService.createRoom(dto);
      res.status(201).json(successResponse(room, 'Room created successfully'));
    } catch (err) {
      if (err instanceof ZodError) {
        return res
          .status(400)
          .json(errorResponse('Validation failed', err.errors));
      }
      res.status(400).json(errorResponse(err.message));
    }
  },

  async update(req, res) {
    try {
      const dto = new UpdateRoomDTO(req.body);
      const updated = await RoomService.updateRoom(req.params.id, dto);
      res.json(successResponse(updated, 'Room updated successfully'));
    } catch (err) {
      if (err instanceof ZodError) {
        return res
          .status(400)
          .json(errorResponse('Validation failed', err.errors));
      }
      res.status(400).json(errorResponse(err.message));
    }
  },
};

module.exports = RoomController;
