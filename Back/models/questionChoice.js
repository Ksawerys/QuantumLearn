'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionChoice extends Model {
    static associate(models) {
      this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
      this.belongsTo(models.Choice, { foreignKey: 'choice_id', as: 'choice' });
    }
  }

  QuestionChoice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      choice_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      answer_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'QuestionChoice',
      tableName: 'question_choices',
      timestamps: false,
      underscored: true,
    }
  );

  return QuestionChoice;
};