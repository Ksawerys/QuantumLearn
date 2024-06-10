const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.route('/:tagId')
  .put(tagController.updateTag)
  .delete(tagController.deleteTag);

router.route('/note/:noteId/:tagId')
  .post(tagController.insertNoteTag);

router.route('/noteTag/:noteTagId')
  .put(tagController.updateNoteTag)
  .delete(tagController.deleteNoteTag);

router.route('/note/:noteId')
  .get(tagController.getNoteTags);

router.route('/')
  .get(tagController.getTags)
  .post(tagController.insertTag);

router.route('/exam-grades/:userId')
  .get(tagController.getExamGrades);

router.route('/homework-grades/:userId')
  .get(tagController.getHomeworkGrades);

module.exports = router;