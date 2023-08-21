const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const userDB = db.user;
const productCategoryDB = db.product_category;
const labelDB = db.label;
const { sequelize } = require('../models');
const transporter = require('../helpers/transporter');

const googleLogin = async (req, res, next) => {
  try {
    const { email, full_name } = req.body;
    console.log(
      '🚀 ~ file: googleLoginController.js:17 ~ googleLogin ~ req.body:',
      req.body,
    );
    const response = await userDB.findOne({ where: { email: email } });
    console.log(
      '🚀 ~ file: googleLoginController.js:19 ~ googleLogin ~ response:',
      response,
    );
    if (!response) {
      const create = await userDB.create({ full_name, email, username: full_name });
    }

    return res.status(200).send({
      success: true,
      message: 'Login with google success',
      // data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  googleLogin,
};
