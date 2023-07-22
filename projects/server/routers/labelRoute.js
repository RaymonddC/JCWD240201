const express = require('express');
const router = express.Router();

const { labelController } = require('../controllers');
const APIKey = require('../middleware/APIKey');

// router.post('/questions', QnAController.createQuestion)
router.get('/',  labelController.getLabels);


module.exports = router;
