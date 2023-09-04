const { Op } = require('sequelize');
const db = require('../models');
const { getUserCarts, getPricePrescription } = require('../helpers/cartHelper');
const Cart = db.cart;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const TransactionHistory = db.transaction_history;
const Product = db.product;
const PrescriptionCartDB = db.prescription_cart;
const TransactionPrescriptionDetailDB = db.transaction_prescription_detail;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;
const OpenStock = db.opened_stock;
const UserDB = db.user;
const { sequelize } = require('../models');
const {
  getOldIsSelected,
  changeToMainSelect,
} = require('../helpers/addressHelper');
const {
  getUserTransactions,
  getTransactionById,
  updateCloseStock,
  updatePromoTx,
} = require('../helpers/transactionHelper');

const { checkoutUnitConversion } = require('../helpers/unitConversionHelper');
const {
  getMidtransSnap,
  getPaymentStatusMidtrans,
} = require('../helpers/paymentHelper');
const { processTransaction } = require('../helpers/stockHistoryHelper');

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

    return res.status(200).send({
      success: true,
      message: 'Get All Transaction Success',
      data: rows,
      pageCount: count,
      totalPage: Math.ceil(count / (limitPage || 1)),
    });
  } catch (error) {
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
    const imagePath = image
      ? image.path.replace(/\\/g, '/').replace('src/public/', '')
      : undefined;
    if (!image) throw { message: 'Please upload image' };
    const updateTransaction = await Transaction.update(
      { image: imagePath, payment_method: 'Manual Payment' },
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
    await t.rollback();
    next(error);
  }
};

const handleMidtransPayment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { order_id, transactionId } = req.body;
    // cek ke api midtrans dlu statusnya baru write status

    const responsePayment = await getPaymentStatusMidtrans({ order_id });

    let transaction_status_id = 1;
    const transaction_id =
      transactionId || (order_id && order_id.split('-')[1]) || null;
    if (
      responsePayment.data.transaction_status === 'settlement' ||
      responsePayment.data.transaction_status === 'capture'
    ) {
      const payment_method = responsePayment.data.payment_type;
      transaction_status_id = 3;
      const tx = await Transaction.findByPk(transaction_id);
      await Transaction.update(
        { ...tx, payment_method },
        { where: { id: transaction_id }, transaction: t },
      );

      const txFind = await TransactionHistory.findOne({
        where: { is_active: true, transaction_id },
      });

      if (txFind !== null) {
        const txUpdate = await TransactionHistory.update(
          { is_active: false },
          {
            where: { is_active: true, transaction_id },
            transaction: t,
          },
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
    } else if (responsePayment.data.status_code >= 404 && transaction_id) {
      const user = await UserDB.findByPk(req.user.id);
      const transaction = await Transaction.findByPk(transaction_id);
      const txDetails = await TransactionDetail.findAll({
        where: { transaction_id: transaction_id },
      });
      const { paymentToken, redirect_url, orderId } = await getMidtransSnap({
        user,
        txDetails,
        transaction,
      });
      await Transaction.update(
        {
          ...transaction,
          payment_token: paymentToken,
          payment_id: orderId,
        },
        { where: { id: transaction.id }, transaction: t },
      );
    }
    await processTransaction(transactionId, req.user.id, t);
    await t.commit();
    return res.status(200).send({
      success: true,
      message: 'Payment Success',
      data: [],
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

const newCancel = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const user = await UserDB.findByPk(req.user.id);

    const transaction = await getTransactionById(id, user.role_id === 1);

    if (!transaction || (user.role_id !== 1 && user.id !== transaction.user_id))
      throw { message: 'transaction not found', code: 400 };

    const txStatus = await TransactionHistory.findOne({
      where: { transaction_id: transaction.id, is_active: true },
    });

    if (txStatus.status === 'Cancelled')
      throw { code: 400, message: 'Already Cancelled' };

    //cek transaction Promo
    let promoUpdateData = [];
    if (transaction.promotion_id) {
      const promoTx = await Promotion.findByPk(transaction.promotion_id);
      if (promoTx)
        promoUpdateData.push({
          ...promoTx.dataValues,
          limit: promoTx.limit + 1,
        });
    }

    let pressCartId = [],
      openStockUpdateData = [],
      closeStockUpdateData = [];

    //transactiondetail
    await Promise.all(
      transaction.transaction_details.map(async (value) => {
        if (value.product_id === 1) pressCartId.push(value.id);
        else {
          if (value.promotion_id) {
            const promoProd = await Promotion.findByPk(value.promotion_id);
            promoUpdateData.push({
              ...promoProd.dataValues,
              limit: promoProd.limit + 1,
            });
          }
          closeStockUpdateData.push(
            await updateCloseStock(value.product_id, value.qty, true),
          );
        }
      }),
    ).catch((error) => {
      throw error;
    });

    await ClosedStock.bulkCreate(closeStockUpdateData, {
      updateOnDuplicate: ['total_stock'],
      transaction: t,
    });

    closeStockUpdateData = [];
    //prescription
    const prescriptionDetail = await TransactionPrescriptionDetailDB.findAll({
      where: {
        transaction_detail_id: { [Op.in]: pressCartId },
      },
    });

    await Promise.all(
      prescriptionDetail.map(async (value) => {
        if (!value.unit_conversion) {
          closeStockUpdateData.push(
            await updateCloseStock(value.product_id, value.qty, true),
          );
        } else {
          const openStockProduct = await OpenStock.findOne({
            where: { product_id: value.product_id },
          });
          const product = await Product.findByPk(value.product_id);
          let openQty = value.qty + openStockProduct.dataValues.qty;

          closeQty = Math.floor(openQty / product.net_content);

          openQty = openQty % product.net_content;

          if (closeQty) {
            closeStockUpdateData.push(
              await updateCloseStock(value.product_id, closeQty, true),
            );
          }
          openStockUpdateData.push({
            ...openStockProduct.dataValues,
            qty: openQty,
          });
        }
      }),
    ).catch((error) => {
      throw error;
    });

    await ClosedStock.bulkCreate(closeStockUpdateData, {
      updateOnDuplicate: ['total_stock'],
      transaction: t,
    });
    await OpenStock.bulkCreate(openStockUpdateData, {
      updateOnDuplicate: ['qty'],
      transaction: t,
    });
    await Promotion.bulkCreate(promoUpdateData, {
      updateOnDuplicate: ['limit'],
      transaction: t,
    });

    await TransactionHistory.update(
      {
        is_active: false,
      },
      {
        where: { transaction_id: transaction.id, is_active: true },
        transaction: t,
      },
    );
    await TransactionHistory.create(
      {
        transaction_id: transaction.id,
        transaction_status_id: 7,
        is_active: true,
        notes: notes,
      },
      { transaction: t },
    );

    await t.commit();

    return res.status(200).send({
      success: true,
      message: 'Transaction Cancelled',
      data: transaction,
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

const newCheckout = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const {
      shippingFee = 10000,
      discount,
      activeCart,
      promotionActive,
      courier,
      duration,
      totalPrice,
      paymentMethod,
    } = req.body;

    let whereQuery = { user_id: userId, is_check: true };
    const { rows, count } = await getUserCarts('', whereQuery);

    //cek jumlah qty cart
    const cartQty = rows.reduce((accumulator, object) => {
      return accumulator + object.qty;
    }, 0);

    if (cartQty !== activeCart)
      throw { message: 'Check again your cart', code: 400 };

    let totalDiscount = 0,
      totalAllPriceDB = 0;

    let closedStockData = [],
      txPresDetail = [],
      promotionData = [],
      deletePressId = [];
    if (promotionActive) {
      const updatedPromo = await updatePromoTx(promotionActive, 1, totalPrice);
      promotionData.push(updatedPromo.promoData);
      totalDiscount += updatedPromo.totalDiscount;
    }

    const address = await getOldIsSelected(userId);

    if (address.dataValues.is_main === false) {
      await changeToMainSelect(address.dataValues.id, userId, t);
    }
    //helper buat balikin ke main

    //create transaction
    const transaction = await Transaction.create(
      {
        promotion_id: promotionActive || null,
        user_id: userId,
        city_id: address.city_id,
        notes: address.notes,
        address: address.address,
        phone_number: address.phone_number,
        receiver: address.receiver,
        shipment_fee: shippingFee,
        total_discount: discount,
        total_price: totalPrice,
        shipment: courier + ' - ' + duration,
      },
      { transaction: t },
    );

    // throw { data: rows };
    // let cartIdprescription = [];
    const txDetailData = await Promise.all(
      rows.map(async (value) => {
        totalAllPriceDB += value.qty * value.product.price;
        let pricePresc = 0;
        let promoSuccess = true;

        txDetailsModel = await TransactionDetail.create({});
        // throw { data: txDetailsModel };
        if (value.product_id !== 1) {
          //cekPromotion & promotionStock
          if (value.product.promotions.length !== 0) {
            if (value.dataValues.disc && value.dataValues.disc != 0) {
              //promo disc
              totalDiscount += value.qty * value.dataValues.disc;
              if (value.product.promotions[0].limit < value.qty)
                throw {
                  message: 'not enough stocks (Promotion)',
                  code: 400,
                  data: value,
                };
            } else {
              // promo buyget
              if (value.product.promotions[0].buy > value.qty) {
                // promo jgn diapply
                promoSuccess = false;
              }
            }
            //update promo limit
            if (promoSuccess)
              promotionData.push({
                ...value.product.promotions[0],
                limit:
                  value.product.promotions[0].limit -
                  (value.disc == 0 ? 1 : value.qty),
              });
          }
          // cekStock

          const reserveStock =
            value.product.promotions.length !== 0 && value.disc == 0 // promo buy get
              ? value.qty +
                // (
                (promoSuccess ? value.product.promotions[0].get : 0)
              : // -value.product.promotions[0].buy)
                //selisih, karna tdk berlaku kelipatan
                value.qty;

          if (
            (value.product.closed_stocks.length !== 0,
            value.product.closed_stocks[0].total_stock < reserveStock)
          ) {
            throw { message: 'not enough stocks', code: 400, data: value };
          }

          const newStock =
            value.product.closed_stocks[0].total_stock - reserveStock;
          closedStockData.push({
            ...value.product.closed_stocks[0].dataValues,
            total_stock: newStock,
          });
        } else {
          pricePresc = await getPricePrescription(value.id);
          totalAllPriceDB += Number(pricePresc[0].total_price);

          // ini berlaku cuma kalo harus open ya bang
          const prescriptionCarts = await PrescriptionCartDB.findAll({
            where: {
              cart_id: value.id,
            },
          });

          await Promise.all(
            prescriptionCarts.map(async (prescCart) => {
              // if(prescCart.unit_conversion)
              deletePressId.push(prescCart.id);
              txPresDetail.push({
                transaction_detail_id: txDetailsModel.id,
                product_id: prescCart.product_id,
                unit_conversion: prescCart.unit_conversion,
                qty: prescCart.qty,
                price: prescCart.price,
                weight: prescCart.weight,
              });
              return await checkoutUnitConversion(
                {
                  product_id: prescCart.product_id,
                  qty: prescCart.qty,
                  unit_conversion: prescCart.unit_conversion,
                  // transaction_id: transaction.id,
                },
                t,
              );
            }),
          ).catch((error) => {
            throw error;
          });
        }

        return {
          ...txDetailsModel.dataValues,
          product_id: value.product_id,
          promotion_id:
            value.product.promotions.length !== 0 && promoSuccess
              ? value.product.promotions[0].id
              : null,
          transaction_id: transaction.id,
          product_name: value.product.name,
          price:
            value.product_id !== 1
              ? value.product.price - (value.disc ? value.disc : 0)
              : pricePresc[0].total_price,
          prescription_image: value.prescription_image || null,
          qty: value.qty,
        };
      }),
    );

    if (totalDiscount !== Number(discount))
      throw {
        code: 400,
        message: 'promotion changed',
        data: { totalDiscount, discount },
      };

    if (totalAllPriceDB !== Number(totalPrice))
      throw {
        code: 400,
        message: 'Total changed',
        // data: { totalAllPriceDB, totalPrice },
      };

    await Promotion.bulkCreate(promotionData, {
      updateOnDuplicate: ['limit'],
      transaction: t,
    });
    await ClosedStock.bulkCreate(closedStockData, {
      updateOnDuplicate: ['total_stock'],
      transaction: t,
    });
    const txDetails = await TransactionDetail.bulkCreate(txDetailData, {
      updateOnDuplicate: [
        'product_id',
        'promotion_id',
        'transaction_id',
        'product_name',
        'price',
        'prescription_image',
        'qty',
      ],
      transaction: t,
    });
    await TransactionPrescriptionDetailDB.bulkCreate(txPresDetail, {
      transaction: t,
    });

    const cartIds = rows.map((value) => {
      return value.id;
    });

    await Cart.destroy({ where: { id: [...cartIds] }, transaction: t });

    await PrescriptionCartDB.destroy({
      where: { id: [...deletePressId] },
      transaction: t,
    });

    await TransactionHistory.create(
      {
        transaction_id: transaction.id,
        transaction_status_id: 1,
        is_active: true,
      },
      { transaction: t },
    );

    let paymentData = { paymentToken: null, url: null };
    if (paymentMethod === 'paymentGateway') {
      const user = await UserDB.findByPk(req.user.id);
      const { paymentToken, redirect_url, orderId } = await getMidtransSnap({
        user,
        txDetails,
        transaction,
      });
      await Transaction.update(
        {
          ...transaction,
          payment_token: paymentToken,
          payment_id: orderId,
        },
        { where: { id: transaction.id }, transaction: t },
      );
      paymentData = { paymentToken, url: redirect_url };
    }
    await t.commit();
    return res.status(200).send({
      success: true,
      message: 'Checkout Success',
      data: txDetailData,
      paymentData,
      // pageCount: count,
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

module.exports = {
  getAllTransaction,
  getTransaction,
  uploadPayment,
  handleMidtransPayment,
  newCancel,
  newCheckout,
};
