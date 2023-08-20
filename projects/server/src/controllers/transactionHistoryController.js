const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const transporter = require('../helpers/transporter');
const db = require('../models');
const txHistoryDB = db.transaction_history;
const transactionDB = db.transaction;
const userDB = db.user;
const { QueryTypes } = require('sequelize');
const {
  getRevenueQuery,
  validateDate,
  getTotalTransactionQuery,
  generateDate,
  getUserTransactionQuery,
  getTopSaleProductQuery,
  validateIsValueExist,
} = require('../helpers/transactionHistoryHelper');
const txDB = db.transaction;
const { sequelize } = require('../models');

const updateTxHistory = async (req, res, next) => {
  console.log('>>>> update tx history');
  const t = await sequelize.transaction();
  const template = fs.readFileSync(
    './src/helpers/verifyEmailTemplate.html',
    'utf-8',
  );
  try {
    const { transaction_id, transaction_status_id, notes, email } = req.body;
    let txCreate;
    // const tempCompile = await Handlebars.compile(data);
    if (email) {
      const emailFind = await userDB.findOne({ where: { email } });
      if (!emailFind) throw { message: 'email not found' };
    }
    const txFind = await txHistoryDB.findOne({
      where: { is_active: true, transaction_id },
    });
    if (txFind !== null) {
      const txUpdate = await txHistoryDB.update(
        { is_active: false },
        {
          where: { is_active: true, transaction_id },
          transacton: t,
        },
      );
    }
    txCreate = await txHistoryDB.create(
      {
        is_active: true,
        notes,
        transaction_id,
        transaction_status_id,
      },
      { transacton: t },
    );
    // if (notes) {
    //   const txNotes = await txDB.update(
    //     { notes: notes },
    //     {
    //       where: { id: transaction_id },
    //       transaction: t,
    //     },
    //   );
    // }

    await t.commit();
    return res.status(200).send({
      success: true,
      message: 'Update transaction history success',
      data: txCreate,
    });
  } catch (error) {
    next(error);
  }
};

const getRevenue = async (req, res, next) => {
  try {
    const { start_date, end_date, sort_type, sort_order } = req.query;
    const startDate = new Date(start_date + '');
    const endDate = new Date(end_date + '');
    validateDate(startDate, endDate);
    const data = await getRevenueQuery({
      startDate,
      endDate,
      sort_type,
      sort_order,
    });
    const generatedDate = generateDate(startDate, endDate, sort_order);
    let newData = validateIsValueExist({
      data,
      generatedDate,
      sort_type,
      sort_order,
      key: 'today_revenue',
    });
    return res.status(200).send({
      success: true,
      message: 'Get revenue Successfully',
      data: newData,
      orginal: data,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalTransaction = async (req, res, next) => {
  try {
    const { start_date, end_date, sort_type, sort_order } = req.query;
    const startDate = new Date(start_date + '');
    const endDate = new Date(end_date + '');
    validateDate(startDate, endDate);
    const data = await getTotalTransactionQuery({
      startDate,
      endDate,
      sort_type,
      sort_order,
    });
    const generatedDate = generateDate(startDate, endDate, sort_order);
    let newData = validateIsValueExist({
      data,
      generatedDate,
      sort_type,
      sort_order,
      key: 'total_transaction',
    });
    return res.status(200).send({
      success: true,
      message: 'Get revenue Successfully',
      data: newData,
    });
  } catch (error) {
    next(error);
  }
};

const getUserTransaction = async (req, res, next) => {
  try {
    const { start_date, end_date, sort_type, sort_order } = req.query;
    const startDate = new Date(start_date + '');
    const endDate = new Date(end_date + '');
    validateDate(startDate, endDate);
    const data = await getUserTransactionQuery({
      startDate,
      endDate,
      sort_type,
      sort_order,
    });
    const generatedDate = generateDate(startDate, endDate, sort_order);
    const newData = validateIsValueExist({
      data,
      generatedDate,
      sort_type,
      sort_order,
      key: 'total_user',
    });
    return res.status(200).send({
      success: true,
      message: 'Get revenue Successfully',
      data: newData,
      original: data,
    });
  } catch (error) {
    next(error);
  }
};

const getTopSaleProduct = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    const startDate = new Date(start_date + '');
    const endDate = new Date(end_date + '');
    validateDate(startDate, endDate);
    const data = await getTopSaleProductQuery(startDate, endDate);
    res.status(200).send({
      success: true,
      message: 'Get revenue Successfully',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateTxHistory,
  getRevenue,
  getTotalTransaction,
  getUserTransaction,
  getTopSaleProduct,
};
