const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const transporter = require('../helpers/transporter');

const getAllCategories = async (req, res, next) => {
  try {
    console.log('Getting all categories');
    const response = await productCategoryDB.findAll();

    return res.status(200).send({
      success: true,
      message: 'get all categories success',
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

module.exports = { getAllCategories };
