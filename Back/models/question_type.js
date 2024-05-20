'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionType extends Model {
    static associate(models) {
      this.hasMany(models.Question, { foreignKey: 'type_id', as: 'questions' });
    }
  }

  QuestionType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'QuestionType',
      tableName: 'question_types',
      timestamps: false,
      underscored: true,
    }
  );

  return QuestionType;
};