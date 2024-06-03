'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'question_types', 
          key: 'id'
        },
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)")
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)")
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  }
};