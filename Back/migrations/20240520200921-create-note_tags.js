'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('note_tags', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      note_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'notes', 
          key: 'id'
        },
        allowNull: false
      },
      tag_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tags', 
          key: 'id'
        },
        allowNull: false
      },
      data: {
        type: Sequelize.JSON,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('note_tags');
  }
};