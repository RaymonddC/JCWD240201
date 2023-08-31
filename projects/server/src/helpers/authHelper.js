const db = require('../models');
const User = db.user;
const Role = db.role;
const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');

const generateToken = async (result) => {
  try {
    let payload = {
      id: result.id,
      role_id: result.role_id,
    };

    return jwt.sign(payload, 'pharmacy', {
      expiresIn: '5h',
    });
  } catch (error) {
    return error;
  }
};

const validateEmail = async (email = '') => {
  try {
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      throw { message: 'Invalid Email', code: 400 };
    }
  } catch (error) {
    return error;
  }
};

const getUser = async (email = '', username = '', excludes) => {
  try {
    return await User.findOne({
      include: [{ model: Role, attributes: ['role_name'] }],
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
      attributes: { exclude: [excludes] },
    });
  } catch (error) {
    return error;
  }
};

const getUserByPk = async (primaryKey, excludes) => {
  try {
    return await User.findByPk(primaryKey, {
      include: [{ model: Role, attributes: ['role_name'] }],
      attributes: { exclude: excludes },
    });
  } catch (error) {
    return error;
  }
};

const validatePassword = async (password = '', confirmPassword = '') => {
  try {
    if (password.length < 8)
      throw { message: 'Pasword must be more than 8 characters', code: 400 };

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
    return error;
  }
};

module.exports = {
  getUser,
  validatePassword,
  getUserByPk,
  generateToken,
  validateEmail,
};
