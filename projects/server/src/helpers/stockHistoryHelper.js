const { Op } = require('sequelize');
const db = require('../models');
const { getTransactionById } = require('./transactionHelper');
const { unitConversionProcess } = require('./unitConversionHelper');
const StockHistoryDB = db.stock_history;
const TransactionPrescriptionDetailDB = db.transaction_prescription_detail;
const Promotion = db.promotion;
const UserDB = db.user;

const getLastStockHistory = async (whereQuery) => {
  try {
    return await StockHistoryDB.findOne({
      where: { ...whereQuery },
      order: [['id', 'DESC']],
    });
  } catch (error) {
    throw error;
  }
};

const updateHistoryCloseStock = async (tx_id, product_id, qty, unit, type) => {
  try {
    const stockProduct = await getLastStockHistory({ product_id, unit: false });

    if (stockProduct.total_stock < qty)
      throw { message: 'Not enough stock', code: 400 };

    return {
      transaction_id: tx_id,
      product_id: product_id,
      unit: unit,
      stock_history_type_id: type,
      qty: qty,
      action: 'out',
      total_stock: stockProduct.total_stock - qty,
    };
  } catch (error) {
    throw error;
  }
};

const processTransaction = async (id, userId, t) => {
  try {
    const user = await UserDB.findByPk(userId);
    const transaction = await getTransactionById(id, user.role_id === 1);

    if (!transaction || (user.role_id !== 1 && user.id !== transaction.user_id))
      throw { message: 'transaction not found', code: 400 };

    let stockHistoryUpdateData = [],
      prescTxId = [];
    await Promise.all(
      transaction.transaction_details.map(async (value) => {
        if (value.product_id === 1) prescTxId.push(value.id);
        else {
          let reserveStock = value.qty;
          if (value.promotion_id) {
            const prodPromotion = await Promotion.findByPk(value.promotion_id);
            if (prodPromotion && prodPromotion.buy)
              reserveStock += value.product.promotions[0].get;
          }

          stockHistoryUpdateData.push(
            await updateHistoryCloseStock(
              id,
              value.product_id,
              reserveStock,
              false,
              4,
            ),
          );
        }
      }),
    ).catch((error) => {
      throw error;
    });

    await StockHistoryDB.bulkCreate(stockHistoryUpdateData, {
      updateOnDuplicate: ['qty', 'total_stock'],
      transaction: t,
    });
    stockHistoryUpdateData = [];
    //prescription
    const prescriptionDetail = await TransactionPrescriptionDetailDB.findAll({
      where: {
        transaction_detail_id: { [Op.in]: [...prescTxId] },
      },
    });
    await Promise.all(
      prescriptionDetail.map(async (value) => {
        const response = await unitConversionProcess(
          {
            product_id: value.product_id,
            qty: value.qty,
            unit_conversion: value.unit_conversion,
            transaction_id: transaction.id,
          },
          t,
        );
        return response;
      }),
    ).catch((error) => {
      throw error;
    });

    return {
      success: true,
      message: 'Transaction Processed',
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLastStockHistory,
  updateHistoryCloseStock,
  processTransaction,
};
