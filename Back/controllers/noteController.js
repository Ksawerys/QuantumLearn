const NoteConnection = require('../database/noteConnection');
const TagConnection = require('../database/tagConntection');
let noteConx = new NoteConnection();
let tagConx = new TagConnection();

const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const deletedNote = await noteConx.deleteNote(noteId);

    res.status(200).json({ message: 'Note deleted successfully', data: deletedNote });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const createNoteAndTags = async (req, res, next) => {
    try {
        const noteData = {
            title: req.body.title,
            description: req.body.description,
            container_note_id: req.body.container_note_id || null
        };
        const tags = req.body.tags;
        const userId = req.params.userid;

        const newNote = await noteConx.insertNote(noteData);
        await noteConx.insertUserNote(userId, newNote.id);

        if (noteData.container_note_id) {
            await noteConx.insertSubnote(noteData.container_note_id, newNote.id);
        }

        for (let tagData of tags) {
            await tagConx.insertNoteTag(newNote.id, tagData.tag_id, tagData.data);
        }

        const noteTags = await tagConx.getNoteTags(newNote.id);

        res.status(200).json({ message: 'Note and tags created successfully', data: { ...newNote.dataValues, NoteTags: noteTags } });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateNoteContent = async (req, res, next) => {
    try {
      const noteId = req.params.noteId;
      const noteData = {
        title: req.body.title,
        description: req.body.description
      };
  
      const updatedNote = await noteConx.updateNote(noteId, noteData);
      const noteTags = await tagConx.getNoteTags(noteId);

      res.status(200).json({ message: 'Note content updated successfully', data: { ...updatedNote.dataValues, NoteTags: noteTags } });
    } catch (error) {
      console.error(error);
      next(error);
    }
}
const getUserNotes = async (req, res, next) => {
    try {
      const userId = req.params.userId;
  
      const notes = await noteConx.getUserNotes(userId);
  
      for (let note of notes) {
        note.dataValues.NoteTags = await tagConx.getNoteTags(note.id);
      }
  
      res.status(200).json({ message: 'User notes and tags fetched successfully', data: notes });
    } catch (error) {
      console.error(error);
      next(error);
    }
}
  

module.exports = { deleteNote, createNoteAndTags, updateNoteContent, getUserNotes };