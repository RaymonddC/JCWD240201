const db = require('../models');
const Cart = db.cart;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const Product = db.product;
const User = db.user;
const PackagingType = db.packaging_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;
const { Op } = require('sequelize');
const { sequelize } = require('../models');

const getUserTransactions = async (includes, whereQuery) => {
  try {
    const today = new Date();
    return await Transaction.findAndCountAll({
      include: [
        {
          model: TransactionDetail,
          attributes: {
            exclude: [],
            // include: [[sequelize.fn('COUNT', sequelize.col('qty')), 'prodQty']],
          },
          //   include: [
          //     { model: PackagingType, attributes: ['type_name'] },
          //     {
          //       model: Promotion,
          //       where: {
          //         [Op.and]: [
          //           { limit: { [Op.gt]: 0 } },
          //           { date_start: { [Op.lte]: today } },
          //           { date_end: { [Op.gte]: today } },
          //         ],
          //       },
          //       required: false,
          //     },
          //     { model: ClosedStock },
          //   ],
        },
      ],
      attributes: {
        // include: [[sequelize.fn('sum', sequelize.col('qty')), 'cartQty']],
      },
      where: whereQuery,
      order: [['createdAt', 'DESC']],
      // limit: Number(limitPage),
      // offset: (Number(page) - 1) * limitPage,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserTransactions,
};
