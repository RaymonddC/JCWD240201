const express = require('express');
const router = express.Router();

const { stockController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

router.post(
  '/',
  APIKey,
//   verifyToken,
//   isAdmin,
  stockController.createDataStock,
);
router.get('/', APIKey, stockController.getStockHistoryType)

module.exports = router;
