const QuestionnaireConnection = require('../database/questionnaireConnection');
const QuestionConnection = require('../database/questionConnection');
const UserConnection = require('../database/userConnection');
const NoteConnection = require('../database/noteConnection');
const openaiService = require('../services/openaiService');
let userConx = new UserConnection();
let questionConx = new QuestionConnection();
let questionnaireConx = new QuestionnaireConnection();
let noteConx = new NoteConnection();

const insertUserResponsesAndUpdateCounts = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const responses = req.body.responses;
        const userAnswers = [];
        const updatedQuestionChoices = [];

        for (let responseObj of responses) {
            const { questionId, choiceId, response } = responseObj;
            const userAnswer = await userConx.insertUserAnswer(userId, questionId, response);
            userAnswers.push(userAnswer);

            if (choiceId) {
                const updatedQuestionChoice = await questionConx.incrementAnswerCount(questionId, choiceId);
                updatedQuestionChoices.push(updatedQuestionChoice);
            }
        }

        res.status(200).json({ 
            message: 'User responses inserted and answer counts updated successfully', 
            data: { userAnswers, updatedQuestionChoices } 
        });
    } catch (error) {
        console.error(error);
        next(error);
    
    }
}




module.exports = { insertUserResponsesAndUpdateCounts};