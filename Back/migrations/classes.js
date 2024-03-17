module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('classes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        teacher_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // Asumiendo que los profesores están en la tabla 'users'
            key: 'id'
          },
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
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
      return queryInterface.dropTable('classes');
    }
  };