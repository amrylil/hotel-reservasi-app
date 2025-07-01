const { z } = require('zod');

const CreateRoomTypeSchema = z.object({
  name: z.string().min(1, 'Room type name is required'),
  description: z.string().optional(),
  capacity: z.number().int().positive('Capacity must be a positive number'),
});

class CreateRoomTypeDTO {
  constructor(data) {
    const parsed = CreateRoomTypeSchema.parse(data);
    this.name = parsed.name;
    this.description = parsed.description;
    this.capacity = parsed.capacity;
  }
}

const UpdateRoomTypeSchema = z.object({
  name: z.string().min(1, 'Room type name is required').optional(),
  description: z.string().optional(),
  capacity: z.number().int().positive('Capacity must be a positive number').optional()
});

class UpdateRoomTypeDTO {
  constructor(data) {
    const parsed = UpdateRoomTypeSchema.parse(data);
    this.name = parsed.name;
    this.description = parsed.description;
    this.capacity = parsed.capacity;
  }
}

module.exports = {
  CreateRoomTypeDTO,UpdateRoomTypeDTO
};
