/**
 * @param {Object} data
 * @param {string} data.room_number
 * @param {string} data.room_type
 * @param {number} data.price_per_night
 * @param {string[]} data.facilities
 */
class CreateRoomDTO {
  constructor({ room_number, room_type, price_per_night, facilities }) {
    if (!room_number || typeof room_number !== 'string') {
      throw new Error('room_number harus berupa string dan wajib diisi');
    }

    if (!room_type || typeof room_type !== 'string') {
      throw new Error('room_type harus berupa string dan wajib diisi');
    }

    if (!price_per_night || typeof price_per_night !== 'number') {
      throw new Error('price_per_night harus berupa angka dan wajib diisi');
    }

    this.room_number = room_number;
    this.room_type = room_type;
    this.price_per_night = price_per_night;
    this.facilities = Array.isArray(facilities) ? facilities : [];
    this.availability = true;
  }
}

module.exports = { CreateRoomDTO };
