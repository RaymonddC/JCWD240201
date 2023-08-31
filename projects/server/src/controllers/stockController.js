const { unitConversionHelper } = require('../helpers/unitConversionHelper');
const db = require('../models');
const stockHistoryDB = db.stock_history;
const stockHistoryTypeDB = db.stock_history_type;
const closedStockDB = db.closed_stock;
const openedStockDB = db.opened_stock;
const productDB = db.product;
const productTypeDB = db.product_type;
const packagingDB = db.packaging_type;
const { sequelize } = require('../models');

const createDataStock = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    // get data from client
    const { data } = req.body;
    const { productId } = req.params;

    //update closed stock
    let updateStock;
    if (data.action.toLowerCase() === 'in') {
      const productStock = await closedStockDB.findOne({
        where: { product_id: productId },
      });

      if (productStock) {
        const addStock = Number(productStock.total_stock) + Number(data.qty);
        updateStock = await closedStockDB.update(
          { total_stock: addStock },
          { where: { product_id: productId }, transaction: t },
        );
        data.unit = false;
        data.product_id = productId;
        data.total_stock = addStock;
        await stockHistoryDB.create(data, { transaction: t });
      } else {
        updateStock = await closedStockDB.create(
          {
            product_id: productId,
            total_stock: data.qty,
          },
          { transaction: t },
        );
        data.unit = false;
        data.product_id = productId;
        data.total_stock = data.qty;
        await stockHistoryDB.create(data, { transaction: t });
      }
    } else if (data.action.toLowerCase() === 'out') {
      const productStock = await closedStockDB.findOne({
        where: { product_id: productId },
      });

      if (productStock && productStock.total_stock) {
        const addStock = Number(productStock.total_stock) - Number(data.qty);
        if (addStock < 0) throw { message: 'stock is minus' };
        updateStock = await closedStockDB.update(
          { total_stock: addStock },
          { where: { product_id: productId }, transaction: t },
        );
        data.unit = false;
        data.product_id = productId;
        data.total_stock = addStock;
        await stockHistoryDB.create(data, { transaction: t });
      } else if (!productStock || !productStock.total_stock) {
        throw { message: 'stock in empty already' };
      }
    }

    await t.commit();

    return res.send({
      success: true,
      status: 200,
      message: 'Update Stock Success',
      data: updateStock,
    });
  } catch (error) {
    await t.rollback();
    return res.send({
      success: false,
      message: error.message,
      data: null,
    });
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

const unitConversion = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const response = await unitConversionHelper(req.body, t);
    await t.commit();
    return res.status(200).send(response);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

module.exports = { createDataStock, getStockHistoryType, unitConversion };
