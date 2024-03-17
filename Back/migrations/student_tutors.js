module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('student_tutors', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        student_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', 
            key: 'id'
          },
          allowNull: true,
        },
        tutor_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          },
          allowNull: true,
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('student_tutors');
    }
  };