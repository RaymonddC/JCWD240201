'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction_detail.init(
    {
      cart_id: DataTypes.INTEGER,
      promotion_id: DataTypes.INTEGER,
      transaction_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'transaction_detail',
    },
  );
  return transaction_detail;
};
