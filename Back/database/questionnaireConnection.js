const DatabaseConnection = require('../database/DatabaseConnection')
const model = require('../models/index')
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const conx = new  DatabaseConnection()
const { Op } = require('sequelize');


class QuestioonnaireConnection {
    createQuestionnaire = async (questionnaireData) => {
        try {
            const questionnaire = await model.Questionnaire.create(questionnaireData);
            return questionnaire;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Update a questionnaire
    updateQuestionnaire = async (questionnaireId, questionnaireData) => {
        try {
            const questionnaire = await model.Questionnaire.update(questionnaireData, { where: { id: questionnaireId } });
            return questionnaire;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Set active to 0 (deactivate a questionnaire)
    deactivateQuestionnaire = async (questionnaireId) => {
        try {
            const questionnaire = await model.Questionnaire.update({ active: 0 }, { where: { id: questionnaireId } });
            return questionnaire;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Add questions to a questionnaire
    addQuestionsToQuestionnaire = async (questionnaireId, questionIds) => {
        try {
            const questionnaire = await model.Questionnaire.findByPk(questionnaireId);
            if (!questionnaire) throw new Error('Questionnaire not found');

            for (let questionId of questionIds) {
                await model.QuestionnaireQuestion.create({ questionnaire_id: questionnaireId, question_id: questionId });
            }

            return questionnaire;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Remove questions from a questionnaire
    removeQuestionsFromQuestionnaire = async (questionnaireId, questionIds) => {
        try {
            const questionnaire = await model.Questionnaire.findByPk(questionnaireId);
            if (!questionnaire) throw new Error('Questionnaire not found');

            for (let questionId of questionIds) {
                await model.QuestionnaireQuestion.destroy({ where: { questionnaire_id: questionnaireId, question_id: questionId } });
            }

            return questionnaire;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
    


module.exports = QuestioonnaireConnection;
