'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    static associate(models) {
      this.hasMany(models.QuestionChoice, { foreignKey: 'choice_id', as: 'questionChoices' });
    }
  }

  Choice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Choice',
      tableName: 'Choices',
      timestamps: true,
      underscored: true,
    }
  );

  return Choice;
};