const db = require('../models');
const stockHistoryDB = db.stock_history;
const stockHistoryTypeDB = db.stock_history_type;
const closedStockDB = db.closed_stock;
const { sequelize } = require('../models');

const createDataStock = async (req, res, next) => {
  //update unit utama = false
  try {
    // get data from client
    const { product_id, stockHistory, stockData } = req.body;

    //update closed stock
    let updateStock;
    if (stockHistory.action === 'in') {
      const productStock = await closedStockDB.findOne({
        where: { product_id: product_id },
      });

      if (productStock) {
        const updateStock = productStock + stockData.total_stock;
      } else {
        updateStock = await closedStockDB.create({
          product_id,
          total_stock: stockData.total_stock,
        });
      }
    } else if (stockHistory.action === 'out') {
    }

    return res.send({
      success: true,
      message: 'Update Stock Success',
      data: updateStock,
    });
  } catch (error) {}
};

module.exports = {
  createDataStock,
};
