const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');
const APIKey = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { uploadProduct, uploadUpdateProduct } = require('../middleware/upload');
const { isAdmin } = require('../middleware/checkRole');

// router.post('/questions', QnAController.createQuestion)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetails);
router.post(
  '/',
  APIKey.APIKey,
  verifyToken,
  isAdmin,
  uploadProduct,
  productController.createProduct,
);
router.delete(
  '/:productId',
  APIKey.APIKey,
  verifyToken,
  isAdmin,
  productController.deleteProduct,
);
router.put(
  '/:productId',
  APIKey.APIKey,
  verifyToken,
  isAdmin,
  uploadUpdateProduct,
  productController.updateProduct,
);
// router.put(
//   '/image/admin',
//   APIKey.APIKey,
//   verifyToken,
//   isAdmin,
//   productController.updateProductImage,
// );
router.get(
  '/packaging/types',
  APIKey.APIKey,
  verifyToken,
  isAdmin,
  productController.getPackaging,
);
router.get(
  '/types/admin',
  APIKey.APIKey,
  verifyToken,
  isAdmin,
  productController.getProductType,
);

module.exports = router;
