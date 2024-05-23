const DatabaseConnection = require('./DatabaseConnection')
const model = require('../models/index')
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const conx = new DatabaseConnection()
const { Op } = require('sequelize');


class UserConnection {

  insertUser = async (user, roles) => {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await model.User.create({
        ...user,
        password: hashedPassword
      });

      if (roles && roles.length > 0) {
        const roleInstances = await model.Role.findAll({
          where: { name: roles }
        });

        await newUser.addRoles(roleInstances);
      }

      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getUserLogin = async (email) => {
    try {
      const user = await model.User.findOne({
        where: {
          email,
          active: 1
        },
        include: [{
          model: model.Role,
          through: model.UserRole,
          as: 'Roles'
        }]
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getRoles = async () => {
    try {
      const roles = await model.Role.findAll();

      return roles;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getUsers = async () => {
    try {
      const users = await model.User.findAll({
        where: { active: { [Op.ne]: 0 } },
        include: [{
          model: model.Role,
          through: model.UserRole,
          as: 'Roles'
        }]
      });

      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getUser = async (id) => {
    try {
      const user = await model.User.findOne({
        where: { id },
        include: [{
          model: model.Role,
          through: model.UserRole,
          as: 'Roles'
        }]
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateUser = async (id, updatedUser, roles) => {
    try {
      const user = await model.User.findOne({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }

      if (updatedUser.password) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
      }

      await user.update(updatedUser);

      if (roles && roles.length > 0) {
        const roleInstances = await model.Role.findAll({
          where: { name: roles }
        });

        await user.setRoles(roleInstances);
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  saveImage = async (id, imageUrl) => {
    try {
      const user = await model.User.findOne({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }

      await user.update({ photo_id: imageUrl });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getUserImageUrl = async (id) => {
    try {
      const user = await model.User.findOne({
        where: { id },
        attributes: ['photo_id']
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user.photo_id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = UserConnection;
