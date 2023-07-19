const express = require('express');
const router = express.Router();

const { QnAController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');

router.post('/questions', APIKey, QnAController.createQuestion);
router.get('/questions/:id', APIKey, QnAController.getQuestionDetails);
router.get('/questions', APIKey, QnAController.getQuestions);
router.post('/answers',  QnAController.postAnswer)
router.get('/answers', APIKey, QnAController.getAnswers);
router.put('/answers', APIKey, QnAController.updateAnswer);


module.exports = router;
