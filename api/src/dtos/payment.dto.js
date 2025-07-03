const { z } = require('zod');

const createPaymentSchema = z.object({
  body: z.object({
    reservationId: z.string({
      required_error: 'Reservation ID is required',
    }),
  }),
});

module.exports = { createPaymentSchema };