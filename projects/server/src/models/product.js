'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.cart, {
        foreignKey: 'product_id',
      });
      product.belongsTo(models.packaging_type, {
        foreignKey: 'packaging_type_id',
      });
      product.hasMany(models.promotion, {
        foreignKey: 'product_id',
      });
      product.hasMany(models.label, {
        foreignKey: 'product_id',
      });
      product.hasMany(models.closed_stock, {
        foreignKey: 'product_id',
      });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      packaging_type_id: DataTypes.INTEGER,
      product_type_id: DataTypes.INTEGER,
      net_content: DataTypes.INTEGER,
      description: DataTypes.STRING(1000),
      dosing: DataTypes.STRING(1000),
      BPOM_id: DataTypes.STRING,
      require_prescription: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'product',
    },
  );
  return product;
};
