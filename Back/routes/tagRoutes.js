const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.put('/:tagId', tagController.updateTag);
router.delete('/:tagId', tagController.deleteTag);
router.post('/note/:noteId/:tagId', tagController.insertNoteTag);
router.put('/note/:noteId/:tagId', tagController.updateNoteTag);
router.delete('/note/:noteId/:tagId', tagController.deleteNoteTag);

module.exports = router;