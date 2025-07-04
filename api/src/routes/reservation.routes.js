// src/routes/reservation.routes.js

const express = require('express');
const router = express.Router();

const {
  createReservationHandler,
  getAllReservationsHandler,
  detail,
  myReservations,
} = require('../controllers/reservation.controller');
const {
  validate,
  createReservationSchema,
} = require('../dtos/reservation.dto');
const verifyToken = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.post('/', validate(createReservationSchema), createReservationHandler);

router.get('/', getAllReservationsHandler);

router.get('/my', myReservations);

router.get('/:id', detail);

module.exports = router;
