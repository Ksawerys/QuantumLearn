'use strict';

const Factory = require('../factories/questionaireFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const questionnaires = Array.from({ length: 4 }, (_, i) => Factory.build('questionnaire'));

    const questionnaireIds = [];
    for (const questionnaire of questionnaires) {
      const result = await queryInterface.bulkInsert('questionnaires', [questionnaire], { returning: true });
      questionnaireIds.push(result[0].id);
    }

    const questions = await queryInterface.sequelize.query(
      `SELECT id FROM questions;`
    );

    let questionIndex = 0;
    const questionnaireQuestions = questionnaireIds.flatMap(questionnaireId => {
      const questionsForQuestionnaire = questions[0].slice(questionIndex, questionIndex + 3).map(question => ({
        questionnaire_id: questionnaireId,
        question_id: question.id,
        created_at: new Date(),
        updated_At: new Date()
      }));

      questionIndex += 3;

      return questionsForQuestionnaire;
    });

    await queryInterface.bulkInsert('questionnaire_questions', questionnaireQuestions, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questionnaire_questions', null, {});
    await queryInterface.bulkDelete('questionnaires', null, {});
  }
};