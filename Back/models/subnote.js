'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subnote extends Model {
    static associate(models) {
        this.belongsTo(models.Note, { as: 'Note', foreignKey: 'note_id' });
        this.belongsTo(models.Subnote, { as: 'ParentSubnote', foreignKey: 'subnote_id' });
    }
  }

  Subnote.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      note_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subnote_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Subnote',
      tableName: 'subnotes',
      timestamps: true,   
    }
  );

  return Subnote;
};