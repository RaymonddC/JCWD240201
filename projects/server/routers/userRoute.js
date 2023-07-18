const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');

router.get('/', APIKey, userController.getUserData);
router.put('/', APIKey, verifyToken, userController.updateUserData);
// sementara
// router.post('/', userController.bcrypt);

module.exports = router;
