'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.role, {
        foreignKey: 'role_id',
      });

      user.hasMany(models.cart, {
        foreignKey: 'user_id',
      });
      user.hasMany(models.transaction, {
        foreignKey: 'user_id',
      });
      user.hasMany(models.address, {
        foreignKey: 'user_id',
      });
    }
  }
  user.init(
    {
      full_name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      profile_image: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      google_login: DataTypes.BOOLEAN,
      token: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
