'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'chats', 
          key: 'id'
        }
      },
      user_role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user_roles', 
          key: 'id'
        }
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)")
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};