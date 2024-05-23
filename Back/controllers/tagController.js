const TagConnection = require('../database/tagConntection');
let tagConx = new TagConnection();

const updateTag = async (req, res, next) => {
    try {
      const tagId = req.params.tagId;
      const tagData = req.body;
  
      const updatedTag = await tagConx.updateTag(tagId, tagData);
  
      res.status(200).json({ message: 'Tag updated successfully', data: updatedTag });
    } catch (error) {
      console.error(error);
      next(error);
    }
}
  
const deleteTag = async (req, res, next) => {
    try {
      const tagId = req.params.tagId;
      const notes = await tagConx.getNotesWithTag(tagId);
  
      for (let note of notes) {
        await tagConx.deleteNoteTag(note.id, tagId);
      }
  
      await tagConx.deleteTag(tagId);
  
      res.status(200).json({ message: 'Tag and all its connections deleted successfully' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  

const insertNoteTag = async (req, res, next) => {
    try {
      const noteId = req.params.noteId;
      const tagId = req.params.tagId;
      const data = req.body;
  
      const newNoteTag = await tagConx.insertNoteTag(noteId, tagId, data);
  
      res.status(200).json({ message: 'NoteTag inserted successfully', data: newNoteTag });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  
  const updateNoteTag = async (req, res, next) => {
    try {
      const noteTagId = req.params.noteTagId;
      const updatedData = req.body;
  
      const updatedNoteTag = await tagConx.updateNoteTag(noteTagId, updatedData);
  
      res.status(200).json({ message: 'NoteTag updated successfully', data: updatedNoteTag });
    } catch (error) {
      console.error(error);
      next(error);
    }
}
  
  const deleteNoteTag = async (req, res, next) => {
    try {
      const noteTagId = req.params.noteTagId;
  
      await tagConx.deleteNoteTag(noteTagId);
  
      res.status(200).json({ message: 'NoteTag deleted successfully' });
    } catch (error) {
      console.error(error);
      next(error);
    }
}

  const getNoteTags = async (req, res, next) => {
    try {
        const noteId = req.params.noteId;
        const tags = await tagConx.getNoteTags(noteId);

        res.status(200).json({ message: 'Tags fetched successfully', data: tags });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const insertTag = async (req, res, next) => {
    try {
        const tagData = req.body;
        const newTag = await tagConx.insertTag(tagData);

        res.status(200).json({ message: 'Tag inserted successfully', data: newTag });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
  
module.exports = { updateTag, deleteTag,insertNoteTag, deleteNoteTag, updateNoteTag, getNoteTags, insertTag};