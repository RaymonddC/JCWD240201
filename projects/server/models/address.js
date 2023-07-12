'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  address.init({
    user_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    reciever: DataTypes.STRING,
    is_main: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};