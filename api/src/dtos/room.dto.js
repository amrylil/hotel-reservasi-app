const { z } = require('zod');

const CreateRoomSchema = z.object({
  room_number: z.string().min(1, 'room_number wajib diisi'),
  room_type: z.string().min(1, 'room_type wajib diisi'),
  price_per_night: z.coerce.number().positive(),
  facilities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

class CreateRoomDTO {
  constructor(data) {
    const parsed = CreateRoomSchema.parse(data);
    this.room_number = parsed.room_number;
    this.room_type = parsed.room_type;
    this.price_per_night = parsed.price_per_night;
    this.facilities = parsed.facilities || [];
    this.images = parsed.images || [];
    this.availability = true;
  }
}

const UpdateRoomSchema = z.object({
  room_number: z.string().min(1).optional(),
  room_type: z.string().min(1).optional(),
  price_per_night: z.coerce.number().positive().optional(),
  facilities: z.array(z.string()).optional(),
  availability: z.boolean().optional(),
  images: z.array(z.string()).optional(),
});

class UpdateRoomDTO {
  constructor(data) {
    const parsedData = UpdateRoomSchema.parse(data);

    for (const key in parsedData) {
      if (parsedData[key] !== undefined) {
        this[key] = parsedData[key];
      }
    }
  }
}

module.exports = {
  CreateRoomDTO,
  UpdateRoomDTO,
};
