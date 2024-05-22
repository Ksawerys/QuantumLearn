const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.delete(':noteId', noteController.deleteNote);
router.post('/', noteController.createNoteAndTags);
router.put('/:noteId', noteController.updateNoteContent);
router.get('/user/:userId', noteController.getUserNotes);

module.exports = router;