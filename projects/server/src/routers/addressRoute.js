const express = require('express');

const router = express.Router();

const { addressController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');

router.get('/', APIKey, verifyToken, addressController.getAllAddress);
router.post('/', APIKey, verifyToken, addressController.createAddress);
router.put('/:id', APIKey, verifyToken, addressController.updateAddress);
router.patch('/:id', APIKey, verifyToken, addressController.updateIsMain);
router.patch(
  '/selected/:id',
  APIKey,
  verifyToken,
  addressController.updateIsSelected,
);
router.delete('/:id', APIKey, verifyToken, addressController.deleteAddress);

module.exports = router;
