const QuestionnaireConnection = require('../database/questionnaireConnection');
const QuestionConnection = require('../database/questionConnection');
const UserConnection = require('../database/userConnection');
const NoteConnection = require('../database/noteConnection');
const StatisticConnection = require('../database/statisticConnection');
const openaiService = require('../services/openaiService');
let userConx = new UserConnection();
let questionConx = new QuestionConnection();
let questionnaireConx = new QuestionnaireConnection();
let noteConx = new NoteConnection();
let statisticConnection = new StatisticConnection();
const IsolationForest = require('../mlModels/IsolationForestModel');




const checkUserProgress = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const notesResponse = await getUserExamTags(userId);
        const notes = notesResponse;

        const recentNotes = notes.filter(note => new Date(note.updatedAt) > oneMonthAgo);

        const recentExamScores = recentNotes.map(note => parseFloat(note.data));

        let message = '';
        const gradeDataTraining = recentExamScores.slice(0, -2);
        const gradeData = recentExamScores.slice(-2);
        const isGettingWorse = await checkAnomaly(gradeDataTraining, gradeData);
        if (isGettingWorse) {
            const notesWithStudyMethod = recentNotes.filter(note => note.studyMethod !== null);

            if (notesWithStudyMethod.length === 0) {
                message = 'I\'m having worse grades than normal. Can you tell me how can I improve my notes?Stick to telling me the information in subjective words, in a single paragraph and in less than 250 ';
            } else {
                message += 'I\'m having worse grades than normal. Can you tell me how can I improve my notes? Here are some notes with study methods that I have been using: Stick to telling me the information in subjective words, in a single paragraph and in less than 250';
                notesWithStudyMethod.forEach(note => {
                    message += `\nNote: ${note.data}, Study Method: ${note.studyMethod}`;
                });
            }
            
        } else {
            message = 'I\'m improving in my notes. Can you tell me how can I maintain my improvement? Stick to telling me the information in subjective words, in a single paragraph and in less than 250';
        }

        await openaiService.generateText({ body: { text: message } }, res, next);
    } catch (error) {
        next(error);
    }
};

const getUserExamTags = async (userId) => {
    try {
        const notes = await statisticConnection.getUserNotesWithTags(userId);

        const filteredNotes = notes.filter(note => {
            const noteTags = note.NoteTags.map(noteTag => noteTag.Tag.name);
            return noteTags.includes('Grade') && noteTags.includes('Exam');
        });

        const gradeData = filteredNotes.flatMap(note => {
            const gradeNoteTags = note.NoteTags.filter(noteTag => noteTag.Tag.name === 'Grade');
            const studyMethodNoteTag = note.NoteTags.find(noteTag => noteTag.Tag.name === 'Study method');

            return gradeNoteTags.map(noteTag => ({
                data: JSON.parse(noteTag.data).data,
                updatedAt: noteTag.updatedAt,
                studyMethod: studyMethodNoteTag ? JSON.parse(studyMethodNoteTag.data).data : null
            }));
        });

        return gradeData;
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
}

const getUserGradeTags = async (userId) => {
    try {
        const notes = await statisticConnection.getUserNotesWithTags(userId);

        const filteredNotes = notes.filter(note => {
            const noteTags = note.NoteTags.map(noteTag => noteTag.Tag.name);
            return noteTags.includes('Homework') && noteTags.includes('Grade') && !noteTags.includes('Exam');
        });

        const gradeData = filteredNotes.flatMap(note => 
            note.NoteTags
                .filter(noteTag => noteTag.Tag.name === 'Grade')
                .map(noteTag => ({
                    data: JSON.parse(noteTag.data).data,
                    updatedAt: noteTag.updatedAt
                }))
        );

        return gradeData;
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
}

const checkAnomaly = async (gradeDataTraining, gradeData) => {
    try {
        let anomaly = false;
        const arrayGradeDataTraining = gradeDataTraining.map(item => [item]);
        const arrayGradeData = gradeData.map(item => [item]);
        const roundedGradeDataTraining = arrayGradeDataTraining.map(item => [Math.round(item[0])]);
        const roundedGradeData = arrayGradeData.map(item => [Math.round(item[0])]);

        if (roundedGradeDataTraining.length > 10) {
            const isolationForest = new IsolationForest(10000, roundedGradeDataTraining.length);

            isolationForest.fit(roundedGradeDataTraining);

            const anomalyScores = isolationForest.predict(roundedGradeData);
            
            const result = roundedGradeData.map((data, index) => ({
                data: data[0],
                anomalyScore: anomalyScores[index]
            }));


            anomaly = result.some(item => item.anomalyScore > 0.53);
        }

        return anomaly;
    } catch (error) {
        console.error('Error occurred in checkAnomaly function', error);
        throw new Error('Server Error');
    }
}



const getUserNotesWithGradeAndExamTags = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notes = await statisticConnection.getUserNotesWithTags(userId);

        const filteredNotes = notes.filter(note => {
            const noteTags = note.NoteTags.map(noteTag => noteTag.Tag.name);
            return noteTags.includes('Grade') && noteTags.includes('Exam');
        });

        const gradeData = filteredNotes.flatMap(note => {
            const gradeNoteTags = note.NoteTags.filter(noteTag => noteTag.Tag.name === 'Grade');
            const studyMethodNoteTag = note.NoteTags.find(noteTag => noteTag.Tag.name === 'Study method');

            return gradeNoteTags.map(noteTag => ({
                data: JSON.parse(noteTag.data).data,
                updatedAt: noteTag.updatedAt,
                studyMethod: studyMethodNoteTag ? JSON.parse(studyMethodNoteTag.data).data : null
            }));
        });

        res.json(gradeData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const getUserNotesWithHomeworkAndGradeTags = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notes = await statisticConnection.getUserNotesWithTags(userId);

        const filteredNotes = notes.filter(note => {
            const noteTags = note.NoteTags.map(noteTag => noteTag.Tag.name);
            return noteTags.includes('Homework') && noteTags.includes('Grade') && !noteTags.includes('Exam');
        });

        const gradeData = filteredNotes.flatMap(note => 
            note.NoteTags
                .filter(noteTag => noteTag.Tag.name === 'Grade')
                .map(noteTag => ({
                    data: JSON.parse(noteTag.data).data,
                    updatedAt: noteTag.updatedAt
                }))
        );

        res.json(gradeData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


module.exports = { checkUserProgress, getUserNotesWithGradeAndExamTags, getUserNotesWithHomeworkAndGradeTags, checkAnomaly};