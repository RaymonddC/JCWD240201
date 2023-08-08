'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescription_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      prescription_cart.belongsTo(models.product, {
        foreignKey: 'product_id',
      });
    }
  }
  prescription_cart.init(
    {
      cart_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      unit_conversion: DataTypes.BOOLEAN,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'prescription_cart',
    },
  );
  return prescription_cart;
};
