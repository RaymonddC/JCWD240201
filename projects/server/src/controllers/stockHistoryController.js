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
    const {
      page,
      limit,
      product_id,
      sort_date,
      sortOrder,
      date_start,
      date_end,
    } = req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    const startDate = new Date(date_start);
    const endDate = new Date(date_end);
    const sortDate = new Date(sort_date)
    let where = {};
    let order = [];

    if (product_id) {
      where.product_id = product_id;
    }

    if(date_start && date_end && sort_date) throw {message: "Date is not valid"}
    if((!date_start && date_end) || (!date_end && date_start)) throw {message: "Complete the date"}

    if (date_start && date_end) {
      where.createdAt = {
        [Op.between]: [
          startDate.setDate(startDate.getDate() - 1),
          endDate.setDate(endDate.getDate() + 1),
        ],
      };
    }

    if (sort_date) {
      where.createdAt = {
        [Op.between]: [
          sortDate.setDate(sortDate.getDate()),
          sortDate.setDate(sortDate.getDate() + 1),
        ],
      };
    }

    if (sortOrder) {
      order = [['createdAt', sortOrder]];
    } else {
      order = [['createdAt', 'DESC']];
    }

    const result = await stockHistoryDB.findAll({
      include: stockHistoryTypeDB,
      where: where,
      order: order,
      offset: offset,
      limit: pageLimit,
    });

    return res.send({
      success: true,
      message: 'get data success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  stockHistoryList,
};
