const { user, role } = require('./../models');

// const User = db.user;

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
            id: 1,
          },
        },
      );

      res.status(200).send(updateData);
    } catch (error) {
      res.status(error.code).send(error.message || error);
    }
  },
};
