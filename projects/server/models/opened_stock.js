'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class opened_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  opened_stock.init({
    product_id: DataTypes.INTEGER,
    exp_date: DataTypes.DATEONLY,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'opened_stock',
  });
  return opened_stock;
};