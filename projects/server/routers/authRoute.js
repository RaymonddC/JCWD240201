const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController } = require('./../controllers');
const APIKey = require('../middleware/APIKey');

router.post(
  '/register',
  authController.userCreate,
  authController.sendVerifyEmail,
);

router.post('/login', APIKey.APIKey, authController.userLogin);

// //keepLogin (byToken)
router.get(
  '/getUser',
  APIKey.APIKey,
  auth.verifyToken,
  authController.getUserById,
);

router.post('/sendVerify', APIKey.APIKey, authController.sendVerifyEmail);
router.post('/verifyEmail', APIKey.APIKey, authController.verifyAccount);
router.post('/sendReset', APIKey.APIKey, authController.sendResetPasswordForm);
router.patch('/resetPassword', APIKey.APIKey, authController.resetPassword);

module.exports = router;
