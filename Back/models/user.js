'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Class, { as: 'TeachingClasses', through: 'teacher_classes', foreignKey: 'teacher_id' });
      models.Class.belongsToMany(this, { as: 'Teachers', through: 'teacher_classes', foreignKey: 'class_id' });
      this.belongsToMany(this, { as: 'Tutors', through: 'student_tutors', foreignKey: 'student_id', otherKey: 'tutor_id' });
      this.belongsToMany(this, { as: 'Students', through: 'student_tutors', foreignKey: 'tutor_id', otherKey: 'student_id' });
      this.belongsToMany(models.Note, { through: 'user_notes', foreignKey: 'user_id' });
      models.Note.belongsToMany(this, { through: 'user_notes', foreignKey: 'note_id' });
      this.belongsToMany(models.Role, { through: 'user_roles', foreignKey: 'user_id' });
      models.Role.belongsToMany(this, { through: 'user_roles', foreignKey: 'role_id' });
      this.hasMany(models.UserAnswer, { foreignKey: 'user_id', as: 'UserAnswer' });
    }
  }

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
        defaultValue: true,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};