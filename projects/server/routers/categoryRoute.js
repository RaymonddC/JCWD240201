const express = require('express');
const router = express.Router();

const { categoryController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

router.get('/', APIKey, verifyToken, categoryController.getAllCategories);
router.post(
  '/',
  APIKey,
  verifyToken,
  isAdmin,
  categoryController.createCategory,
);
router.put(
  '/:id',
  APIKey,
  verifyToken,
  isAdmin,
  categoryController.updateCategory,
);
router.delete(
  '/:id',
  APIKey,
  verifyToken,
  isAdmin,
  categoryController.deleteCategory,
);

module.exports = router;
