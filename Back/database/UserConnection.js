const DatabaseConnection = require('./databaseConnection')
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
          active: {
            [Op.ne]: 0
          }        
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

  insertUserAnswer = async(userId, questionId, response) => {
    try {
      const userAnswer = await model.UserAnswer.create({
        user_id: userId,
        question_id: questionId,
        response: response
      });
  
      return userAnswer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkActiveUser = async (userId) => {
    try {
      const user = await model.User.findOne({
        where: {
          id: userId,
          active: {
            [Op.ne]: 0
          }
        }
      });

      if (!user) {
        throw new Error('User not found or not active');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkUserRole = async (userId, roleName) => {
    const user = await this.checkActiveUser(userId);
    const roles = await user.getRoles();
    return roles.some(role => role.name === roleName);
  }

  checkUserPassword = async (userId, password) => {
    const user = await this.checkActiveUser(userId);
    return bcrypt.compare(password, user.password);
  }

  deleteUser = async (id) => {
    try {
      const user = await model.User.update(
        { active: false },
        { where: { id } }
      );

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  restoreUser = async (id) => {
    try {
      const user = await model.User.update(
        { active: true },
        { where: { id } }
      );

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  
}

module.exports = UserConnection;
