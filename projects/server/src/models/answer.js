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
      answer.belongsTo(models.question, {
        foreignKey: 'question_id',
      });
    }
  }
  answer.init(
    {
      answer: DataTypes.TEXT,
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
