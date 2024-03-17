module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('questionnaire_questions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        questionnaire_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'questionnaires',
            key: 'id'
          },
          allowNull: true,
        },
        question_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'questions', // Asumiendo que las preguntas están en la tabla 'questions'
            key: 'id'
          },
          allowNull: true,
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('questionnaire_questions');
    }
  };