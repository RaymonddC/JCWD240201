const db = require('../models');
const stockHistoryDB = db.stock_history;
const stockHistoryTypeDB = db.stock_history_type;
const closedStockDB = db.closed_stock;
const openedStockDB = db.opened_stock;
const productDB = db.product;
const productTypeDB = db.product_type;
const packagingDB = db.packaging_type;
const { sequelize } = require('../models');

const unitConversionHelper = async (data, t) => {
  try {
    console.log('>>> unit conversion', data);
    const { product_id, qty } = data;
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
        newOpenedStock = newOpenedStock + netContent;
      }
      console.log('stock', newOpenedStock);

      if (openedStock === 0) {
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
          { where: { product_id }, transaction: t },
        );
      }
      const updateClosedStock = await closedStockDB.update(
        { total_stock: newClosedStock },
        { where: { product_id }, transaction: t },
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
      const updateStockHystoryOpenIn = await stockHistoryDB.create(
        {
          product_id,
          unit: 1,
          qty: addOpenStock,
          action: 'in',
          stock_history_type_id,
          total_stock: newOpenedStock,
        },
        { transaction: t },
      );
    }

    const newUpdateStock = newOpenedStock - qty;
    const updateOpenStock = await openedStockDB.update(
      { qty: newUpdateStock },
      { where: { product_id }, transaction: t },
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
  
    return {
      success: true,
      message: 'unit conversion completed successfully',
      data: response,
      net_content: netContent,
      closed_stock: closedStock,
      opened_stock: resOpenedStock1,
      type: stock_history_type_id,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { unitConversionHelper };
