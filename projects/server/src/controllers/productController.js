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
    const { page, search, limit, sortType, sortOrder } = req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    let where = {};
    let order = [];
    where.name = { [Op.like]: `%${search}%` };
    where.id = { [Op.not]: 1 };
    if (sortType) {
      order = [[sortType, sortOrder]];
    } else {
      order = [['updatedAt', 'DESC']];
    }
    console.log(sortType, sortOrder, search, order);
    const response = await productDB.findAndCountAll({
      include: labelDB,
      limit: pageLimit,
      offset: offset,
      where: where,
      order: order,
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
    console.log('id', req.params);

    const response = await productDB.findOne({
      where: { id },
    });
    const labels = await labelDB.findAll({
      include: productCategoryDB,
      where: { product_id: id },
    });
    return res.status(200).send({
      success: true,
      message: 'get product details success',
      labels: labels,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts, getProductDetails };
