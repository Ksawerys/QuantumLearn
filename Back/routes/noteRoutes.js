const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.route('/:noteId')
  .delete(noteController.deleteNote)
  .put(noteController.updateNoteContent);

router.route('/:userid')
  .post(noteController.createNoteAndTags);

router.route('/user/:userId')
  .get(noteController.getUserNotes);


module.exports = router;