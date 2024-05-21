'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      this.belongsToMany(models.Tag, { through: 'note_tags', foreignKey: 'note_id' });
    }
  }

  Note.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
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
      underscored: true,
      modelName: 'Note',
      tableName: 'notes'
    }
  );

  return Note;
};