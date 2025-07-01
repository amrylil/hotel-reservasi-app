// src/controllers/reservation.controller.js

const reservationService = require('../services/reservation.service');

const createReservationHandler = async (req, res) => {
  try {
    // userId diambil dari middleware 'verifyToken' yang sudah Anda buat
    const userId = req.userId;
    const reservationData = req.body;
    
    const reservation = await reservationService.createReservation(userId, reservationData);

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

module.exports = {
  createReservationHandler,
  getAllReservationsHandler,
};