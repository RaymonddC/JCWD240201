const jwt = require('jsonwebtoken');

module.exports = {
  APIKey: async (req, res, next) => {
    try {
      const token = req.headers.apikey;
      if (!token) throw { message: 'Access Denied' };

      let APIAccess = jwt.verify(token, 'API-key');
      if (!APIAccess) throw { message: 'Access Denied' };

      if (APIAccess.password === 'access-confirm') next();
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  },
};
