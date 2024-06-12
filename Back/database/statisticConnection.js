const DatabaseConnection = require('./databaseConnection')
const model = require('../models/index')
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const conx = new  DatabaseConnection()
const { Op } = require('sequelize');


class StatisticController {

    getUserNotesWithTags = async (userId) => {
        try {
            console.log('comenzar conexion',userId);

            const notes = await model.Note.findAll({
                include: [
                    {
                        model: model.UserNote,
                        where: { user_id: userId },
                        attributes: [], 
                    },
                    {
                        model: model.NoteTag,
                        include: {
                            model: model.Tag,
                        }
                    }
                ]
            });


            
            
            return notes || [];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


module.exports = StatisticController;
