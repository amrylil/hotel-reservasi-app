const { z } = require('zod');

const CreateRoomSchema = z.object({
  room_number: z.string().min(1, 'room_number wajib diisi'),
  room_type: z.string().min(1, 'room_type wajib diisi'),
  price_per_night: z.number().positive('price_per_night harus berupa angka positif'),
  facilities: z.array(z.string()).optional(),
});

class CreateRoomDTO {
  constructor(data) {
    const parsed = CreateRoomSchema.parse(data);
    this.room_number = parsed.room_number;
    this.room_type = parsed.room_type;
    this.price_per_night = parsed.price_per_night;
    this.facilities = parsed.facilities || [];
    this.availability = true; // default room tersedia
  }
}

const UpdateRoomSchema = z.object({
  room_number: z.string().min(1).optional(),
  room_type: z.string().min(1).optional(),
  price_per_night: z.number().positive().optional(),
  facilities: z.array(z.string()).optional(),
  availability: z.boolean().optional()
});

class UpdateRoomDTO {
  constructor(data) {
    const parsed = UpdateRoomSchema.parse(data);
    this.room_number = parsed.room_number;
    this.room_type = parsed.room_type;
    this.price_per_night = parsed.price_per_night;
    this.facilities = parsed.facilities;
    this.availability = parsed.availability;
  }
}

module.exports = {
  CreateRoomDTO,
  UpdateRoomDTO,
};
