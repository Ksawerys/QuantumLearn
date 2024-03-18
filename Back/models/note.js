const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Class = require('./class'); 

class Note extends Model {}

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
    modelName: 'note',
  }
);

Note.belongsToMany(Class, { through: 'class_notes', foreignKey: 'note_id' });
Class.belongsToMany(Note, { through: 'class_notes', foreignKey: 'class_id' });
Note.belongsToMany(Note, { as: 'Subnotes', through: 'subnotes', foreignKey: 'note_id', otherKey: 'subnote_id' });
Note.belongsToMany(Note, { as: 'ParentNotes', through: 'subnotes', foreignKey: 'subnote_id', otherKey: 'note_id' });
module.exports = Note;