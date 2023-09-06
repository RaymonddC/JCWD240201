const jwt = require('jsonwebtoken');
const db = require('./../models');
const userDB = db.user;

module.exports = {
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized1',
        data: null,
      });
    }

    try {
      token = token.split(' ')[1];
      if (token === null || !token)
        throw { message: 'Unauthorized2', code: 401 };
      let verifyUser = jwt.verify(token, 'pharmacy');

      if (!verifyUser) throw { message: 'Unauthorized3', code: 401 };

      req.user = verifyUser;
      next();
    } catch (error) {
      if (error.message == 'jwt expired') error.code = 401;
      next({ message: error.message, code: error.code || 500 });
    }
  },

  verifyTokenEmail: async (req, res, next) => {
    let token = req.headers.token_email;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized4',
        data: req.headers,
      });
    }

    try {
      token = token.split(' ')[1];
      if (token === null || !token)
        throw { message: 'Unauthorized5', code: 401 };

      let verifyUser = jwt.verify(token, 'change-email');

      const getChangeEmailToken = await userDB.findOne({
        where: { email: verifyUser.email },
      });
      if (getChangeEmailToken.change_email_token !== token)
        throw { message: 'Link expired', code: 401 };
      if (!verifyUser) throw { message: 'Unauthorized6', code: 401 };

      req.user = verifyUser;
      next();
    } catch (error) {
      if (error.message == 'jwt expired') error.code = 401;
      next({ message: error.message, code: error.code || 500 });
    }
  },
};
