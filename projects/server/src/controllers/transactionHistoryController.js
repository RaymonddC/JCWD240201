const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const txHistoryDB = db.transaction_history;
const transporter = require('../helpers/transporter');
const { sequelize } = require('../models');

const updateTxHistory = async (req, res, next) => {
  console.log('>>>> update tx history')
  // const t = await sequelize.transaction();
  try {
    const { transaction_id, transaction_status_id } = req.body;
    let txCreate;
    const txFind = await txHistoryDB.findOne({
      where: { is_active: true, transaction_id },
    });
    if (txFind !== null) {
      const txUpdate = await txHistoryDB.update(
        { is_active: false },
        {
          where: { is_active: true, transaction_id },
        },
      );
    }
    txCreate = await txHistoryDB.create({
      is_active: true,
      transaction_id,
      transaction_status_id,
    });

    // await t.commit();
    return res.status(200).send({
      success: true,
      message: 'Update transaction history success',
      data: txCreate,
    });
  } catch (error) {}
};

module.exports = { updateTxHistory };
