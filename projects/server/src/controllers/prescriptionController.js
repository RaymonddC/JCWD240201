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

const uploadPrescription = async (req, res, next) => {
  const auth = req.user;
  const image = req.file;
  const { userId, productId } = req.body;
  try {
    const response = await Cart.create({
      user_id: userId,
      product_id: productId,
      qty: qty || 1,
      prescription_image: image.path,
      confirmation: false,
      is_check: false,
    });
    res.status(200).send({
      success: true,
      message: 'Prescription uploaded successfully',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadPrescription };
