const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { uploadProfile } = require('../middleware/upload');

router.get('/', APIKey, userController.getUserData);
router.put(
  '/',
  APIKey,
  verifyToken,
  uploadProfile,
  userController.updateUserData,
);
// sementara
// router.post('/', userController.bcrypt);

module.exports = router;
