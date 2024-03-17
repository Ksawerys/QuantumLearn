module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user_notes', {
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
        note_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'notes', 
            key: 'id'
          },
          allowNull: true,
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('user_notes');
    }
  };