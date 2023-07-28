const db = require('../models');
const stockHistoryDB = db.stock_history;
const stockHistoryTypeDB = db.stock_history_type;
const closedStockDB = db.closed_stock;
const { sequelize } = require('../models');

const createDataStock = async (req, res, next) => {
  //update unit utama = false
  try {
    // get data from client
    const { data } = req.body;

    //update closed stock
    let updateStock;
    if (data.action === 'in') {
      const productStock = await closedStockDB.findOne({
        where: { product_id: data.product_id },
      });

      if (productStock) {
        const addStock = productStock.total_stock + data.qty;
        updateStock = await closedStockDB.update(
          { total_stock: addStock },
          { where: { product_id: data.product_id } },
        );
        data.unit = false;
        data.total_stock = addStock;
        await stockHistoryDB.create(data);
      } else {
        updateStock = await closedStockDB.create({
          product_id: data.product_id,
          total_stock: data.qty,
        });
        data.unit = false;
        data.total_stock = addStock;
        await stockHistoryDB.create(data);
      }
    } else if (data.action === 'out') {
      const productStock = await closedStockDB.findOne({
        where: { product_id: data.product_id },
      });

      if (productStock && productStock.total_stock) {
        const addStock = productStock.total_stock - data.qty;
        if (addStock < 0) throw { message: 'stock is minus' };
        updateStock = await closedStockDB.update(
          { total_stock: addStock },
          { where: { product_id: data.product_id } },
        );
        data.unit = false;
        data.total_stock = addStock;
        await stockHistoryDB.create(data);
      } else if (!productStock || !productStock.total_stock) {
        throw { message: 'stock in empty already' };
      }
    }

    return res.send({
      success: true,
      status: 200,
      message: 'Update Stock Success',
      data: updateStock,
    });
  } catch (error) {
    next(error);
  }
};

const getStockHistoryType = async (req, res, next) => {
  try {
    const result = await stockHistoryTypeDB.findAll();

    return res.send({
      success: true,
      status: 200,
      message: 'get history types success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDataStock,
  getStockHistoryType,
};
