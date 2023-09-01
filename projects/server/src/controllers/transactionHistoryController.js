const fs = require('fs');
const transporter = require('../helpers/transporter');
const db = require('../models');
const txHistoryDB = db.transaction_history;
const transactionDB = db.transaction;
const userDB = db.user;
const transactionStatusDB = db.transaction_status;
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
const moment = require('moment');
const { processTransaction } = require('../helpers/stockHistoryHelper');

const updateTxHistory = async (req, res, next) => {
  const t = await sequelize.transaction();
  const template = fs.readFileSync(
    './src/helpers/verifyEmailTemplate.html',
    'utf-8',
  );
  try {
    const { transaction_id, transaction_status_id, notes, email } = req.body;
    let txCreate;

    const txFind = await txHistoryDB.findOne({
      where: { is_active: true, transaction_id },
    });

    if (
      Object.keys(txFind).length &&
      txFind.transaction_status_id >= transaction_status_id
    )
      throw { code: 400, message: 'Unavailable Status' };

    // const tempCompile = await Handlebars.compile(data);
    if (transaction_status_id === 3)
      await processTransaction(transaction_id, req.user.id, t);
    // throw {};

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

    if (email) {
      const emailFind = await userDB.findOne({ where: { email } });
      if (!emailFind) throw { message: 'email not found' };
    }
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
    console.log(error);
    await t.rollback();
    next(error);
  }
};

const getRevenue = async (req, res, next) => {
  try {
    const { start_date, end_date, sort_type, sort_order, today_date } =
      req.query;
    const startDate = start_date ? new Date(start_date + '') : null;
    const endDate = end_date ? new Date(end_date + '') : null;
    const todayDate = today_date ? new Date(today_date + '') : null;
    console.log('today =>> ' + todayDate);
    validateDate(startDate, endDate, todayDate);
    const data = await getRevenueQuery({
      startDate,
      endDate,
      todayDate,
      sort_type,
      sort_order,
    });
    console.log(`data ==> ${data}`);
    let newData;
    if (startDate && endDate) {
      const generatedDate = generateDate(startDate, endDate, sort_order);
      newData = validateIsValueExist({
        data,
        generatedDate,
        sort_type,
        sort_order,
        key: 'today_revenue',
      });
    } else {
      newData = data.length
        ? {
            date: moment(todayDate).format('LL'),
            today_revenue: Number(data[0].today_revenue),
          }
        : { date: moment(todayDate).format('LL'), today_revenue: 0 };
    }
    return res.status(200).send({
      success: true,
      message: 'Get revenue Successfully',
      data: newData,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalTransaction = async (req, res, next) => {
  try {
    const { start_date, end_date, sort_type, sort_order, today_date } =
      req.query;
    const startDate = start_date ? new Date(start_date + '') : null;
    const endDate = end_date ? new Date(end_date + '') : null;
    const todayDate = today_date ? new Date(today_date + '') : null;
    validateDate(startDate, endDate, todayDate);
    const data = await getTotalTransactionQuery({
      startDate,
      endDate,
      todayDate,
      sort_type,
      sort_order,
    });

    let newData;
    if (startDate && endDate) {
      const generatedDate = generateDate(startDate, endDate, sort_order);
      newData = validateIsValueExist({
        data,
        generatedDate,
        sort_type,
        sort_order,
        key: 'total_transaction',
      });
    } else {
      newData = data.length
        ? {
            date: moment(todayDate).format('LL'),
            total_transaction: Number(data[0].total_transaction),
          }
        : { date: moment(todayDate).format('LL'), total_transaction: 0 };
    }
    return res.status(200).send({
      success: true,
      message: 'Get total transaction successfully',
      data: newData,
    });
  } catch (error) {
    next(error);
  }
};

const getUserTransaction = async (req, res, next) => {
  try {
    const { start_date, end_date, sort_type, sort_order, today_date } =
      req.query;
    const startDate = start_date ? new Date(start_date + '') : null;
    const endDate = end_date ? new Date(end_date + '') : null;
    const todayDate = today_date ? new Date(today_date + '') : null;
    validateDate(startDate, endDate, todayDate);
    const data = await getUserTransactionQuery({
      startDate,
      endDate,
      todayDate,
      sort_type,
      sort_order,
    });

    let newData;
    if (startDate && endDate) {
      const generatedDate = generateDate(startDate, endDate, sort_order);
      newData = validateIsValueExist({
        data,
        generatedDate,
        sort_type,
        sort_order,
        key: 'total_user',
      });
    } else {
      newData = data.length
        ? {
            date: moment(todayDate).format('LL'),
            total_user: Number(data[0].total_user),
          }
        : { date: moment(todayDate).format('LL'), total_user: 0 };
    }

    return res.status(200).send({
      success: true,
      message: 'Get total user successfully',
      data: newData,
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

const getAllTransactionStatusTotal = async (req, res, next) => {
  try {
    const getTransactionStatuses = await transactionStatusDB.findAll();

    let result = await Promise.all(
      getTransactionStatuses.map(async (row) => {
        try {
          const data = await db.sequelize.query(
            `SELECT COUNT(*) AS count_of_valid_transactions
            FROM pharmacy.transaction_histories
            WHERE transaction_status_id = :transaction_status_id
            AND is_active = 1;`,
            {
              replacements: {
                transaction_status_id: row.dataValues.id,
              },
              type: db.sequelize.QueryTypes.SELECT,
            },
          );
          return {
            status: row.dataValues.status,
            total: data.length ? data[0].count_of_valid_transactions : 0,
          };
        } catch (error) {
          throw { error };
        }
      }),
    );

    return res.status(200).send({
      success: true,
      message: 'Get all transaction status total successfully',
      data: result,
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
  getAllTransactionStatusTotal,
};
