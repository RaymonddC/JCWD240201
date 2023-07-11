'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class packaging_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  packaging_type.init(
    {
      type_name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'packaging_type',
    },
  );
  return packaging_type;
};
