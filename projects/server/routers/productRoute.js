const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');
const APIKey = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { uploadProduct } = require('../middleware/upload');

// router.post('/questions', QnAController.createQuestion)
router.get('/', productController.getAllProduct);
router.post(
  '/',
  APIKey.APIKey,
  verifyToken,
  uploadProduct,
  productController.createProduct,
);
router.delete(
  '/:productId',
  APIKey.APIKey,
  verifyToken,
  productController.deleteProduct,
);

module.exports = router;
