const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Class = require('./class'); 
const Note = require('./note');
const Role = require('./role');
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    second_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user',
  }
);
User.belongsToMany(Class, { as: 'TeachingClasses', through: 'teacher_classes', foreignKey: 'teacher_id' });
Class.belongsToMany(User, { as: 'Teachers', through: 'teacher_classes', foreignKey: 'class_id' });
User.belongsToMany(User, { as: 'Tutors', through: 'student_tutors', foreignKey: 'student_id', otherKey: 'tutor_id' });
User.belongsToMany(User, { as: 'Students', through: 'student_tutors', foreignKey: 'tutor_id', otherKey: 'student_id' });
User.belongsToMany(Note, { through: 'user_notes', foreignKey: 'user_id' });
Note.belongsToMany(User, { through: 'user_notes', foreignKey: 'note_id' });
User.belongsToMany(Role, { through: 'user_role', foreignKey: 'user_id' });
Role.belongsToMany(User, { through: 'user_role', foreignKey: 'role_id' });
module.exports = User;