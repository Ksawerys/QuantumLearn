'use strict';

const userFactory = require('../factories/userFactory');
const roleFactory = require('../factories/roleFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = Array.from({ length: 4 }, (_, index) => roleFactory.build(`role${index}`, { id: index + 1 }));
    await queryInterface.bulkInsert('roles', roles, {});

    const users = Array.from({ length: 10 }, (_, index) => userFactory.build('user', { id: index + 1 }));
    const adminUser = userFactory.build('adminUser', { id: users.length + 1 });
    users.push(adminUser);
    await queryInterface.bulkInsert('users', users, {});

    const userRoles = users.map((user, index) => ({
      user_id: user.id,
      role_id: index < users.length - 1 ? roles[Math.floor(Math.random() * 3)].id : roles[3].id
    }));
    await queryInterface.bulkInsert('user_roles', userRoles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  }
};