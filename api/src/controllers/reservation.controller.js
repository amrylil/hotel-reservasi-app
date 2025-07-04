const reservationService = require('../services/reservation.service');

const createReservationHandler = async (req, res) => {
  try {
    const userId = req.userId; // ✅ pakai req.userId
    const reservationData = req.body;

    const reservation = await reservationService.createReservation(
      userId,
      reservationData
    );

    res.status(201).json({
      status: 'success',
      message: 'Reservation created successfully',
      data: reservation,
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getAllReservationsHandler = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.status(200).json({
      status: 'success',
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

const myReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getUserReservations(
      req.userId
    );
    res.status(200).json({ status: 'success', data: reservations });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const detail = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.id,
      req.userId
    );
    res.status(200).json({ status: 'success', data: reservation });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  createReservationHandler,
  getAllReservationsHandler,
  myReservations,
  detail,
};
