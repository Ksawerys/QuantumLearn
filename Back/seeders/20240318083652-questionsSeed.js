'use strict';

const questionFactory = require('../factories/questionFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const questions = ['question0', 'question1', 'question2'].map(question => questionFactory.build(question));

    await queryInterface.bulkInsert('questions', questions, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null, {});
  }
};