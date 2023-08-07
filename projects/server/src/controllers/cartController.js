const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('../models');
const { getCart, getCartByPk, getUserCarts } = require('../helpers/cartHelper');
const { getUserByPk } = require('../helpers/authHelper');
const Cart = db.cart;
const Product = db.product;
const User = db.user;
const PackagingType = db.packaging_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;

// const getUserCarts = async (req, res, next) => {};
const getCarts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log('backend');
    let {
      searchCategory,
      ordered,
      orderedBy,
      search,
      page = 1,
      limitPage = 10,
    } = req.query;

    let whereQuery = { user_id: userId };

    const { count, rows } = await getUserCarts('', whereQuery);
    console.log(count, 'cart');

    return res.status(200).send({
      success: true,
      message: 'getAll Cart',
      data: rows,
      // pageCount: count,
    });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  console.log('masuk add to cart');
  try {
    const { productId, qty } = req.body;
    const userId = req.user.id;
    const image = req.file;
    const imagePath = image ? image.path : undefined;
    console.log(productId, qty, userId, imagePath);
    // const product = await getProduct()
    // if(product.stock < qty) throw({message:'kebanyakan bro belinya'})
    // if(product. === true) throw({message:'butuh resep bro'})
    const isCart = await getCart('', {
      product_id: productId,
      user_id: userId,
    });
    // if (!result) throw { message: 'Invalid Credentials', code: 400 };
    if (productId === 1 && !image) throw { message: 'Please upload image' };
    if (isCart && isCart.qty === qty) '';
    else if (isCart)
      await Cart.update(
        {
          user_id: isCart.user_id,
          product_id: isCart.product_id,
          qty: qty || isCart.qty + 1,
          prescription_image: imagePath || null,
          confirmation: isCart.confirmation,
          is_check: true,
        },
        { where: { id: isCart.id } },
      );
    else {
      await Cart.create({
        user_id: userId,
        product_id: productId,
        qty: qty || 1,
        prescription_image: imagePath || null,
        confirmation: null,
        is_check: true,
      });
    }

    const cart = await getCart('', { product_id: productId, user_id: userId });

    return res.status(200).send({
      success: true,
      message: 'Product add to cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { qty, confirmation = false, isCheck = true } = req.body;
    const userId = req.user.id;

    // const product = await getProduct()
    // if(product.stock < qty) throw({message:'kebanyakan bro belinya'})
    // if(product. === true) throw({message:'butuh resep bro'})

    const isCart = await getCartByPk(id, '');
    if (!isCart) throw { code: 400, message: 'Cart Not Found' };

    const user = await getUserByPk(userId);
    if (isCart.user_id !== userId)
      if (user.role.role_name === 'user')
        throw { code: 400, message: 'Cart Not Found' };

    console.log(isCheck);
    if (isCart && isCart.qty === qty && isCart.is_check === isCheck) '';
    else if (isCart) {
      await Cart.update(
        {
          user_id: isCart.user_id,
          product_id: isCart.product_id,
          qty: qty || isCart.qty + 1,
          prescription_image: isCart.prescription_image,
          confirmation: confirmation,
          is_check: isCheck,
        },
        { where: { id: isCart.id } },
      );
    }

    const cart = await getCartByPk(id, '');

    return res.status(200).send({
      success: true,
      message: 'Cart Updated',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = await Cart.destroy({
      where: { id: id, user_id: userId },
    });

    if (deleted === 0) throw { message: 'cart not found' };

    return res.status(200).send({
      success: true,
      message: 'Cart Deleted',
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCarts, addToCart, updateCart, deleteCart };
