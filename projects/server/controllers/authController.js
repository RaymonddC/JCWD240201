const jwt = require('jsonwebtoken');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const User = db.user;
const transporter = require('../helpers/transporter');

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
      console.log('masuk');
      let token = req.headers.authorization;
      token = token.split(' ')[1];
      let verifiedUser = jwt.verify(token, 'verification-account');

      if (!verifiedUser) throw { message: 'Unauthorized request' };

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
};
