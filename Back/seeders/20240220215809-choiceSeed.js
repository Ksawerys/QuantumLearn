'use strict';
const factory = require('../factories/questionChoicesFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { words } = await factory.build('wordArray');
    const choices = words.map(word => ({
      description: word,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Choices', choices, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Choices', null, {});
  }
};