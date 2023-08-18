const { default: axios } = require('axios');

const verify = async (req, res, next) => {
  try {
    const secret = '6LeYE7cnAAAAAJiAkHiEVSKQ4DLRF7LjPfRc4Nx9';
    const { token } = req.body;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      },
    );

    if (!response.data.success)
      throw { message: 'You might be a robot, sorry! You are banned!' };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verify };
