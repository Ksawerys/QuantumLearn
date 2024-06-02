const QuestionnaireConnection = require('../database/questionnaireConnection');
const QuestionConnection = require('../database/questionConnection');
const UserConnection = require('../database/userConnection');
let userConx = new UserConnection();
let questionConx = new QuestionConnection();
let questionnaireConx = new QuestionnaireConnection();

const insertUserResponseAndUpdateCount = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { questionId, choiceId, response } = req.body;

        const userAnswer = await userConx.insertUserAnswer(userId, questionId, response);
        const questionChoice = await questionConx.getQuestionChoice(questionId, choiceId);
        const updatedQuestionChoice = await questionConx.updateQuestionChoice(questionId, choiceId, questionChoice.answer_count + 1);

        res.status(200).json({ 
            message: 'User response inserted and answer count updated successfully', 
            data: { userAnswer, updatedQuestionChoice } 
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}




module.exports = { insertUserResponseAndUpdateCount};