const express = require('express');

const router = express.Router();

const { prescriptionCartController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

router.get(
  '/',
  APIKey,
  verifyToken,
  isAdmin,
  prescriptionCartController.getAllPrescriptionCartProductList,
);
router.get(
  '/:cart_id/:product_id/:unit_conversion',
  APIKey,
  verifyToken,
  isAdmin,
  prescriptionCartController.getPrescriptionCartProduct,
);
router.post(
  '/',
  APIKey,
  verifyToken,
  isAdmin,
  prescriptionCartController.createPrescriptionCartProduct,
);
router.put(
  '/:id',
  APIKey,
  verifyToken,
  isAdmin,
  prescriptionCartController.updatePrescriptionCartProduct,
);
router.delete(
  '/:id',
  APIKey,
  verifyToken,
  isAdmin,
  prescriptionCartController.deletePrescriptionCartProduct,
);

module.exports = router;
