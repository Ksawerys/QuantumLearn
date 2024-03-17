module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('class_teachers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        teacher_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', 
            key: 'id'
          },
          allowNull: true,
        },
        class_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'classes',
            key: 'id'
          },
          allowNull: true,
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('class_teachers');
    }
  };