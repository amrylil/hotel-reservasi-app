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

  async getAvailableRooms(req, res) {
    try {
      const { check_in, check_out } = req.query;

      if (!check_in || !check_out) {
        return res.status(400).json({
          message: 'Parameter check_in dan check_out wajib diisi.',
        });
      }

      const availableRooms = await RoomService.findRoomsByDateAvailability(
        new Date(check_in),
        new Date(check_out)
      );

      res.status(200).json(availableRooms);
    } catch (error) {
      console.error('Error finding available rooms:', error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
  },

  async create(req, res) {
    try {
      const imageUrls = req.files ? req.files.map((file) => file.path) : [];
      const roomData = {
        ...req.body,
        images: imageUrls,
      };
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

  async getById(req, res) {
    try {
      const room = await RoomService.getRoomById(req.params.id);
      if (!room) {
        return res.status(404).json(errorResponse('Room not found'));
      }
      res.json(successResponse(room));
    } catch (err) {
      res.status(400).json(errorResponse(err.message));
    }
  },

  // THIS IS THE EXISTING, CORRECT UPDATE METHOD
  async update(req, res) {
    try {
      const dto = new UpdateRoomDTO(req.body);
      const updated = await RoomService.updateRoom(req.params.id, dto);
      if (!updated) {
        return res.status(404).json(errorResponse('Room not found'));
      }
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

  async delete(req, res) {
    try {
      const deleted = await RoomService.deleteRoom(req.params.id);
      if (!deleted) {
        return res.status(404).json(errorResponse('Room not found'));
      }
      res.json(successResponse(null, 'Room deleted successfully'));
    } catch (err) {
      res.status(400).json(errorResponse(err.message));
    }
  },
};

module.exports = RoomController;
