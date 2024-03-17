module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('question_choices', {
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
        choice: {
          type: Sequelize.TEXT,
          allowNull: true,
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('question_choices');
    }
  };