module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('questions', {
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
        answer: {
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
          defaultValue: null,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('questions');
    }
  };