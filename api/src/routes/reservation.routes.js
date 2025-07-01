// src/routes/reservation.routes.js

const express = require('express');
const router = express.Router();

const { createReservationHandler, getAllReservationsHandler } = require('../controllers/reservation.controller');
const { validate, createReservationSchema } = require('../dtos/reservation.dto');
const verifyToken = require('../middlewares/auth.middleware'); // Middleware autentikasi Anda

router.use(verifyToken);

router.post(
  '/', 
  validate(createReservationSchema),
  createReservationHandler
);

router.get('/', getAllReservationsHandler);

module.exports = router;