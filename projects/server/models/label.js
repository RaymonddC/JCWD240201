'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // label.hasMany(models.product_category, {
      //   foreignKey: 'category_id',
      // });
      label.belongsTo(models.product, {
        foreignKey: 'product_id',
      })
    }
  }
  label.init({
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'label',
  });
  return label;
};