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
    const { page, limit, product_id, sortOrder, date_start, date_end } =
      req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    const startDate = new Date(date_start);
    const endDate = new Date(date_end);
    let where = {};
    let order = [];

    if (product_id) {
      where.product_id = product_id;
    }

    if (!date_start || !date_end) throw { message: 'Complete the date' };

    if (date_start && date_end) {
      where.createdAt = {
        [Op.between]: [
          startDate.setDate(startDate.getDate() - 1),
          endDate.setDate(endDate.getDate() + 1),
        ],
      };
    }

    if (sortOrder) {
      order = [['createdAt', sortOrder]];
    } else {
      order = [['createdAt', 'DESC']];
    }

    const result = await stockHistoryDB.findAndCountAll({
      include: [
        { model: stockHistoryTypeDB },
        { model: productDB, include: [packagingDB, productTypeDB] },
      ],
      where: where,
      order: order,
      offset: offset,
      limit: pageLimit,
    });

    const totalPage = Math.ceil(result.count / pageLimit);

    return res.send({
      success: true,
      message: 'get data success',
      data: result,
      totalPage: totalPage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  stockHistoryList,
};
