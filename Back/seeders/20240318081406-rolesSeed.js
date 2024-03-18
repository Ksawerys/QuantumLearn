'use strict';

const roleFactory = require('../factories/roleFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    //Llamo a cada factoria para crear cada rol.
    const roles = ['role0', 'role1', 'role2', 'role3'].map(role => roleFactory.build(role));

    await queryInterface.bulkInsert('roles', roles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};