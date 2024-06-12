'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [questions, choices] = await Promise.all([
      queryInterface.sequelize.query(
        `SELECT id FROM questions WHERE type_id = (SELECT id FROM question_types WHERE name = 'choice');`
      ),
      queryInterface.sequelize.query(
        `SELECT id FROM choices;`
      )
    ]);

    let choiceIndex = 0;
    const questionChoices = questions[0].flatMap(question => {
      const choicesForQuestion = choices[0].slice(choiceIndex, choiceIndex + 3).map(choice => ({
        question_id: question.id,
        choice_id: choice.id,
      }));

      choiceIndex += 3;

      return choicesForQuestion;
    });

    await queryInterface.bulkInsert('question_choices', questionChoices, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('question_choices', null, {});
  }
};