module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('roles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('roles');
    }
  };