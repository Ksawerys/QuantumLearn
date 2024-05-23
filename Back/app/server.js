const express = require('express');
const fileUpload = require('express-fileupload');


const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.userPath = '/user'
        this.openaiPath = '/openai'
        this.notePath = '/note'
        this.tagPath = '/tag'
        this.questionnairePath = '/questionnaire'
        this.questionPath = '/question'

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/userRoute'));
        this.app.use(this.openaiPath, require('../routes/openaiRoutes'));
        this.app.use(this.notePath, require('../routes/noteRoutes'));
        this.app.use(this.tagPath, require('../routes/tagRoutes'));
        this.app.use(this.questionnairePath, require('../routes/questionnaireRoutes'));
        this.app.use(this.questionPath, require('../routes/questionRoutes'));

        this.app.use((err, req, res, next) => {
            console.log('-',err);
            res.status(500).send('¡Algo salió mal!');
        });
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;