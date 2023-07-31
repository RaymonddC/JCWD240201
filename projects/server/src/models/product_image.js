'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_image.init(
    {
      product_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      paranoid: true,
    },
  );
  return product_image;
};
