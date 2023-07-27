'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_category.hasMany(models.label, {
        foreignKey: 'category_id',
      });
    }
  }
  product_category.init(
    {
      category_name: DataTypes.STRING,
      image: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'product_category',
      paranoid: true,
    },
  );
  return product_category;
};
