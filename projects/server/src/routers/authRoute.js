const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController, googleLoginController } = require('./../controllers');
const APIKey = require('../middleware/APIKey');
const recaptcha = require('../middleware/recaptcha');

router.post(
  '/register',
  APIKey.APIKey,
  recaptcha.verify,
  authController.userCreate,
  authController.sendVerifyEmail,
);

router.post(
  '/login',
  // APIKey.APIKey,
  // recaptcha.verify,
  authController.userLogin,
);

// //keepLogin (byToken)
router.get(
  '/get-user',
  APIKey.APIKey,
  auth.verifyToken,
  authController.getUserById,
);

router.post('/send-verify', APIKey.APIKey, authController.sendVerifyEmail);
router.post('/verify-email', APIKey.APIKey, authController.verifyAccount);
router.post('/send-reset', APIKey.APIKey, authController.sendResetPasswordForm);
router.patch('/reset-password', APIKey.APIKey, authController.resetPassword);
router.patch('/password/:userId', APIKey.APIKey, authController.changePassword);
router.post('/google-login', APIKey.APIKey, googleLoginController.googleLogin);

module.exports = router;
