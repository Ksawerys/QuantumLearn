'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.Chat, { foreignKey: 'chat_id', as: 'chat' });
      this.belongsTo(models.UserRole, { foreignKey: 'user_role_id', as: 'userRole' });
    }
  }

  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'chats', 
          key: 'id'
        }
      },
      user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'user_roles', 
          key: 'id'
        }
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
      timestamps: true,
      underscored: true,
    }
  );

  return Message;
};