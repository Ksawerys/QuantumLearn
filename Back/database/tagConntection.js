const DatabaseConnection = require('./databaseConnection')
const model = require('../models/index')
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const conx = new  DatabaseConnection()
const { Op } = require('sequelize');


class TagConnection {

    getNoteTags = async (noteId) => {
        try {
            const note = await model.Note.findOne({
                where: { id: noteId },
                include: [{
                    model: model.NoteTag,
                    include: model.Tag
                }]
            });
    
            return note ? note.NoteTags.map(noteTag => ({...noteTag.Tag.dataValues, data: noteTag.data})) : [];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    insertTag = async (tagData) =>  {
        try {
          const tag = await model.Tag.create(tagData);
          return tag;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }
    
    updateTag = async (tagId, updatedTag) => {
        try {
          const tag = await model.Tag.update(
            { ...updatedTag },
            { where: { id: tagId } }
          );
    
          return tag;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    updateNoteTag = async (noteTagId, updatedData) => {
        try {
          const noteTag = await model.NoteTag.update(
            { data: updatedData },
            { where: { id: noteTagId } }
          );
      
          return noteTag;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }
    
    deleteTag = async (tagId) => {
        try {
          const tag = await model.Tag.destroy({ where: { id: tagId } });
          return tag;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    insertNoteTag = async (noteId, tagId, data) => {
        try {
          const noteTag = await model.NoteTag.create({
            note_id: noteId,
            tag_id: tagId,
            data: data
          });
      
          return noteTag;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

      deleteNoteTag = async (noteTagId) => {
        try {
          const noteTag = await model.NoteTag.destroy({
            where: {
              id: noteTagId
            }
          });
      
          return noteTag;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

      getNotesWithTag = async (tagId) => {
        try {
          const notes = await model.Note.findAll({
            include: [{
              model: model.Tag,
              where: { id: tagId }
            }]
          });
      
          return notes;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

      getTagByName = async (tagName) => {
        try {
            const tag = await model.Tag.findOne({ where: { name: tagName } });
            if (!tag) {
                throw new Error('Tag not found');
            }
            return tag;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    getNotesByTagIdsAndUserId = async (tagIds, userId) => {
      try {
          const notes = await model.Note.findAll({
              include: [
                  {
                      model: model.NoteTag,
                      where: { tag_id: tagIds },
                      required: true
                  },
                  {
                      model: model.UserNote,
                      where: { user_id: userId }
                  }
              ]
          });
          return notes;
      } catch (error) {
          console.error(error);
          throw error;
      }
  }
    
    getGradesFromNotes = (notes, gradeTagId) => {
        return notes.map(note => ({
            noteId: note.id,
            title: note.title,
            description: note.description,
            grades: note.NoteTags.filter(noteTag => noteTag.tag_id === gradeTagId).map(noteTag => noteTag.data)
        }));
    }

}

module.exports = TagConnection;
