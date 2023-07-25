const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const db = require('../models');
const { getCart, getCartByPk } = require('../helpers/cartHelper');
const { getUserByPk } = require('../helpers/authHelper');
const Cart = db.cart;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const PackagingType = db.packaging_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;

const checkout = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const transaction = await Transaction.create({});
    //create transaction
    //create transactionDetail
    return res.status(200).send({
      success: true,
      message: 'Checkout Success',
      // data: rows,
      // pageCount: count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout };
