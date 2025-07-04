const paymentService = require('../services/payment.service');

const createTransactionHandler = async (req, res) => {
  try {
    const { reservationId } = req.body;
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

const manualCheckStatusHandler = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const payment = await paymentService.findPaymentByReservationId(
      reservationId
    );

    if (!payment || !payment.midtrans_transaction_id) {
      return res
        .status(200)
        .json({ status: 'ok', message: 'No payment initiated.' });
    }

    const updatedPayment = await paymentService.checkAndUpdatePaymentStatus(
      payment.midtrans_transaction_id
    );

    // <<< TAMBAHAN PENANGANAN NULL >>>
    if (!updatedPayment) {
      // Ini terjadi jika transaksi 404 di Midtrans
      return res
        .status(200)
        .json({
          status: 'ok',
          message: 'Transaction not found on payment gateway yet.',
        });
    }

    res.status(200).json({
      status: 'success',
      message: 'Status checked successfully.',
      data: {
        transaction_status: updatedPayment.status,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createTransactionHandler,
  notificationHandler,
  manualCheckStatusHandler,
};
