const db = require('../models');
const StockHistoryDB = db.stock_history;

const getLastStockHistory1 = async (whereQuery) => {
  try {
    return await StockHistoryDB.findOne({
      where: { ...whereQuery },
      order: [['id', 'DESC']],
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { getLastStockHistory1 };
