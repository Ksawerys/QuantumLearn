const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class QuestionChoice extends Model {}

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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'questionChoice',
  }
);

module.exports = QuestionChoice;