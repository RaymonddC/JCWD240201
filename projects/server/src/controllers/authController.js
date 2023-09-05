const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const User = db.user;
const transporter = require('../helpers/transporter');
const domain = process.env.WHITELISTED_DOMAIN;
const path = require('path');
// Get the current script's directory
const currentDir = __dirname;
// Go up one levels to get the desired directory
const oneLevelsUpDir = path.join(currentDir, '..');

const {
  getUser,
  validatePassword,
  generateToken,
  getUserByPk,
  validateEmail,
} = require('../helpers/authHelper');

const sendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isVerified = await User.findOne({ where: { email: email } });
    if (isVerified.verified) throw { message: 'Account is already verified' };
    let payload = { email: email };
    const token = jwt.sign(payload, 'verification-account', {
      expiresIn: '1h',
    });

    await User.update(
      { token: token },
      {
        where: {
          email: email,
        },
      },
    );

    const data = fs.readFileSync(
      `${oneLevelsUpDir}/helpers/verifyEmailTemplate.html`,
      'utf-8',
    );
    const tempCompile = await Handlebars.compile(data);
    const tempResult = tempCompile({ token: token, domain: domain });

    const isEmailValid = await validateEmail(email);
    if (isEmailValid) throw isEmailValid;

    await transporter.sendMail({
      from: 'pharmacy.jcwd2402@gmail.com',
      to: email,
      subject: 'Account Verification',
      html: tempResult,
      attachments: [
        {
          filename: 'Medicore.png',
          path: `${oneLevelsUpDir}/public/Medicore.png`,
          cid: 'logo1',
        },
      ],
    });

    return res.send({
      success: true,
      status: 200,
      message: 'Send verification email Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
const verifyAccount = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    let verifiedUser = jwt.verify(token, 'verification-account');

    if (!verifiedUser) throw { message: 'Unauthorized request', code: 401 };

    const isVerified = await User.findOne({
      where: { email: verifiedUser.email },
    });

    if (isVerified.verified) throw { message: 'Account is already verified' };

    const getToken = await User.findOne({
      where: { email: verifiedUser.email },
    });
    if (token !== getToken.token)
      throw {
        message: 'Token is not found, please resend your verification request',
      };

    const result = await User.update(
      { verified: true, token: '' },
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
    next(error);
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

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber
    )
      throw { message: 'Fill all data', code: 400 };

    const isEmailValid = await validateEmail(email);
    if (isEmailValid) throw isEmailValid;

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

    const result = await getUser(newUser.email, newUser.username, 'password');

    req.params.username = result.username;

    next();
    // return res.status(201).send({
    //   success: true,
    //   message: 'Register Success',
    //   data: result,
    // });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password)
      throw { message: 'Fill all data', code: 400 };

    let result = await getUser(usernameOrEmail, usernameOrEmail);

    if (!result) throw { message: 'Invalid Credentials', code: 400 };
    // if (!result.verified) {
    //   throw { message: 'Please check verification email' };
    // }
    if (result.google_login) {
      throw { message: 'You account was signed up using a diferent method' };
    }

    const isUserExists = await bcrypt.compare(password, result.password);

    if (!isUserExists) {
      //   const updateSuspend = await User.increment({ suspendCounter: 1 }, { where: { [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] } });

      //   result = await getUser(usernameOrEmail, usernameOrEmail);

      throw { message: 'Invalid Credentials', code: 400 };
    } else {
      const token = await generateToken(result);

      //   const updateSuspend = await User.update({ suspendCounter: 0 }, { where: { [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] } });

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
    const user = await getUserByPk(req.user.id, [
      'password',
      'createdAt',
      'updatedAt',
    ]);
    const User = db.user;
    const { getUser, validatePassword } = require('../helpers/authHelper');

    if (!user) {
      throw { message: 'user not found!', code: 400 };
    }
    return res.status(200).send({
      success: true,
      message: 'Get user success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const sendResetPasswordForm = async (req, res, next) => {
  try {
    // create email token
    const { email } = req.body;
    const isEmail = new RegExp(/\S+@\S+.\S+/);
    let payload = { email: email };
    const token = jwt.sign(payload, 'reset-password', {
      expiresIn: '1h',
    });

    //input token to DB
    await User.update(
      { reset_password_token: token },
      {
        where: {
          email: email,
        },
      },
    );

    if (!isEmail.test(email))
      throw { code: 400, message: 'Email is not valid' };

    //find user
    const findUser = await User.findOne({
      where: { email: email },
    });
    if (!findUser) throw { message: 'Account is not found', code: 400 };

    //send reset password form
    const data = fs.readFileSync(
      `${oneLevelsUpDir}/helpers/resetPasswordForm.html`,
      'utf-8',
    );
    const tempCompile = await Handlebars.compile(data);
    const tempResult = tempCompile({ token: token, domain: domain });

    if (isEmail.test(email)) {
      await transporter.sendMail({
        from: 'pharmacy.jcwd2402@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: tempResult,
        attachments: [
          {
            filename: 'Medicore.png',
            path: `${oneLevelsUpDir}/public/Medicore.png`,
            cid: 'logo1',
          },
        ],
      });

      return res.send({
        success: true,
        status: 200,
        message: 'Send reset password form success',
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    //create and validate new password
    const { newPassword } = req.body;
    const isPasswordValid = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );
    if (!isPasswordValid.test(newPassword))
      throw { message: 'Password is not Valid', code: 400 };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    //get user email
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    let getEmail = jwt.verify(token, 'reset-password');

    if (!getEmail) throw { message: 'Unauthorized request', code: 401 };

    //checking token
    const getToken = await User.findOne({
      where: { email: getEmail.email },
    });
    if (token !== getToken.reset_password_token)
      throw {
        message:
          'Token is not found, please resend your reset password request',
      };

    //reset password
    await User.update(
      { password: hashPassword, reset_password_token: '' },
      {
        where: {
          email: getEmail.email,
        },
      },
    );

    return res.send({
      success: true,
      status: 200,
      message: 'Reset Password Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    //validate new password
    const isPasswordValid = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );

    if (!isPasswordValid.test(newPassword))
      throw { message: 'Password is not valid', code: 400 };

    //get data user and compare old password
    const getUser = await User.findOne({ where: { id: userId } });
    if (!getUser) throw { message: 'Account is not found' };
    const isUserExist = await bcrypt.compare(oldPassword, getUser.password);

    //change password
    if (isUserExist) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      const result = await User.update(
        { password: hashPassword },
        {
          where: {
            id: userId,
          },
        },
      );

      return res.send({
        success: true,
        status: 200,
        message: 'Change password success',
        data: result,
      });
    } else {
      throw { message: 'Wrong old password', code: 400 };
    }
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
  sendResetPasswordForm,
  resetPassword,
  changePassword,
};
