const db = require('../models');
const Role = db.role;

const isAdmin = async (req, res, next) => {
  try {
    const roleId = req.user.role_id;
    const getRole = await Role.findOne({ where: { id: roleId } });

    if (getRole.role_name !== 'admin') throw { message: 'Access denied' };

    next();
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const isUser = async (req, res, next) => {
  try {
    const roleId = req.user.role_id;
    const getRole = await Role.findOne({ where: { id: roleId } });

    if (getRole.role_name !== 'user' || getRole.verified !== true)
      throw { message: 'Access denied' };

    next();
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { isAdmin, isUser };
