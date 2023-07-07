'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING,
    packaging_type_id: DataTypes.INTEGER,
    product_type_id: DataTypes.INTEGER,
    product_category_id: DataTypes.INTEGER,
    net_content: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    dosing: DataTypes.STRING,
    BPOM_id: DataTypes.INTEGER,
    require__prescription: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};