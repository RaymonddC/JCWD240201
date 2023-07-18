const express = require('express');
const router = express.Router();


const { QnAController } = require('../controllers');
const APIKey = require('../middleware/APIKey');

router.post('/questions', QnAController.createQuestion)
router.get('/questions', QnAController.getQuestions)


module.exports = router;