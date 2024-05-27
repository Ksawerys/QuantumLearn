const IsolationForest = require('../mlModels/IsolationForestModel');

class AnomalyController {


    predictExamGrade = async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const examNotes = await tagController.getExamGrades(userId);
  
            // Convertir las notas de examen a un array de notas
            const data = examNotes.map(note => {
              const gradeTag = note.note_tags.find(tag => tag.tag_id === gradeTag.id);
              return gradeTag ? gradeTag.data : null;
            }).filter(grade => grade !== null);
            
          const isolationForest = new IsolationForest(100, 256);
          isolationForest.fit(data);
          
          const scores = isolationForest.predict(data);

          res.status(200).json({ message: 'Anomaly detected successfully', data: prediction });
        } catch (error) {
          console.error(error);
          next(error);
        }
    }
}

module.exports = new PredictionController();