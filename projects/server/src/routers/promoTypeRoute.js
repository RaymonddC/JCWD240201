const express = require('express');
const router = express.Router();
const { promoTypeController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

router.get(
  '/',
  APIKey,
  verifyToken,
  isAdmin,
  promoTypeController.getPromotionType,
);

module.exports = router;
