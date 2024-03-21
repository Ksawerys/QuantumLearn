'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionChoice extends Model {
    static associate(models) {
      // Define associations here
      // this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
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
      choice: {
        type: DataTypes.TEXT,
        allowNull: true,
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