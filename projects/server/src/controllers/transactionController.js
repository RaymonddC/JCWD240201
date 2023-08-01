const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const db = require('../models');
const { getCart, getCartByPk, getUserCarts } = require('../helpers/cartHelper');
const { getUserByPk } = require('../helpers/authHelper');
const Cart = db.cart;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const TransactionHistory = db.transaction_history;
const PackagingType = db.packaging_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;
const { sequelize } = require('../models');
const { getOldIsSelected } = require('../helpers/addressHelper');
const { getUserTransactions } = require('../helpers/transactionHelper');

const checkout = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { shipmentFee = 10000, discount, activeCart } = req.body;

    let whereQuery = { user_id: userId, is_check: true };
    const { rows, count } = await getUserCarts('', whereQuery);
    const cartQty = rows.reduce((accumulator, object) => {
      return accumulator + object.qty;
    }, 0);

    if (cartQty !== activeCart)
      throw { message: 'Check again your cart', code: 400 };

    //checkDiscount
    const address = await getOldIsSelected(userId);
    console.log(userId);

    //create transaction
    const transaction = await Transaction.create(
      {
        user_id: userId,
        city_id: address.city_id,
        notes: address.notes,
        address: address.address,
        phone_number: address.phone_number,
        receiver: address.receiver,
        shipment_fee: shipmentFee,
      },
      { transaction: t },
    );

    //create transactionDetail
    const txDetailData = rows.map((value) => {
      return {
        product_id: value.product_id,
        promotion_id: null,
        transaction_id: transaction.id,
        product_name: value.product.name,
        price: value.product.price,
        // prescription_image:value.product_id === 1? ,
        qty: value.qty,
      };
    });
    console.log(txDetailData);

    await TransactionDetail.bulkCreate(txDetailData, {
      transaction: t,
      ignoreDuplicate: true,
    });

    const cartIds = rows.map((value) => {
      return value.id;
    });

    await Cart.destroy({ where: { id: [...cartIds] } }, { transaction: t });

    await TransactionHistory.create(
      {
        transaction_id: transaction.id,
        transaction_status_id: 1,
        is_active: true,
      },
      { transaction: t },
    );

    await t.commit();

    return res.status(200).send({
      success: true,
      message: 'Checkout Success',
      data: txDetailData,
      // pageCount: count,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTransaction = async (req, res, next) => {
  try {
    const userId = req.user.id;

    let {
      searchCategory,
      ordered,
      orderedBy,
      search,
      page = 1,
      limitPage = 10,
    } = req.query;

    let whereQuery = { user_id: userId };

    const { count, rows } = await getUserTransactions('', whereQuery);

    return res.status(200).send({
      success: true,
      message: 'Checkout Success',
      data: rows,
      // pageCount: count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout, getAllTransaction };
