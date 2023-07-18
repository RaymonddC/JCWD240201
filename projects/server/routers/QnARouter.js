const express = require('express');
const router = express.Router();

const { QnAController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');

router.post('/questions', APIKey, QnAController.createQuestion);
router.get('/questions', APIKey, QnAController.getQuestions);
router.get('/answers', QnAController.getAnswers);

module.exports = router;
