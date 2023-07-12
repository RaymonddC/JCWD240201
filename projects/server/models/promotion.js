'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  promotion.init({
    product_id: DataTypes.INTEGER,
    promotion_type_id: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    buy: DataTypes.INTEGER,
    get: DataTypes.INTEGER,
    minimum_transaction: DataTypes.INTEGER,
    maximum_discount_amount: DataTypes.INTEGER,
    date_start: DataTypes.DATEONLY,
    date_end: DataTypes.DATEONLY,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'promotion',
  });
  return promotion;
};