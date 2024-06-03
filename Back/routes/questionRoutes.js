const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.route('/')
  .post(questionController.createQuestion);

router.route('/:id')
  .delete(questionController.desactivateQuestion)
  .put(questionController.updateQuestion);

router.route('/getAll')
  .get(questionController.getAllQuestions);

router.route('/getNotInQuestionnaire')
  .get(questionController.getQuestionsNotInQuestionnaire);


module.exports = router;