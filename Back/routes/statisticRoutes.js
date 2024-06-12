const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statisticController');

router.route('/examTags/:userId')
  .get(statisticController.getUserNotesWithGradeAndExamTags);

router.route('/homeworkTags/:userId')
  .get(statisticController.getUserNotesWithHomeworkAndGradeTags);

router.route('/acedemicResults/:userId')
  .get(statisticController.checkUserProgress);

module.exports = router;