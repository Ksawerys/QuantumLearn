module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('question_types', {
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
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('question_types');
    }
  };