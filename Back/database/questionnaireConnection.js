const DatabaseConnection = require('./databaseConnection')
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

    updateQuestionnaire = async (questionnaireId, questionnaireData) => {
        try {
            const questionnaire = await model.Questionnaire.update(questionnaireData, { where: { id: questionnaireId } });
            return questionnaire;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    deactivateQuestionnaire = async (questionnaireId) => {
        try {
            const questionnaire = await model.Questionnaire.update({ active: 0 }, { where: { id: questionnaireId } });
            return questionnaire;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

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
