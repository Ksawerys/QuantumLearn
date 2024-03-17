module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('subnotes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        note_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'notes', 
            key: 'id'
          },
          allowNull: true,
        },
        subnote_id: {
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
      return queryInterface.dropTable('subnotes');
    }
  };