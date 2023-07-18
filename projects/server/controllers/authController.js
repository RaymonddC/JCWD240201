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
  validateEmail,
} = require('../helpers/userHelper');

const sendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    let payload = { email: email };
    const token = jwt.sign(payload, 'verification-account');
    const data = fs.readFileSync('./helpers/verifyEmailTemplate.html', 'utf-8');
    const tempCompile = await Handlebars.compile(data);
    const tempResult = tempCompile({ token: token });

    const isEmailValid = await validateEmail(email);
    if (isEmailValid) throw isEmailValid;

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
  } catch (error) {
    console.log(error);
    next(error);
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
    const user = await getUserByPk(req.user.id, [
      'password',
      'createdAt',
      'updatedAt',
    ]);
    const User = db.user;
    const { getUser, validatePassword } = require('../helpers/userHelper');

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

const sendResetPasswordForm = async (req, res) => {
  try {
    // create email token
    const { email } = req.body;
    const isEmail = new RegExp(/\S+@\S+.\S+/);
    let payload = { email: email };
    const token = jwt.sign(payload, 'reset-password');
    if (!isEmail.test(email))
      throw { status: 400, message: 'email is not valid' };

    //find user
    const findUser = await User.findOne({
      where: { email: email },
    });
    if (!findUser) throw { message: 'Account is not found', status: 400 };

    //send reset password form
    const data = fs.readFileSync('./helpers/resetPasswordForm.html', 'utf-8');
    const tempCompile = await Handlebars.compile(data);
    const tempResult = tempCompile({ token: token });

    if (isEmail.test(email)) {
      await transporter.sendMail({
        from: 'pharmacy.jcwd2402@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: tempResult,
      });

      return res.send({
        success: true,
        status: 200,
        message: 'Send Reset Password Form Success',
        data: null,
      });
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

const resetPassword = async (req, res) => {
  try {
    //create and validate new password
    const { newPassword } = req.body;
    const isPasswordValid = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );
    if (!isPasswordValid.test(newPassword))
      throw { message: 'Password is not Valid', status: 400 };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    //get user email
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    let getEmail = jwt.verify(token, 'reset-password');

    if (!getEmail) throw { message: 'Unauthorized request', status: 401 };

    //reset password
    User.update(
      { password: hashPassword },
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
    return res.send({
      success: false,
      status: error.status,
      message: error.message,
      data: null,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    //validate new password
    const isPasswordValid = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );

    if (!isPasswordValid.test(newPassword))
      throw { message: 'Password is not Valid', status: 400 };

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
        message: 'Change Password Success',
        data: result,
      });
    }else{
      throw {message: 'Wrong old password', status: 400}
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
