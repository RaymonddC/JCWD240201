const express = require('express');
const router = express.Router();
const { cartController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { uploadPrescription } = require('../middleware/upload');
const { isAdmin, isUser } = require('../middleware/checkRole');

router.get('/', APIKey, verifyToken, cartController.getCarts);
router.post(
  '/',
  APIKey,
  verifyToken,
  isUser,
  uploadPrescription,
  cartController.addToCart,
);
router.put('/:id', APIKey, verifyToken, isUser, cartController.updateCart);
router.delete('/:id', verifyToken, cartController.deleteCart);
router.get(
  '/prescription',
  APIKey,
  verifyToken,
  isAdmin,
  cartController.getAllPrescriptionsCarts,
);
router.get(
  '/prescription/:id',
  APIKey,
  verifyToken,
  isAdmin,
  cartController.getPrescriptionCart,
);
router.patch(
  '/:id',
  APIKey,
  verifyToken,
  isAdmin,
  cartController.updateConfirmationPrescriptionCart,
);

module.exports = router;
