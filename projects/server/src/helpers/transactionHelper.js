const db = require('../models');
const TransactionHistory = db.transaction_history;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const TransactionStatus = db.transaction_status;
const Product = db.product;
const User = db.user;
const AddressDB = db.address;
const PackagingType = db.packaging_type;
const ProductType = db.product_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;
const { Op } = require('sequelize');
const { sequelize } = require('../models');

const getUserTransactions = async (whereQuery, orderBy) => {
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

    let includes = [];
    if (!whereQuery.transaction.hasOwnProperty('user_id')) {
      includes = [{ model: User }];
    }

    let order = [['createdAt', 'DESC']];
    if (orderBy.sortType) {
      console.log('test', orderBy);
      order = [[orderBy.sortType, orderBy.sortOrder]];
    }

    return await Transaction.findAndCountAll({
      include: [
        ...includes,
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
          attributes: {
            include: [
              // [sequelize.literal('COUNT(transaction_details.id)'), 'txDetail'],
            ],
          },
          where: whereQuery.transactionDetail,
          right: true,
        },
      ],
      where: {
        ...whereQuery.transaction,
      },
      order: order,
      ...whereQuery.pagination,
    });
  } catch (error) {
    throw error;
  }
};

const getTransactionById = async (id, admin) => {
  try {
    let includes = [];
    if (admin) {
      includes = [{ model: User }];
    }
    return await Transaction.findByPk(id, {
      include: [
        ...includes,
        {
          model: TransactionHistory,
          include: [
            {
              model: TransactionStatus,
              attributes: ['status'],
            },
          ],
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
          // attributes: {
          //   include: [
          //     // [sequelize.literal('COUNT(transaction_details.id)'), 'txDetail'],
          //   ],
          // },
          // right: true,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserTransactions,
  getTransactionById,
};
