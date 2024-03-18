'use strict';

const questionTypeFactory = require('../factories/questionTypeFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const questionTypes = ['questionType0', 'questionType1', 'questionType2'].map(type => questionTypeFactory.build(type));

    await queryInterface.bulkInsert('question_types', questionTypes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('question_types', null, {});
  }
};