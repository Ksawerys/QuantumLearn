'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('question_choices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'questions',
          key: 'id'
        },
        allowNull: true,
      },
      choice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'choices',
          key: 'id'
        },
        allowNull: true,
      },
      answer_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('question_choices');
  }
};