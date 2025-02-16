const express = require('express');

const router = express.Router();

const { rajaongkircController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');

router.get('/province', 
           // APIKey, verifyToken,
           rajaongkircController.getProvince);
router.get('/city', 
           // APIKey, verifyToken, 
           rajaongkircController.getCity);
router.post('/', 
            // APIKey, verifyToken,
            rajaongkircController.shippmentMethod);

module.exports = router;
