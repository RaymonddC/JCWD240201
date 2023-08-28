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
    let result = await getUser(email, email);
    
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
    if (!result.dataValues.google_login) {
      throw {
        message: 'Your account was signed up using a diffrent method',
        code: 400,
      };
    }
    const token = await generateToken(result);
    const user = await getUser(email, email, 'password');
    return res.status(200).send({
      success: true,
      message: 'Login success',
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
