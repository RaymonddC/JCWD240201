const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController } = require('./../controllers');
const APIKey = require('../middleware/APIKey');

// router.post('/register', authController.userCreate, authController.sendVerifLink);
router.post('/login', authController.userLogin);

// //keepLogin (byToken)
// router.get('/getUser', auth.verifyToken, authController.getUserById);

router.post('/sendVerify', APIKey.APIKey, authController.sendVerifyEmail);
router.post('/verifyEmail', APIKey.APIKey, authController.verifyAccount);

module.exports = router;
