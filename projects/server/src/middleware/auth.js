const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized',
        data: null,
      });
    }

    try {
      token = token.split(' ')[1];
      if (token === null || !token)
        throw { message: 'Unauthorized', code: 401 };
      let verifyUser = jwt.verify(token, 'pharmacy');

      if (!verifyUser) throw { message: 'Unauthorized', code: 401 };

      req.user = verifyUser;
      next();
    } catch (error) {
      if (error.message == 'jwt expired') error.code = 401;
      next({ message: error.message, code: error.code || 500 });
    }
  },
};
