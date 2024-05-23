const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/', questionController.createQuestion);
router.delete('/:id', questionController.desactivateQuestion);
router.put('/:id', questionController.updateQuestion);
router.get('/getAll', questionController.getAllQuestions);
router.get('/getNotInQuestionnaire', questionController.getQuestionsNotInQuestionnaire);


module.exports = router;