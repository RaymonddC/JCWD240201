const db = require('../models');
const txHistoryDB = db.transaction_history;
const userDB = db.user;
const transactionStatusDB = db.transaction_status;
const {
  getRevenueQuery,
  validateDate,
  getTotalTransactionQuery,
  generateDate,
  getUserTransactionQuery,
  getTopSaleProductQuery,
  validateIsValueExist,
} = require('../helpers/transactionHistoryHelper');
const { sequelize } = require('../models');
const moment = require('moment');
const { processTransaction } = require('../helpers/stockHistoryHelper');

const updateTxHistory = async (req, res, next) => {
  const t = await sequelize.transaction();
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

    if (transaction_status_id === 3)
      await processTransaction(transaction_id, req.user.id, t);

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

    await t.commit();
    return res.status(200).send({
      success: true,
      message: 'Update transaction history success',
      data: txCreate,
    });
  } catch (error) {
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
    validateDate(startDate, endDate, todayDate);
    const data = await getRevenueQuery({
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
    console.log('Transaction Statuses:', getTransactionStatuses);

    let result = await Promise.all(
      getTransactionStatuses.map(async (row) => {
        try {
          const data = await db.sequelize.query(
            `SELECT COUNT(*) AS count_of_valid_transactions
            FROM "transaction_histories"
            WHERE "transaction_status_id" = :transaction_status_id
            AND "is_active" = true`,
            {
              replacements: {
                transaction_status_id: row.dataValues.id,
              },
              type: db.sequelize.QueryTypes.SELECT,
              logging: console.log, // Debug query
            },
          );

          return {
            id: row.dataValues.id,
            status: row.dataValues.status,
            total: parseInt(data[0].count_of_valid_transactions),
          };
        } catch (error) {
          console.error('Query Error:', error);
          throw error;
        }
      }),
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
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
