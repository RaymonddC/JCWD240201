const jwt = require('jsonwebtoken');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const User = db.user;
const transporter = require('../helpers/transporter');
const bcrypt = require('bcrypt')

module.exports = {
  sendVerifyEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const isEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
      let payload = { email: email };
      const token = jwt.sign(payload, 'verification-account');
      const data = fs.readFileSync(
        './helpers/verifyEmailTemplate.html',
        'utf-8',
      );
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
  },

  verifyAccount: async (req, res) => {
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
  },

  sendResetPasswordForm: async (req, res) => {
    try {
      // create email token
      const { email } = req.body;
      const isEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
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
  },

  resetPassword: async (req, res) => {
    try {
      //create and validate new password
      const { newPassword } = req.body;
      const isPasswordValid = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
      if(!isPasswordValid.test(newPassword)) throw {message: 'Password is not Valid', status: 400}
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
  },
};
