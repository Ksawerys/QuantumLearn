// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class UserAnswer extends Model {
//     static associate(models) {
//       this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
//       this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
//     }
//   }

//   UserAnswer.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       response: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'users', 
//           key: 'id'
//         }
//       },
//       question_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'questions', 
//           key: 'id'
//         }
//       },
//       created_at: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: sequelize.literal("DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)")
//       },
//       updated_at: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: sequelize.literal("DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)")
//       },
//     },
//     {
//       sequelize,
//       modelName: 'UserAnswer',
//       tableName: 'user_answers',
//       timestamps: true,
//       underscored: true,
//       createdAt: 'created_at',
//       updatedAt: 'updated_at',
//     }
//   );

//   return UserAnswer;
// };