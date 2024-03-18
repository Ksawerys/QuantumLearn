const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Student = require('./user'); 

class Class extends Model {}

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
    underscored: true,
    modelName: 'class',
  }
);

Class.belongsToMany(Student, { through: 'class_students', foreignKey: 'class_id' });
Student.belongsToMany(Class, { through: 'class_students', foreignKey: 'student_id' });
module.exports = Class;