'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_closed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stock_closed.init({
    product_id: DataTypes.INTEGER,
    exp_date: DataTypes.DATEONLY,
    total_stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stock_closed',
  });
  return stock_closed;
};