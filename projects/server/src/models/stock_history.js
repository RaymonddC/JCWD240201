'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stock_history.init(
    {
      product_id: DataTypes.INTEGER,
      unit: DataTypes.BOOLEAN,
      stock_history_type_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      action: DataTypes.STRING,
      total_stock: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'stock_history',
    },
  );
  return stock_history;
};
