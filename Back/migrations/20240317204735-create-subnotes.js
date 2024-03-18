'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subnotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      note_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'notes', 
          key: 'id'
        },
        allowNull: true,
      },
      subnote_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'notes',
          key: 'id'
        },
        allowNull: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('subnotes');
  }
};