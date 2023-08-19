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
      product.belongsTo(models.product_type, {
        foreignKey: 'product_type_id',
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
      product.hasMany(models.opened_stock, {
        foreignKey: 'product_id',
      });
      product.hasMany(models.prescription_cart, {
        foreignKey: 'product_id',
      });
      product.hasMany(models.transaction_detail, {
        foreignKey: 'product_id',
      });
      product.hasOne(models.stock_history, {
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
      weight: DataTypes.INTEGER,
      BPOM_id: DataTypes.STRING,
      require_prescription: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'product',
    },
  );
  return product;
};
