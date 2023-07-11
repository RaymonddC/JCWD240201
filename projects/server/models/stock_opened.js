'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_opened extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stock_opened.init({
    product_id: DataTypes.INTEGER,
    exp_date: DataTypes.DATEONLY,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'stock_opened',
  });
  return stock_opened;
};