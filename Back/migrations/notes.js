module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('notes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        priority: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        completed: {
          type: Sequelize.BOOLEAN,
          defaultValue: null,
        },
        grade: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        type_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'note_types', 
            key: 'id'
          },
          allowNull: true,
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: null,
        },
        create_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        update_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('notes');
    }
  };