'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      question.belongsTo(models.answer, {
        foreignKey: 'question_id',
      });
    }
  }
  answer.init(
    {
      answer: DataTypes.STRING,
      question_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'answer',
    },
  );
  return answer;
};
