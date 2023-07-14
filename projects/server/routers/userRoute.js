const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');

router.get('/', APIKey, userController.getUserData);
router.put('/', APIKey, userController.updateUserData);

module.exports = router;
