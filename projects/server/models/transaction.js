'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init(
    {
      promotion_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
      city_id: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      receiver: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'transaction',
    },
  );
  return transaction;
};
