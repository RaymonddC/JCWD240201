const db = require('../models');
const stockHistoryDB = db.stock_history;
const stockHistoryTypeDB = db.stock_history_type;
const closedStockDB = db.closed_stock;
const openedStockDB = db.opened_stock;
const productDB = db.product;
const productTypeDB = db.product_type;
const packagingDB = db.packaging_type;
const { sequelize } = require('../models');
const { updateCloseStock } = require('./transactionHelper');
const { getLastStockHistory } = require('./stockHistoryHelper');

const unitConversionHelper = async (data, t) => {
  try {
    const { product_id, qty, unit_conversion, transaction_id } = data;
    let newOpenedStock;
    let openedStock;
    let resOpenedStock1;
    let newClosedStock;
    if (!product_id) throw { message: 'please provide a product', code: 400 };
    if (!qty) throw { message: 'please provide quantity', code: 400 };

    if (!unit_conversion) {
      const resStockHistoryType = await stockHistoryTypeDB.findOne({
        where: { type: 'sales' },
      });
      const stock_history_type_id = resStockHistoryType.id;
      const checkStock = await closedStockDB.findOne({
        where: { product_id: product_id },
      });
      let updatedStock;
      if (checkStock.total_stock >= qty) {
        const newClosedStock = checkStock.total_stock - qty;

        const updateClosedStock = await closedStockDB.update(
          { total_stock: newClosedStock },
          { where: { product_id }, transaction: t },
        );
        const updateStockHystoryClosedOut = await stockHistoryDB.create(
          {
            product_id,
            unit: 0,
            qty,
            transaction_id,
            action: 'out',
            stock_history_type_id,
            total_stock: newClosedStock,
          },
          { transaction: t },
        );
        updatedStock = await closedStockDB.findOne({
          where: { product_id: product_id },
        });
      }
      return {
        success: true,
        message: 'Non unit conversion presciption sales completed successfully',
        data: updatedStock,
        closed_stock: updatedStock.total_stock,
        type: 'sales',
      };
    } else {
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
        // throw { message: 'inside' };
        const updateClosedStock = await closedStockDB.update(
          { total_stock: newClosedStock },
          { where: { product_id }, transaction: t },
        );
        // throw { message: 'inside' };
        const updateStockHystoryClosedOut = await stockHistoryDB.create(
          {
            product_id,
            unit: 0,
            qty: openedFromStock,
            transaction_id,
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
            transaction_id,
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
      const resStockHistoryTypeSales = await stockHistoryTypeDB.findOne({
        where: { type: 'sales' },
      });
      const updateStockHystoryOpenOut = await stockHistoryDB.create(
        {
          product_id,
          unit: 1,
          qty,
          action: 'out',
          transaction_id,
          stock_history_type_id: resStockHistoryTypeSales.id,
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
        type: 'unit_conversion',
      };
    }
  } catch (error) {
    throw error;
  }
};

const unitConversionProcess = async (data, t) => {
  const { product_id, qty, unit_conversion, transaction_id } = data;
  let newOpenedStock;
  let openedStock;
  let resOpenedStock1;
  let newClosedStock;

  try {
    if (!product_id) throw { message: 'please provide a product', code: 400 };
    if (!qty) throw { message: 'please provide quantity', code: 400 };
    const unitConversionTypeId = await stockHistoryTypeDB.findOne({
      where: { type: 'unit conversion' },
    });
    const salesTypeId = await stockHistoryTypeDB.findOne({
      where: { type: 'sales' },
    });
    if (!unit_conversion) {
      const checkClosedStockHistory = await getLastStockHistory({
        product_id,
        unit: false,
      });
      const currentClosedStock = checkClosedStockHistory.total_stock;
      let updateStockHistory;
      if (currentClosedStock >= qty) {
        const newClosedStock = currentClosedStock - qty;
        updateStockHistory = await stockHistoryDB.create(
          {
            product_id,
            unit: 0,
            qty,
            action: 'OUT',
            transaction_id,
            stock_history_type_id: salesTypeId.id,
            total_stock: newClosedStock,
          },
          { transaction: t },
        );
      } else {
        throw { message: 'Not enough stock', code: 400 };
      }
      return {
        success: true,
        message: 'Non unit conversion presciption sales completed successfully',
        data: updateStockHistory,
      };
    } else {
      const checkOpenedStockHistory = await getLastStockHistory({
        product_id,
        unit: true,
      });
      let currentOpenedStock;
      if (checkOpenedStockHistory !== null) {
        currentOpenedStock = checkOpenedStockHistory.total_stock;
        console.log(
          '🚀🚀🚀 ~ file: unitConversionHelper.js:233 ~ unitConversionProcess ~ currentOpenedStock:',
          currentOpenedStock,
        );
      } else {
        currentOpenedStock = 0;
      }

      const checkClosedStockHistory = await getLastStockHistory({
        product_id,
        unit: false,
      });
      const currentClosedStock = checkClosedStockHistory.total_stock;
      const prodDetail = await productDB.findOne({
        include: [packagingDB, productTypeDB],
        where: { id: product_id },
      });
      const netContent = prodDetail.net_content;

      newClosedStock = currentClosedStock;
      newOpenedStock = currentOpenedStock;
      let openedFromStock = 0;
      let updateClosedStockHistory;
      if (currentOpenedStock < qty) {
        while (newOpenedStock < qty) {
          newClosedStock--;
          openedFromStock++;
          newOpenedStock = newOpenedStock + netContent;
          if (currentClosedStock < openedFromStock) {
            throw { message: 'Not enough stock', code: 400 };
          }
        }
        const updateClosedStockHistoryOut = await stockHistoryDB.create(
          {
            product_id,
            unit: 0,
            qty: openedFromStock,
            transaction_id,
            action: 'OUT',
            stock_history_type_id: unitConversionTypeId.id,
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
            transaction_id,
            action: 'IN',
            stock_history_type_id: unitConversionTypeId.id,
            total_stock: newOpenedStock,
          },
          { transaction: t },
        );
      }

      const newUpdateStock = newOpenedStock - qty;
      const updateOpenedStockHistoryOut = await stockHistoryDB.create(
        {
          product_id,
          unit: 1,
          qty,
          action: 'OUT',
          transaction_id,
          stock_history_type_id: salesTypeId.id,
          total_stock: newUpdateStock,
        },
        { transaction: t },
      );

      return {
        success: true,
        message: 'unit conversion completed successfully',
        data: updateOpenedStockHistoryOut,
        net_content: netContent,
        closed_stock: newClosedStock,
        opened_stock: newUpdateStock,
        netContent: netContent,
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { unitConversionHelper, unitConversionProcess };
