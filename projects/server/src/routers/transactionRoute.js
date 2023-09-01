const express = require('express');
const router = express.Router();
const { APIKey } = require('../middleware/APIKey');
const { transactionController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
const { uploadPayment } = require('../middleware/upload');

router.post('/', verifyToken, transactionController.newCheckout);
router.get('/', verifyToken, transactionController.getAllTransaction);
router.get('/:id', verifyToken, transactionController.getTransaction);
router.delete('/:id', verifyToken, transactionController.newCancel);
router.post(
  '/upload',
  APIKey,
  verifyToken,
  uploadPayment,
  transactionController.uploadPayment,
);
router.post(
  '/midtrans-payment',
  verifyToken,
  transactionController.handleMidtransPayment,
);
router.post('/pay', transactionController.payment);

module.exports = router;
