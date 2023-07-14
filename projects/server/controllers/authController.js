const db = require('./../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');

const User = db.user;
const {
  getUser,
  validatePassword,
  generateToken,
} = require('../helpers/userHelper');

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

    const result = await getUser(newUser.email, newUser.username);

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

const userLogin = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password)
      throw { message: 'Fill all data', code: 400 };

    let result = await getUser(usernameOrEmail, usernameOrEmail);

    if (!result) throw { message: 'Invalid Credentials', code: 400 };

    const isUserExists = await bcrypt.compare(password, result.password);

    if (!isUserExists) {
      //   const updateSuspend = await User.increment({ suspendCounter: 1 }, { where: { [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] } });

      //   console.log(updateSuspend[0][1], 'hello');

      //   result = await getUser(usernameOrEmail, usernameOrEmail);

      throw { message: 'Invalid Credentials', code: 400 };
    } else {
      const token = await generateToken(result);

      //   const updateSuspend = await User.update({ suspendCounter: 0 }, { where: { [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] } });

      //   result = await getUser(usernameOrEmail, usernameOrEmail);

      const user = await getUser(usernameOrEmail, usernameOrEmail, 'password');

      return res.status(200).send({
        success: true,
        message: 'Login Success',
        data: user,
        token: token,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { userCreate, userLogin };
