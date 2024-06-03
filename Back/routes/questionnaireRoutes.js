const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');

router.route('/')
  .post(questionnaireController.createQuestionnaire);

router.route('/:id')
  .put(questionnaireController.updateQuestionnaire)
  .delete(questionnaireController.deactivateQuestionnaire);

router.route('/addQuestions/:id')
  .post(questionnaireController.addQuestionsToQuestionnaire);

router.route('/removeQuestions/:id')
  .delete(questionnaireController.removeQuestionsFromQuestionnaire);



module.exports = router;