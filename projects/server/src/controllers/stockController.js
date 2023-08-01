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
          { where: { product_id: productId } },
          { transaction: t },
        );
        data.unit = false;
        data.product_id = productId;
        data.total_stock = addStock;
        await stockHistoryDB.create(data);
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
          { where: { product_id: productId } },
          { transaction: t },
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
    console.log('>>> unit conversion');
    const { product_id, qty } = req.body;
    let newOpenedStock;
    let openedStock;
    let resOpenedStock1;
    let newClosedStock;
    if (!product_id) throw { message: 'please provide a product' };
    if (!qty) throw { message: 'please provide quantity' };
    const resStockHistoryType = await stockHistoryTypeDB.findOne({
      where: { type: 'unit conversion' },
    });
    const stock_history_type_id = resStockHistoryType.id;
    const resOpenedStock = await openedStockDB.findOne({
      where: { product_id: product_id },
    });
    const resClosedStock = await closedStockDB.findOne({
      where: { product_id: product_id },
    });
    const response = await productDB.findOne({
      include: [packagingDB, productTypeDB],
      where: { id: product_id },
    });

    if (resOpenedStock !== null) {
      openedStock = resOpenedStock.qty;
    } else {
      openedStock = 0;
    }

    const packaging_type = response.packaging_type.type_name;
    const unit = response.product_type.unit;
    const closedStock = resClosedStock.total_stock;
    const netContent = response.net_content;
    newClosedStock = closedStock;
    newOpenedStock = openedStock;
    let openedFromStock = 0;

    if (openedStock < qty) {
      while (newOpenedStock < qty) {
        newClosedStock--;
        openedFromStock++;
        newOpenedStock = newOpenedStock + openedFromStock * netContent;
      }

      if (openedStock === null) {
        resOpenedStock1 = await openedStockDB.create(
          {
            product_id,
            qty: newOpenedStock,
          },
          { transaction: t },
        );
        openedStock = resOpenedStock1.qty;
      } else {
        resOpenedStock1 = await openedStockDB.update(
          { qty: newOpenedStock },
          { where: { product_id } },
          { transaction: t },
        );
      }
      const updateClosedStock = await closedStockDB.update(
        { total_stock: newClosedStock },
        { where: { product_id } },
        { transaction: t },
      );
      const updateStockHystoryClosedOut = await stockHistoryDB.create(
        {
          product_id,
          unit: 0,
          qty: openedFromStock,
          action: 'out',
          stock_history_type_id,
          total_stock: newClosedStock,
        },
        { transaction: t },
      );
      const addOpenStock = openedFromStock * netContent;
      const updateStockHystoryOpenIn = await stockHistoryDB.create({
        product_id,
        unit: 1,
        qty: addOpenStock,
        action: 'in',
        stock_history_type_id,
        total_stock: newOpenedStock,
      });
    }

    const newUpdateStock = newOpenedStock - qty;
    const updateOpenStock = await openedStockDB.update(
      { qty: newUpdateStock },
      { where: { product_id } },
      { transaction: t },
    );
    const updateStockHystoryOpenOut = await stockHistoryDB.create(
      {
        product_id,
        unit: 1,
        qty,
        action: 'out',
        stock_history_type_id,
        total_stock: newUpdateStock,
      },
      { transaction: t },
    );
    // console.log('unit conversion', response);
    await t.commit();
    return res.status(200).send({
      success: true,
      message: 'unit conversion completed successfully',
      data: response,
      net_content: netContent,
      closed_stock: closedStock,
      opened_stock: resOpenedStock1,
      type: stock_history_type_id,
    });
  } catch (error) {
    // await t.rollback();
    next(error);
  }
};

module.exports = { createDataStock, getStockHistoryType, unitConversion };
