'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      this.belongsToMany(models.Class, { through: 'class_notes', foreignKey: 'note_id' });
      models.Class.belongsToMany(this, { through: 'class_notes', foreignKey: 'class_id' });
      this.belongsToMany(this, { as: 'Subnotes', through: 'subnotes', foreignKey: 'note_id', otherKey: 'subnote_id' });
      this.belongsToMany(this, { as: 'ParentNotes', through: 'subnotes', foreignKey: 'subnote_id', otherKey: 'note_id' });
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      grade: {
        type: DataTypes.FLOAT,
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
      underscored: true,
      modelName: 'Note',
      tableName: 'notes'
    }
  );

  return Note;
};