const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const productDB = db.product;
const transporter = require('../helpers/transporter');

const getLabels = async (req, res, next) => {
  try {
    console.log('get labels');
    const response = await labelDB.findAll({
      include: productDB,
      // group: ['product_id'],
      
    });
    return res.status(200).send({
      success: true,
      message: 'get all labels success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLabels };
