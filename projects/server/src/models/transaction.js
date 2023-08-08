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
      transaction.hasMany(models.transaction_detail, {
        foreignKey: 'transaction_id',
      });
      transaction.hasMany(models.transaction_history, {
        foreignKey: 'transaction_id',
      });
    }
  }
  transaction.init(
    {
      promotion_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
      city_id: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      receiver: DataTypes.STRING,
      shipment_fee: DataTypes.INTEGER,
      total_discount: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'transaction',
      paranoid: true,
    },
  );
  return transaction;
};
