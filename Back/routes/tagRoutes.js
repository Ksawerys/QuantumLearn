const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.put('/:tagId', tagController.updateTag);
router.delete('/:tagId', tagController.deleteTag);
router.post('/note/:noteId/:tagId', tagController.insertNoteTag);
router.put('/noteTag/:noteTagId', tagController.updateNoteTag);
router.delete('/notetag/:noteTagId', tagController.deleteNoteTag);
router.get('/note/:noteId', tagController.getNoteTags);
router.post('/', tagController.insertTag);



module.exports = router;