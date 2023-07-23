const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const transporter = require('../helpers/transporter');
const productDB = db.product;

const getAllProducts = async (req, res, next) => {
  try {
    const { page, search, category, limit } = req.query;
    // console.log(req.query);
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit + 1;
    let where = undefined;
    let order;
    if (search !== 'undefined') {
      where = {};
      where.name = { [Op.like]: `%${search}%` };
    }
    if (category !== 'undefined') {
      where = {};
      where.category_id = category;
    }
    const response = await productDB.findAndCountAll({
      include: labelDB,
      limit: pageLimit,
      offset: offset,
      where: where,
      order: [['name', 'ASC']],
    });
    const totalPage = Math.ceil((response.count - 1) / pageLimit);
    // console.log(pageLimit, '<<');
    // console.log(response);
    // console.log(offset);
    // console.log(totalPage);
    return res.status(200).send({
      success: true,
      message: 'get all products success',
      totalPage: totalPage,
      data: response,
    });
  } catch (error) {
    next(error);
    // return res.send({
    //   success: false,
    //   message: error.message,
    // });
  }
};
const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productDB.findOne({
      where: { id },
    });

    return res.status(200).send({
      success: true,
      message: 'get product details success',
      data: response,
    });
  } catch (error) {}
};

module.exports = { getAllProducts, getProductDetails };
