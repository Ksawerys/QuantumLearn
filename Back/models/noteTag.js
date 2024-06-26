'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NoteTag extends Model {
    static associate(models) {
      this.belongsTo(models.Note, { foreignKey: 'note_id' });
      this.belongsTo(models.Tag, { foreignKey: 'tag_id' });
    }
  }

  NoteTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      note_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      data: {
        //por si en un futuro la estructura de datos se vuelve mas compleja
        type: DataTypes.JSON,
        allowNull: false
      }
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
      modelName: 'NoteTag',
      tableName: 'note_tags'
    }
  );

  return NoteTag;
};