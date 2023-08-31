'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.product, {
        foreignKey: 'product_id',
      });
      cart.belongsTo(models.user, {
        foreignKey: 'user_id',
      });
      // cart.hasMany(models.user, {
      //   foreignKey: 'cart_id',
      // });
    }
  }
  cart.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      prescription_image: DataTypes.STRING,
      confirmation: DataTypes.BOOLEAN,
      is_check: DataTypes.BOOLEAN,
      notes: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'cart',
    },
  );
  return cart;
};
