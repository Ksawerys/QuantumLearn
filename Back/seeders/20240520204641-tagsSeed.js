'use strict';

const factory = require('../factories/tagFactory'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { names, types } = await factory.build('tags');
    const tags = names.map((name, index) => ({
      name,
      type: types[index]
    }));
    await queryInterface.bulkInsert('Tags', tags, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};