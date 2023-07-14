const db = require('./../models');
const User = db.user;
const { Op } = require('sequelize');

const getUser = async (email = '', username = '') => {
  try {
    return await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
      attributes: { exclude: ['password'] },
    });
  } catch (error) {}
};

const validatePassword = async (password = '', confirmPassword = '') => {
  try {
    if (password.length < 8)
      throw { message: 'Pasword must be more than 8 characters', code: 400 };

    console.log('validation');
    if (password.search(/\d/) == -1)
      throw { message: 'Password at least have 1 number', code: 400 };

    if (password.search(/[A-Z]/) == -1)
      throw { message: 'Password at least have one uppercase char', code: 400 };

    if (password.search(/[!@#$%^&*]/) == -1)
      throw {
        message: 'Password at least have 1 special char (@,!,#, etc).',
        code: 400,
      };
    if (password != confirmPassword)
      throw { message: "Pasword doesn't match", code: 400 };

    return null;
  } catch (error) {
    console.log('error validation');
    return error;
  }
};

module.exports = { getUser, validatePassword };
