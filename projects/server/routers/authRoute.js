const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController } = require('./../controllers');

router.post('/sendVerify', authController.sendVerifyEmail)
router.post('/verifyEmail', authController.verifyAccount)

module.exports = router;
