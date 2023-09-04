'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_prescription_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction_prescription_detail.belongsTo(models.transaction_detail, {
        foreignKey: 'transaction_detail_id',
      });
    }
  }
  transaction_prescription_detail.init(
    {
      transaction_detail_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      unit_conversion: DataTypes.BOOLEAN,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'transaction_prescription_detail',
    },
  );
  return transaction_prescription_detail;
};
