const { Op } = require('sequelize');
const db = require('../models');
const stockHistoryDB = db.stock_history;
const stockHistoryTypeDB = db.stock_history_type;
const productDB = db.product;
const productTypeDB = db.product_type;
const packagingDB = db.packaging_type;
const { sequelize } = require('../models');

const stockHistoryList = async (req, res, next) => {
  try {

    return res.send({
      success: true,
      message: 'get data success',
    });
  } catch (error) {}
};

module.exports = {
  stockHistoryList,
};
