const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Question = require('./questionnaire');

class Questionnaire extends Model {}

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
      defaultValue: null,
    },

  },
  {
    sequelize,
    underscored: true,
    modelName: 'questionnaire',
  }
);
Questionnaire.belongsToMany(Question, { through: 'questionnaire_questions', foreignKey: 'questionnaire_id' });
Question.belongsToMany(Questionnaire, { through: 'questionnaire_questions', foreignKey: 'question_id' });
module.exports = Questionnaire;