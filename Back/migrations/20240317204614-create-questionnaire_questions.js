'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('questionnaire_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionnaire_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'questionnaires',
          key: 'id'
        },
        allowNull: true,
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'questions', 
          key: 'id'
        },
        allowNull: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('questionnaire_questions');
  }
};