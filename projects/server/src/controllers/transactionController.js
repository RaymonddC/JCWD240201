const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const db = require('../models');
const { getCart, getCartByPk } = require('../helpers/cartHelper');
const { getUserByPk } = require('../helpers/authHelper');
const Cart = db.cart;
const Product = db.product;
const User = db.user;
const PackagingType = db.packaging_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;

const checkout = async (req, res, next) => {
  try {
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
