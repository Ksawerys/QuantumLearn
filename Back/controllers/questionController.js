const QuestionConnection = require('../database/questionConnection');
let questionConx = new QuestionConnection();


const createQuestion = async (req, res, next) => {
    try {
        const question = await questionConx.createQuestion(req.body);
        res.status(200).json({ message: 'Question created successfully', data: question });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const desactivateQuestion = async (req, res, next) => {
    try {
        const question = await questionConx.desactivateQuestion(req.params.id);
        res.status(200).json({ message: 'Question deactivated successfully', data: question });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateQuestion = async (req, res, next) => {
    try {
        const question = await questionConx.updateQuestion(req.params.id, req.body);
        res.status(200).json({ message: 'Question updated successfully', data: question });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await questionConx.getAllQuestions();
        res.status(200).json({ message: 'Questions fetched successfully', data: questions });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getQuestionsNotInQuestionnaire = async (req, res, next) => {
    try {
        const questions = await questionConx.getQuestionsNotInQuestionnaire();
        res.status(200).json({ message: 'Questions not in any questionnaire fetched successfully', data: questions });
    } catch (error) {
        console.error(error);
        next(error);
    }
}



module.exports = { createQuestion, desactivateQuestion, updateQuestion, getAllQuestions, getQuestionsNotInQuestionnaire};