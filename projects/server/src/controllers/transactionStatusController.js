const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const TxStatus = db.transaction_status;
const transporter = require('../helpers/transporter');
const { sequelize } = require('../models');

const getAllTxStatus = async (req, res, next) => {
  try {
    const txStatus = await TxStatus.findAll();

    return res.status(200).send({
      success: true,
      message: 'get all Transaction Status success',
      data: txStatus,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTxStatus };
