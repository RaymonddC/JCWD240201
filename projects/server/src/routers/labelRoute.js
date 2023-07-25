const express = require('express');
const router = express.Router();

const { labelController } = require('../controllers');
const APIKey = require('../middleware/APIKey');

// router.post('/questions', QnAController.createQuestion)
router.get('/', labelController.getLabels);
router.get('/:id', labelController.getProductLabels);

module.exports = router;
