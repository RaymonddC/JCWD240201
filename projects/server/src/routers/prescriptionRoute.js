const express = require('express');
const router = express.Router();

const { prescriptionController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');

// router.post('/', APIKey, prescriptionController.uploadPrescription);
// router.get('/:id',APIKey, labelController.getProductLabels);

module.exports = router;
