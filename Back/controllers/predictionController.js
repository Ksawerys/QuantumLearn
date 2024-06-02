const fs = require('fs');
const path = require('path');
const PredictionModel = require('../mlModels/predictionModel');
const { transformInputData } = require('../helpers/predictionHelper');
const tagController = require('./tagController');

class PredictionController {

    trainAndSaveModel = async (req, res, next) => {
        try {
          const userId = req.params.userId;
          const examNotes = await tagController.getExamGrades(userId);

          // Convertir las notas de examen a un array de notas
          const trainingData = examNotes.map(note => {
            const gradeTag = note.note_tags.find(tag => tag.tag_id === gradeTag.id);
            return gradeTag ? gradeTag.data : null;
          }).filter(grade => grade !== null);

          // Entrenar el modelo
          // Necesitas dividir trainingData en X y y
          const X = trainingData.slice(0, -2); // todas las notas excepto las dos últimas
          const y = trainingData.slice(-2); // las dos últimas notas
          await PredictionModel.train(X, y);

          // Guardar el modelo en un archivo
          const modelJson = JSON.stringify(PredictionModel);
          fs.writeFileSync(path.join(__dirname, '../mlModels/saved_model.json'), modelJson);

          res.status(200).json({ message: 'Model trained and saved to file' });
        } catch (error) {
          console.error(error);
          next(error);
        }
    }

    predictExamGrade = async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const examNotes = await tagController.getExamGrades(userId);
  
            // Convertir las notas de examen a un array de notas
        const trainingData = examNotes.map(note => {
             const gradeTag = note.note_tags.find(tag => tag.tag_id === gradeTag.id);
             return gradeTag ? gradeTag.data : null;
        }).filter(grade => grade !== null);
          // Necesitas definir la función transformInputData
          const transformedInput = transformInputData(trainingData);

          const prediction = PredictionModel.predict(transformedInput);

          res.status(200).json({ message: 'Prediction made successfully', data: prediction });
        } catch (error) {
          console.error(error);
          next(error);
        }
    }
}

module.exports = new PredictionController();