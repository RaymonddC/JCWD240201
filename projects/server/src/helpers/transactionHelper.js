const db = require('../models');
const TransactionHistory = db.transaction_history;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const TransactionStatus = db.transaction_status;
const Product = db.product;
const User = db.user;
const PackagingType = db.packaging_type;
const ProductType = db.product_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;
const { Op } = require('sequelize');
const { sequelize } = require('../models');

const getUserTransactions = async (includes, whereQuery) => {
  try {
    if (whereQuery.dates.startDate) {
      whereQuery.transaction = {
        ...whereQuery.transaction,
        [Op.and]: [
          sequelize.where(
            sequelize.fn('date', sequelize.col('Transaction.createdAt')),
            '>=',
            whereQuery.dates.startDate,
          ),
          sequelize.where(
            sequelize.fn('date', sequelize.col('Transaction.createdAt')),
            '<=',
            whereQuery.dates.endDate,
          ),
        ],
      };
    }
    return await Transaction.findAndCountAll({
      include: [
        {
          model: TransactionHistory,
          include: [
            {
              model: TransactionStatus,
              attributes: ['status'],
            },
          ],
          where: whereQuery.transactionHistory,
        },
        {
          model: TransactionDetail,
          include: [
            {
              model: Product,
              attributes: ['packaging_type_id', 'product_type_id'],
              include: [
                {
                  model: PackagingType,
                  attributes: ['type_name'],
                },
                {
                  model: ProductType,
                  attributes: ['unit'],
                },
              ],
            },
          ],
          where: whereQuery.transactionDetail,
          right: true,
        },
      ],
      where: {
        ...whereQuery.transaction,
      },
      order: [['createdAt', 'DESC']],
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getUserTransactions,
};
