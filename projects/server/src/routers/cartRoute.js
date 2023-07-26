const express = require('express');
const router = express.Router();

const { cartController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');

const { verifyToken } = require('../middleware/auth');

// router.post('/questions', QnAController.createQuestion)
router.get('/', APIKey, verifyToken, cartController.getCarts);
router.post('/', APIKey, verifyToken, cartController.addToCart);
router.put('/:id', APIKey, verifyToken, cartController.updateCart);
router.delete('/:id', verifyToken, cartController.deleteCart);

module.exports = router;
