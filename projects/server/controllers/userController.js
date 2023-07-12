const { user } = require('./../models');

// const User = db.user;

const sequelize = require('sequelize');

module.exports = {
  getUserData: async (req, res) => {
    try {
      const hehe = await user.findAll();
      res.send(hehe);
    } catch (error) {
      res.send(error);
    }
  },
};
