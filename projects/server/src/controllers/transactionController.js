const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const db = require('../models');
const { getCart, getCartByPk, getUserCarts } = require('../helpers/cartHelper');
const { getUserByPk } = require('../helpers/authHelper');
const Cart = db.cart;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const TransactionHistory = db.transaction_history;
const ClosedStockDB = db.closed_stock;
const Product = db.product;
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
    const txDetailData = await Promise.all(
      rows.map(async (value) => {
        //cekStock
        let closeStock = await ClosedStockDB.findOne({
          where: { product_id: value.product_id },
        });

        if (!closeStock || closeStock.total_stock < value.qty)
          throw { message: 'not enough stocks', code: 400 };

        closeStock.total_stock -= value.qty;

        //updateStock
        // let updateStock =
        await ClosedStockDB.update(
          {
            total_stock: closeStock.total_stock,
          },
          { where: { product_id: value.product_id } },
          { transaction: t },
        );

        return {
          product_id: value.product_id,
          promotion_id: null,
          transaction_id: transaction.id,
          product_name: value.product.name,
          price: value.product.price - (value.disc ? value.disc : 0),
          // prescription_image:value.product_id === 1? ,
          qty: value.qty,
        };
      }),
    );
    console.log(await txDetailData, 'awdiaokwdoakwdok==================');

    // return res.send(txDetailData);

    await TransactionDetail.bulkCreate(txDetailData, { transaction: t });

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
      searchStatusId,
      ordered,
      orderedBy,
      search = '',
      page = 1,
      startDate,
      endDate,
      limitPage = 10,
    } = req.query;

    let whereQuery = {};
    whereQuery.dates = { startDate, endDate };
    whereQuery.transaction = {
      user_id: userId,
    };
    whereQuery.transactionHistory = {
      transaction_status_id: { [Op.like]: `%${searchStatusId}%` },
    };
    whereQuery.transactionDetail = {
      product_name: { [Op.like]: `%${search}%` },
    };

    const { count, rows } = await getUserTransactions('', whereQuery);
    console.log(whereQuery);
    console.log(startDate);

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

const uploadPayment = async (req, res, next) => {
  try {
    const { transaction_id } = req.body;
    const image = req.file;
    const imagePath = image ? image.path : undefined;
    if (!image) throw { message: 'Please upload image' };

    const updateTransaction = await Transaction.update(
      { image: imagePath },
      { where: { id: transaction_id } },
    );
  } catch (error) {}
};

module.exports = { checkout, getAllTransaction,uploadPayment };
