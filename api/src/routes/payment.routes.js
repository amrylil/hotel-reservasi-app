const express = require('express');
const router = express.Router();
const { createTransactionHandler, notificationHandler } = require('../controllers/payment.controller');
const { createPaymentSchema } = require('../dtos/payment.dto');
const verifyToken = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware'); // Asumsi Anda punya ini

// Endpoint untuk pengguna memulai pembayaran (perlu login)
router.post(
  '/',
  verifyToken,
  validate(createPaymentSchema),
  createTransactionHandler
);

// Endpoint untuk menerima webhook dari Midtrans (harus publik)
router.post('/notification', notificationHandler);

module.exports = router;