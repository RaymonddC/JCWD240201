const { user, role } = require('./../models');

// const User = db.user;
const bcrypt = require('bcrypt');

const sequelize = require('sequelize');

const validate = (data) => {
  if (
    !data.full_name ||
    !data.phone_number ||
    !data.gender ||
    !data.birthdate
  ) {
    throw { message: 'Please fill your form correctly', code: 400 };
  }
};

module.exports = {
  getUserData: async (req, res) => {
    try {
      //TODO: get user_id from token
      const hehe = await user.findOne({
        include: { model: role, attributes: ['role_name'] },
        attributes: {
          exclude: ['password', 'username'],
        },
        where: {
          id: 1,
        },
      });
      res.send(hehe);
    } catch (error) {
      res.send(error.message || error);
    }
  },
  updateUserData: async (req, res) => {
    try {
      const auth = req.user;
      const { full_name, phone_number, gender, birthdate } = req.body;
      //TODO: get user_id from token
      validate({ full_name, phone_number, gender, birthdate });

      const updateData = await user.update(
        {
          full_name,
          phone_number,
          gender,
          birthdate,
        },
        {
          where: {
            id: auth.id,
          },
        },
      );

      res.status(200).send({
        success: false,
        message: 'User updated successfully',
      });
    } catch (error) {
      res.status(error.code || 404).send(error.message || error);
    }
  },
  // sementara
  // bcrypt: async (req, res) => {
  //   try {
  //     const { password } = req.body;
  //     const salt = await bcrypt.genSalt(10);
  //     const hashPassword = await bcrypt.hash(password, salt);
  //     res.send(hashPassword);
  //   } catch (error) {
  //     res.send(error.message || error);
  //   }
  // },
};
