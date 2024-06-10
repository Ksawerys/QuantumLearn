const QuestionnaireConnection = require('../database/questionnaireConnection');
const QuestionConnection = require('../database/questionConnection');
let questionConx = new QuestionConnection();
let questionnaireConx = new QuestionnaireConnection();


const createQuestionnaire = async (req, res, next) => {
    try {
        const questionnaire = await questionnaireConx.createQuestionnaire(req.body);
        res.status(200).json({ message: 'Questionnaire created successfully', data: questionnaire });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateQuestionnaire = async (req, res, next) => {
    try {
        const questionnaire = await questionnaireConx.updateQuestionnaire(req.params.id, req.body);
        res.status(200).json({ message: 'Questionnaire updated successfully', data: questionnaire });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deactivateQuestionnaire = async (req, res, next) => {
    try {
        const questionnaire = await questionnaireConx.deactivateQuestionnaire(req.params.id);
        res.status(200).json({ message: 'Questionnaire deactivated successfully', data: questionnaire });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const addQuestionsToQuestionnaire = async (req, res, next) => {
    try {
        const questionnaire = await questionnaireConx.addQuestionsToQuestionnaire(req.params.id, req.body.questionIds);
        res.status(200).json({ message: 'Questions added to questionnaire successfully', data: questionnaire });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const removeQuestionsFromQuestionnaire = async (req, res, next) => {
    try {
        const questionnaire = await questionnaireConx.removeQuestionsFromQuestionnaire(req.params.id, req.body.questionIds);
        res.status(200).json({ message: 'Questions removed from questionnaire successfully', data: questionnaire });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getQuestionnaires = async (req, res, next) => {
    try {
        const questionnaires = await questionnaireConx.getQuestionnaires();
        res.status(200).json({ message: 'Questionnaires fetched successfully', data: questionnaires });
    } catch (error) {
        console.error(error);
        next(error);
    }
}


module.exports = {getQuestionnaires, createQuestionnaire, updateQuestionnaire, deactivateQuestionnaire, addQuestionsToQuestionnaire, removeQuestionsFromQuestionnaire};