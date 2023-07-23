const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');
const APIKey = require('../middleware/APIKey');

// router.post('/questions', QnAController.createQuestion)

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetails)


module.exports = router;
