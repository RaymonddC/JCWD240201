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
const { getUser, generateToken } = require('../helpers/authHelper');

const googleLogin = async (req, res, next) => {
  try {
    const { email, full_name, role } = req.body;
    console.log(
      '🚀 ~ file: googleLoginController.js:17 ~ googleLogin ~ req.body:',
      req.body,
    );
    // const response = await userDB.findOne({ where: { email: email } });
    let result = await getUser(email, full_name);
    
    if (!result) {
      result = await userDB.create({
        full_name,
        email,
        username: full_name,
        role_id: role ? role : 2,
        verified: true,
        google_login: true,
      });
    }
    const token = await generateToken(result);
    const user = await getUser(email, full_name, 'password');
    return res.status(200).send({
      success: true,
      message: 'Login Success',
      data: user,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  googleLogin,
};
