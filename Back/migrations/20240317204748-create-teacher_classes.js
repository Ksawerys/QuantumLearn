'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('class_teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', 
          key: 'id'
        },
        allowNull: true,
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'classes',
          key: 'id'
        },
        allowNull: true,
      }
         });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('class_teachers');
  }
};