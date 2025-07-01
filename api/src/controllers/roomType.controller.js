const { CreateRoomTypeDTO } = require('../dtos/roomType.dto');
const RoomTypeService = require('../services/roomType.service');
const { successResponse, errorResponse } = require('../utils/response');

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
      const dto = new CreateRoomTypeDTO(req.body);
      const data = await RoomTypeService.create(dto);
      res.status(201).json(successResponse(data, 'Room type created successfully'));
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json(errorResponse('Validation failed', err.errors));
      }
      res.status(400).json(errorResponse(err.message));
    }
  },

  // async update(req, res) {
  //   try {
  //     const dto = new UpdateRoomTypeDTO(req.body);
  //     const updated = await RoomTypeService.update(req.params.id, dto);
  //     res.json(successResponse(updated, 'Room type updated successfully'));
  //   } catch (err) {
  //     if (err instanceof ZodError) {
  //       return res.status(400).json(errorResponse('Validation failed', err.errors));
  //     }
  //     res.status(400).json(errorResponse(err.message));
  //   }
  // }
};

module.exports = RoomTypeController;
