'use strict';

const questionFactory = require('../factories/questionFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const questionTypes = await queryInterface.sequelize.query(
      `SELECT id FROM question_types;`
    );

    const questions = questionTypes[0].map((type, index) => questionFactory.build(index, type.id));

    await queryInterface.bulkInsert('questions', questions, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null, {});
  }
};