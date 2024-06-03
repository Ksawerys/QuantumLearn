'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('class_students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'classes',
          key: 'id'
        },
        allowNull: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', 
          key: 'id'
        },
        allowNull: true,
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
    await queryInterface.dropTable('class_students');
  }
};