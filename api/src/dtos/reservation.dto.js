// src/dtos/reservation.dto.js

const { z } = require('zod');

// Skema untuk membuat reservasi baru
const createReservationSchema = z.object({
  body: z.object({
    room: z.string({
      required_error: 'Room ID is required',
    }),
    check_in: z.coerce.date({
      required_error: 'Check-in date is required',
    }),
    check_out: z.coerce.date({
      required_error: 'Check-out date is required',
    }),
  }),
});

// Middleware untuk validasi (bisa diletakkan di file terpisah jika mau)
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).send(err.errors);
  }
};

module.exports = {
  createReservationSchema,
  validate,
};