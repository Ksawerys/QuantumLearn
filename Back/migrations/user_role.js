module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user_role', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', 
            key: 'id'
          },
          allowNull: true,
        },
        role_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'roles', 
            key: 'id'
          },
          allowNull: true,
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('user_role');
    }
  };