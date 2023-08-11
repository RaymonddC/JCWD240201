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
const UserDB = db.user;
const { sequelize } = require('../models');
const { getOldIsSelected } = require('../helpers/addressHelper');
const {
  getUserTransactions,
  getTransactionById,
} = require('../helpers/transactionHelper');

const checkout = async (req, res, next) => {
  console.log('masuk checkout');
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
    console.log(address, '>>>>');
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
    console.log(error);
    next(error);
  }
};

const getAllTransaction = async (req, res, next) => {
  try {
    const user = await UserDB.findByPk(req.user.id);

    const {
      searchStatusId = '',
      sortType,
      sortOrder,
      search = '',
      page = 1,
      startDate,
      endDate,
      limitPage,
    } = req.query;

    let whereQuery = {};
    whereQuery.dates = { startDate, endDate };
    whereQuery.transaction = {};

    if (user.role_id !== 1) whereQuery.transaction.user_id = user.id;

    whereQuery.transactionHistory = {
      transaction_status_id: { [Op.like]: `%${searchStatusId}%` },
      is_active: true,
    };
    whereQuery.transactionDetail = {
      product_name: { [Op.like]: `%${search}%` },
    };
    if (limitPage)
      whereQuery.pagination = {
        limit: Number(limitPage),
        offset: (Number(page) - 1) * limitPage,
      };

    const { count, rows } = await getUserTransactions(whereQuery, {
      sortType,
      sortOrder,
    });
    console.log(whereQuery);
    console.log(startDate);

    return res.status(200).send({
      success: true,
      message: 'Get All Transaction Success',
      data: rows,
      pageCount: count,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserDB.findByPk(req.user.id);

    const transaction = await getTransactionById(id, user.role_id === 1);

    return res.status(200).send({
      success: true,
      message: 'Get Transaction Success',
      data: transaction,
      // pageCount: count,
    });
  } catch (error) {
    next(error);
  }
};

const uploadPayment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { transaction_id, transaction_status_id } = req.body;
    const image = req.file;
    const imagePath = image ? image.path : undefined;
    if (!image) throw { message: 'Please upload image' };
    const updateTransaction = await Transaction.update(
      { image: imagePath },
      { where: { id: transaction_id } },
      { transaction: t },
    );

    const txFind = await TransactionHistory.findOne({
      where: { is_active: true, transaction_id },
    });

    if (txFind !== null) {
      const txUpdate = await TransactionHistory.update(
        { is_active: false },
        {
          where: { is_active: true, transaction_id },
        },
        { transaction: t },
      );
    }

    const txCreate = await TransactionHistory.create(
      {
        is_active: true,
        transaction_id,
        transaction_status_id,
      },
      { transaction: t },
    );

    await t.commit();
    return res.status(200).send({
      success: true,
      message: 'Upload payment Success',
      data: [],
    });
  } catch (error) {
    console.log(error);

    await t.rollback();
    next(error);
  }
};

module.exports = { checkout, getAllTransaction, getTransaction, uploadPayment };
