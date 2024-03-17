module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('class_notes', {
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
      return queryInterface.dropTable('class_notes');
    }
  };