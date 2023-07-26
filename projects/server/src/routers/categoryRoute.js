const express = require('express');
const router = express.Router();

const { categoryController } = require('../controllers');
const APIKey = require('../middleware/APIKey');

// router.post('/questions', QnAController.createQuestion)
router.get('/',  categoryController.getAllCategories);
router.get('/labels', categoryController.getAllCategories)

module.exports = router;
