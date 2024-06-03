'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const questionChoices = [1, 2, 3].map(choiceId => ({
      question_id: 3,
      choice_id: choiceId,
    }));

    await queryInterface.bulkInsert('question_choices', questionChoices, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('question_choices', null, {});
  }
};