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

    desactivateQuestion = async (questionId) => {
        try {
            const question = await model.Question.update({ active: 0 }, { where: { id: questionId } });
            return question;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateQuestion = async (questionId, questionData) => {
        try {
            const question = await model.Question.update(questionData, { where: { id: questionId } });
            return question;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getAllQuestions = async () => {
        try {
            const questions = await model.Question.findAll();
            return questions;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

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

    getQuestionById = async (questionId) => {
        try {
            const question = await model.Question.findByPk(questionId);
            return question;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getQuestionsByType = async (typeId) => {
        try {
            const questions = await model.Question.findAll({
                where: { type_id: typeId }
            });
            return questions;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getQuestionsByQuestionnaire = async (questionnaireId) => {
        try {
            const questions = await model.QuestionnaireQuestion.findAll({
                where: { questionnaire_id: questionnaireId },
                include: model.Question
            });
            return questions;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getQuestionTypes = async () => {
        try {
            const questionTypes = await model.QuestionType.findAll();
            return questionTypes;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getQuestionTypeById = async (typeId) => {
        try {
            const questionType = await model.QuestionType.findByPk(typeId);
            return questionType;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getQuestionChoices = async (questionId) => {
        try {
            const questionChoices = await model.QuestionChoice.findAll({
                where: { question_id: questionId }
            });
            return questionChoices;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    createQuestionChoice = async (questionId, choiceId) => {
        try {
            const questionChoice = await model.QuestionChoice.create({
                question_id: questionId,
                choice_id: choiceId
            });
            return questionChoice;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateQuestionChoice = async (questionId, choiceId, answerCount) => {
        try {
            const questionChoice = await model.QuestionChoice.update({ answer_count: answerCount }, {
                where: {
                    question_id: questionId,
                    choice_id: choiceId
                }
            });
            return questionChoice;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    incrementAnswerCount = async (questionId, choiceId) => {
        try {
            const questionChoice = await model.QuestionChoice.findOne({
                where: {
                    question_id: questionId,
                    choice_id: choiceId
                }
            });
    
            if (!questionChoice) {
                throw new Error('No matching question choice found');
            }
    
            questionChoice.answer_count += 1;
    
            await questionChoice.save();
    
            return questionChoice;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


}
    


module.exports = QuestionConnection;
