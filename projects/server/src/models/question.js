'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      question.belongsTo(models.question_category, {
        foreignKey: 'question_category_id',
      });
      question.hasMany(models.answer,{
        foreignKey: 'question_id',
      })
    }
  }
  question.init(
    {
      question: DataTypes.STRING,
      title: DataTypes.STRING,
      question_category_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'question',
    },
  );
  return question;
};
