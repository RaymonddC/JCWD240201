const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('../models');
const {
  getCart,
  getCartByPk,
  getUserCarts,
  updateConfirmation,
  isPrescriptionCartProductListEmpty,
  getAllPrescriptions,
  getPricePrescription,
} = require('../helpers/cartHelper');
const { getUserByPk } = require('../helpers/authHelper');
const Cart = db.cart;
const productDB = db.product;
const User = db.user;
const PackagingType = db.packaging_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;

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
    // console.log(count, 'cart');

    const newRows = await Promise.all(
      rows.map(async (row) => {
        if (row.product_id === 1 && row.confirmation === true) {
          const prescriptionPrice = await getPricePrescription(
            row.dataValues.id,
          );
          return {
            ...row.dataValues,
            product: {
              ...row.dataValues.product.dataValues,
              price: Number(prescriptionPrice[0].total_price),
            },
          };
        } else {
          return row;
        }
      }),
    );

    return res.status(200).send({
      success: true,
      message: 'getAll Cart',
      data: newRows,
      // pageCount: count,
    });
  } catch (error) {
    console.log("🚀 ~ file: cartController.js:65 ~ getCarts ~ error:", error)
    
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

    const product = await productDB.findOne({
      where: { id: productId },
    });
    if (productId !== '1') {
      if (product.require_prescription) {
        throw { message: 'This product requires prescription' };
      }
    }

    const isCart = await getCart('', {
      product_id: productId,
      user_id: userId,
    });
    const promotion = await Promotion.findOne({
      where: { product_id: productId },
    });
    if (isCart && promotion && promotion.limit <= isCart.qty)
      throw { message: 'Out Of Stock' };
    const stock = await ClosedStock.findOne({
      where: { product_id: productId },
    });
    if (Number(productId) !== 1 && isCart && stock.total_stock <= isCart.qty)
      throw { message: 'Out Of Stock' };

    if (Number(productId) === 1 && !image)
      throw { message: 'Please upload image' };

    if (isCart && isCart.qty === qty) '';
    else if (isCart && Number(productId) !== 1)
      await Cart.update(
        {
          user_id: isCart.user_id,
          product_id: isCart.product_id,
          qty: qty || isCart.qty + 1,
          prescription_image: imagePath || null,
          confirmation: isCart.confirmation,
          is_check: isCart.confirmation,
        },
        { where: { id: isCart.id } },
      );
    else
      await Cart.create({
        user_id: userId,
        product_id: productId,
        qty: qty || 1,
        prescription_image: imagePath || null,
        confirmation: Number(productId) === 1 ? null : true,
        is_check: Number(productId) === 1 ? false : true,
      });

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
          confirmation: isCart.confirmation,
          is_check: isCart.confirmation && isCheck,
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

const getAllPrescriptionsCarts = async (req, res, next) => {
  try {
    const { search_user, confirmation, sort, page, limit } = req.query;

    let full_name = search_user || '';
    let where = {
      product_id: 1,
      confirmation:
        confirmation === 'true'
          ? true
          : confirmation === 'false'
          ? false
          : null,
    };
    let order = [['createdAt', sort || 'ASC']];

    let response = await getAllPrescriptions(
      { model: User, where: { full_name: { [Op.substring]: full_name } } },
      where,
      order,
      limit,
      page,
    );
    const totalPage = Math.ceil(response.count / Number(limit));

    return res.status(200).send({
      success: true,
      message: 'Get all prescriptions carts successfully',
      data: { ...response, totalPage },
    });
  } catch (error) {
    next(error);
  }
};

const getPrescriptionCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getPrescription = await getCart('', { id: id });

    return res.status(200).send({
      success: true,
      message: 'Get prescriptions cart successfully',
      data: getPrescription,
    });
  } catch (error) {
    next(error);
  }
};

const updateConfirmationPrescriptionCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { confirmation, notes } = req.body;

    const checkPrescriptionCartProductListEmpty =
      await isPrescriptionCartProductListEmpty(id);

    if (confirmation && checkPrescriptionCartProductListEmpty) {
      throw { message: 'prescription cart product list is empty', code: 403 };
    }

    if (!confirmation && !notes) {
      throw { message: 'Please input reason', code: 400 };
    }

    let message;
    confirmation
      ? (message = 'Prescription is confirmed')
      : (message = 'Prescription is declined');

    const data = await updateConfirmation(id, confirmation, notes);

    return res.status(200).send({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCarts,
  addToCart,
  updateCart,
  deleteCart,
  getAllPrescriptionsCarts,
  getPrescriptionCart,
  updateConfirmationPrescriptionCart,
};
