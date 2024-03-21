'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    static associate(models) {
      this.belongsToMany(models.Question, { through: 'questionnaire_questions', foreignKey: 'questionnaire_id' });
      models.Question.belongsToMany(this, { through: 'questionnaire_questions', foreignKey: 'question_id' });
    }
  }

  Questionnaire.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Questionnaire',
      tableName: 'questionnaires',
      underscored: true,
    }
  );

  return Questionnaire;
};