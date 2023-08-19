const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController } = require('./../controllers');
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
  APIKey.APIKey,
  recaptcha.verify,
  authController.userLogin,
);

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
router.patch('/password/:userId', APIKey.APIKey, authController.changePassword);

module.exports = router;
