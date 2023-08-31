'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      address.belongsTo(models.user, {
        foreignKey: 'user_id',
      });
    }
  }
  address.init(
    {
      user_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      province_id: DataTypes.INTEGER,
      city_name: DataTypes.STRING,
      province_name: DataTypes.STRING,
      notes: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      reciever: DataTypes.STRING,
      is_main: DataTypes.BOOLEAN,
      is_selected: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'address',
      paranoid: true,
    },
  );
  return address;
};
