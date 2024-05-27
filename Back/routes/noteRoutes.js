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

//middleware para que el subnote exista que no sea el note mismo, que el usuario exista, que las etquetas existan que esten activas las etiqeutas y notas

module.exports = router;