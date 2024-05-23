const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.delete('/:noteId', noteController.deleteNote);
router.post('/:userid', noteController.createNoteAndTags);
router.put('/:noteId', noteController.updateNoteContent);
router.get('/user/:userId', noteController.getUserNotes);

//middleware para que el subnote exista que no sea el note mismo, que el usuario exista, que las etquetas existan que esten activas las etiqeutas y notas

module.exports = router;