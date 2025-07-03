const paymentService = require('../services/payment.service');

const createTransactionHandler = async (req, res) => {
  try {
    const { reservationId } = req.body;
    // req.userId didapat dari middleware otentikasi
    const snapToken = await paymentService.createPaymentTransaction(
      req.userId,
      reservationId
    );
    res.status(200).json({ status: 'success', data: { snapToken } });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const notificationHandler = async (req, res) => {
  try {
    await paymentService.handleMidtransNotification(req.body);
    // Kirim respons 200 OK ke Midtrans untuk konfirmasi
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
};

module.exports = {
  createTransactionHandler,
  notificationHandler,
};
