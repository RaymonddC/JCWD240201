'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promotion_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  promotion_type.init({
    promotion: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'promotion_type',
  });
  return promotion_type;
};