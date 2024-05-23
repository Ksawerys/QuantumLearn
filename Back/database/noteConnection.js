const DatabaseConnection = require('../database/DatabaseConnection')
const model = require('../models/index')
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const conx = new  DatabaseConnection()
const { Op } = require('sequelize');


class NoteConnection {

    insertNote = async (note) => {
        try {
          const newNote = await model.Note.create({
            title: note.title,
            description: note.description
          });
      
          return newNote;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    insertUserNote = async (userId, noteId) => {
        try {
          const newUserNote = await model.UserNote.create({
            user_id: userId,
            note_id: noteId
          });
      
          return newUserNote;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      
    deleteNote = async (noteId) => {
        try {
          const note = await model.Note.update(
            { active: false },
            { where: { id: noteId } }
          );
      
          return note;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }
      
    updateNote = async (noteId, updatedNote) => {
        try {
          const note = await model.Note.update(
            { ...updatedNote },
            { where: { id: noteId } }
          );
      
          return note;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }
      
    getUserNotes = async (userId) => {
        try {
          const notes = await model.UserNote.findAll({
            where: { user_id: userId },
            include: model.Note
          });
      
          return notes.map(userNote => userNote.Note);
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    insertSubnote = async (noteId, subnoteId) => {
        try {
          if (!noteId || !subnoteId) {
            throw new Error('noteId and subnoteId are required');
          }
      
          const newSubnote = await model.Subnote.create({
            note_id: noteId,
            subnote_id: subnoteId,
          });
      
          return newSubnote;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
  
    getNoteSubnotes = async (noteId) => {
        try {
        const subnotes = await model.Subnote.findAll({
            where: { note_id: noteId },
            include: { model: model.Note, as: 'Subnote' }
        });
    
        return subnotes.map(subnote => subnote.Subnote);
        } catch (error) {
        console.error(error);
        throw error;
        }
    }
  
    hasSubnotes = async (noteId) => {
        try {
        const count = await model.Subnote.count({
            where: { note_id: noteId }
        });
    
        return count > 0;
        } catch (error) {
        console.error(error);
        throw error;
        }
    }

}

module.exports = NoteConnection;
