'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Note, { through: 'note_tags', foreignKey: 'tag_id' });
    }
}

  Tag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
      modelName: 'Tag',
      tableName: 'tags'
    }
  );

  return Tag;
};