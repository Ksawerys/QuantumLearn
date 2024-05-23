const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');

router.post('/', questionnaireController.createQuestionnaire);
router.put('/:id', questionnaireController.updateQuestionnaire);
router.delete('/:id', questionnaireController.deactivateQuestionnaire);
router.post('/addQuestions/:id', questionnaireController.addQuestionsToQuestionnaire);
router.delete('/removeQuestions/:id', questionnaireController.removeQuestionsFromQuestionnaire);



module.exports = router;