const express = require('express');
const router = express.Router();
const {
  createTransactionHandler,
  notificationHandler,
  manualCheckStatusHandler,
} = require('../controllers/payment.controller');
const verifyToken = require('../middlewares/auth.middleware');
const { validate } = require('../utils/validator');
const { createPaymentSchema } = require('../dtos/payment.dto');

router.post(
  '/',
  verifyToken,
  validate(createPaymentSchema),
  createTransactionHandler
);

router.get(
  '/manual-check/:reservationId',
  verifyToken,
  manualCheckStatusHandler
);

router.post('/notification', notificationHandler);
// router.get('/status/:orderId', verifyToken, checkStatusHandler);

module.exports = router;
