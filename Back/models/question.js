'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      // Define associations here
      // this.belongsTo(models.QuestionType, { foreignKey: 'type_id', as: 'questionType' });
      // this.hasMany(models.QuestionChoice, { foreignKey: 'question_id', as: 'questionChoices' });
    }
  }

  Question.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Question',
      tableName: 'questions',
      underscored: true,
    }
  );

  return Question;
};