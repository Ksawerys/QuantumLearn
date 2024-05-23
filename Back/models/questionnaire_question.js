'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionnaireQuestion extends Model {
    static associate(models) {
      this.belongsTo(models.Questionnaire, { foreignKey: 'questionnaire_id', as: 'questionnaire' });
      this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
    }
  }

  QuestionnaireQuestion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      questionnaire_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'QuestionnaireQuestion',
      tableName: 'questionnaire_questions',
      timestamps: false,
      underscored: true,
    }
  );

  return QuestionnaireQuestion;
};