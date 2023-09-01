const db = require('../models');
const StockHistoryDB = db.stock_history;

const getLastStockHistory = async (whereQuery) => {
  try {
    return await StockHistoryDB.findOne({
      where: { ...whereQuery },
      order: [['updatedAt', 'DESC']],
    });
  } catch (error) {
    throw error;
  }
};

const createStockHistory = async (whereQuery) => {
  try {
    return {
      product_id: value.product_id,
      transaction_id: transaction.id,
      unit: 0,
      stock_history_type_id: 4,
      qty: reserveStock,
      action: 'out',
      total_stock: newStock,
    };
  } catch (error) {
    throw error;
  }
};

const updateHistoryCloseStock = async (tx_id, product_id, qty, unit) => {
  try {
    const stockProduct = await getLastStockHistory({ product_id, unit: false });

    return {
      transaction_id: tx_id,
      product_id: product_id,
      unit: unit,
      stock_history_type_id: 4,
      qty: qty,
      action: 'out',
      total_stock: stockProduct.total_stock - qty,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLastStockHistory,
  updateHistoryCloseStock,
};
