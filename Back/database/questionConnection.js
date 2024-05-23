const DatabaseConnection = require('../database/DatabaseConnection')
const model = require('../models/index')
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const conx = new  DatabaseConnection()
const { Op } = require('sequelize');


class QuestionConnection {

    createQuestion = async (questionData) => {
        try {
            const question = await model.Question.create(questionData);
            return question;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Set active to 0 (deactivate a question)
    desactivateQuestion = async (questionId) => {
        try {
            const question = await model.Question.update({ active: 0 }, { where: { id: questionId } });
            return question;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Update a question
    updateQuestion = async (questionId, questionData) => {
        try {
            const question = await model.Question.update(questionData, { where: { id: questionId } });
            return question;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Get all questions
    getAllQuestions = async () => {
        try {
            const questions = await model.Question.findAll();
            return questions;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Get all questions not in questionnaire_questions
    getQuestionsNotInQuestionnaire = async () => {
        try {
            const questionsInQuestionnaires = await model.QuestionnaireQuestion.findAll({
                attributes: ['question_id'],
                raw: true
            });
    
            const questionIdsInQuestionnaires = questionsInQuestionnaires.map(q => q.question_id);
    
            const questionsNotInQuestionnaires = await model.Question.findAll({
                where: {
                    id: {
                        [Op.notIn]: questionIdsInQuestionnaires
                    }
                }
            });
    
            return questionsNotInQuestionnaires;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
    


module.exports = QuestionConnection;
