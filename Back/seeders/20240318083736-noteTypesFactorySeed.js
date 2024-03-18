'use strict';

const noteTypesFactory = require('../factories/noteTypesFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const questionTypes = ['questionType0', 'questionType1', 'questionType2'].map(type => noteTypesFactory.build(type));

    await queryInterface.bulkInsert('question_types', questionTypes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('note_types', null, {});
  }
};