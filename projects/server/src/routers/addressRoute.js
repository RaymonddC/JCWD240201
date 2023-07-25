const express = require('express');

const router = express.Router();

const { addressController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');

router.get('/', APIKey, verifyToken, addressController.getAllAddress);
router.get('/province', APIKey, verifyToken, addressController.getProvince);
router.get('/city', APIKey, verifyToken, addressController.getCity);
router.post('/', APIKey, verifyToken, addressController.createAddress);
router.put('/:id', APIKey, verifyToken, addressController.updateAddress);
router.patch('/:id', APIKey, verifyToken, addressController.updateIsMain);
router.delete('/:id', APIKey, verifyToken, addressController.deleteAddress);

module.exports = router;
