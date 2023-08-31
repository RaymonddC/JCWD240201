const express = require('express');
const router = express.Router();

const { txStatusController } = require('../controllers');

// router.post('/questions', QnAController.createQuestion)
router.get('/', txStatusController.getAllTxStatus);

module.exports = router;
