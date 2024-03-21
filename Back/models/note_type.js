'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NoteType extends Model {
    static associate(models) {
      // Define associations here
      // this.hasMany(models.Note, { foreignKey: 'noteTypeId', as: 'notes' });
    }
  }

  NoteType.init(
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
    },
    {
      sequelize,
      modelName: 'NoteType',
      tableName: 'note_types',
      timestamps: false,
      underscored: true,
    }
  );

  return NoteType;
};