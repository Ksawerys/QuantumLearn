'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.hasMany(models.User, { foreignKey: 'role_id', as: 'users' });
    }
  }

  Role.init(
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
      modelName: 'Role',
      as: 'Roles',
      tableName: 'roles',
      timestamps: false, 
      underscored: true,
    }
  );

  return Role;
};