const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const User = db.user;
const transporter = require('../helpers/transporter');

const {
  getUser,
  validatePassword,
  generateToken,
  getUserByPk,
} = require('../helpers/userHelper');

const sendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    let payload = { email: email };
    const token = jwt.sign(payload, 'verification-account');
    const data = fs.readFileSync('./helpers/verifyEmailTemplate.html', 'utf-8');
    const tempCompile = await Handlebars.compile(data);
    const tempResult = tempCompile({ token: token });

    if (isEmail.test(email)) {
      await transporter.sendMail({
        from: 'pharmacy.jcwd2402@gmail.com',
        to: email,
        subject: 'Account Verification',
        html: tempResult,
      });

      return res.send({
        success: true,
        status: 200,
        message: 'Send Verification Email Success',
        data: null,
      });
    } else {
      throw { status: 400, message: 'email is not valid' };
    }
  } catch (error) {
    return res.send({
      success: false,
      status: error.status,
      message: error.message,
      data: null,
    });
  }
};
const verifyAccount = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    let verifiedUser = jwt.verify(token, 'verification-account');

    if (!verifiedUser) throw { message: 'Unauthorized request', status: 401 };

    const isVerified = await User.findOne({
      where: { email: verifiedUser.email },
    });

    if (isVerified.verified) throw { message: 'Account is already verified' };

    const result = await User.update(
      { verified: true },
      {
        where: {
          email: verifiedUser.email,
        },
      },
    );

    return res.send({
      success: true,
      status: 200,
      message: 'Verification Email Success',
      data: result,
    });
  } catch (error) {
    return res.send({
      success: false,
      status: error.status,
      message: error.message,
      data: null,
    });
  }
};
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

const getUserById = async (req, res, next) => {
  try {
    console.log('test');
    const user = await getUserByPk(req.user.id, [
      'password',
      'createdAt',
      'updatedAt',
    ]);

    if (!user) throw { message: 'user not found!', code: 400 };
    return res.status(200).send({
      success: true,
      message: 'get user success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendVerifyEmail,
  verifyAccount,
  userCreate,
  userLogin,
  getUserById,
};
