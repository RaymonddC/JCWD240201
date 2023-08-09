const express = require('express');
const router = express.Router();
const { APIKey } = require('../middleware/APIKey');
const { transactionController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
const { uploadPayment } = require('../middleware/upload');

router.post('/', verifyToken, transactionController.checkout);
router.get('/', verifyToken, transactionController.getAllTransaction);
router.get('/:id', verifyToken, transactionController.getTransaction);
router.post(
  '/upload',
  APIKey,
  verifyToken,
  uploadPayment,
  transactionController.uploadPayment,
);

module.exports = router;
