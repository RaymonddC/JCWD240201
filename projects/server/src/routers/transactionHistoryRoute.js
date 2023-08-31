const express = require('express');
const router = express.Router();

const { txHistoryController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

// router.post('/questions', QnAController.createQuestion)
router.post('/', APIKey, verifyToken, txHistoryController.updateTxHistory);
router.get(
  '/revenue',
  APIKey,
  verifyToken,
  isAdmin,
  txHistoryController.getRevenue,
);
router.get(
  '/total-transaction',
  APIKey,
  verifyToken,
  isAdmin,
  txHistoryController.getTotalTransaction,
);
router.get(
  '/total-user',
  APIKey,
  verifyToken,
  isAdmin,
  txHistoryController.getUserTransaction,
);
router.get(
  '/top-sale',
  APIKey,
  verifyToken,
  isAdmin,
  txHistoryController.getTopSaleProduct,
);

module.exports = router;
