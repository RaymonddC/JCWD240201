const express = require('express');
const router = express.Router();

const { txHistoryController} = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

// router.post('/questions', QnAController.createQuestion)
router.post('/', APIKey, verifyToken, txHistoryController.updateTxHistory);

module.exports = router;
