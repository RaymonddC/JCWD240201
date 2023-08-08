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
  // const t = await sequelize.transaction();
  try {
    // console.log('Getting all categories');
    const txStatus = await TxStatus.findAll();

    return res.status(200).send({
      success: true,
      message: 'get all Transaction Status success',
      data: txStatus,
    });
  } catch (error) {
    next(error);
    // return res.send({
    //   success: false,
    //   message: error.message,
    // });
  }
};

module.exports = { getAllTxStatus };
