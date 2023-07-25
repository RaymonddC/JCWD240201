const express = require('express');

const router = express.Router();

const { transactionController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
const { uploadProfile } = require('../middleware/upload');

// router.get('/', APIKey, userController.getUserData);
// router.put(
//   '/',
//   verifyToken,
//   uploadProfile,
//   userController.updateUserData,
// );
// sementara
router.post('/', verifyToken, transactionController.checkout);

module.exports = router;
