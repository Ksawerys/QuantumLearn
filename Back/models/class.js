'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      this.belongsToMany(models.User, { through: 'class_students', foreignKey: 'class_id' });
      models.User.belongsToMany(this, { through: 'class_students', foreignKey: 'student_id' });
    }
  }

  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
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
      modelName: 'Class',
      tableName: 'classes',
      timestamps: true, 
      underscored: true,
    }
  );

  return Class;
};