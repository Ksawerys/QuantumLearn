module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('chats', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: null,
        },
        create_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        update_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('chats');
    }
  };