const db = require('./../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Handlebars = require('handlebars');
const fs = require('fs');

const User = db.user;
const { getUser, validatePassword } = require('../helpers/userHelper');

const sequelize = require('sequelize');

const userCreate = async (req, res, next) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role,
    } = req.body;
    console.log(req.body.username);

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber
    )
      throw { message: 'Fill all data', code: 400 };

    const isEmailExist = await getUser(email, username);
    // process.exit();
    if (isEmailExist)
      throw { message: 'username or email is already exists', code: 400 };

    const passwordError = await validatePassword(password, confirmPassword);
    if (passwordError) throw passwordError;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let newUser = await User.create({
      full_name: fullName,
      username,
      email,
      password: hashPassword,
      phone_number: phoneNumber,
      role_id: role ? role : 2,
    });

    const result = await getUser(newUser.email, newUser.username, 'password');

    req.params.username = result.username;

    // next();
    return res.status(201).send({
      success: true,
      message: 'Register Success',
      data: result,
    });
  } catch (error) {
    next(error);
    // res.status(error.code || 500).send({
    //   success: false,
    //   message: error.message,
    //   data: null,
    // });
  }
};

module.exports = { userCreate };
