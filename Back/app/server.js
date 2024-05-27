const express = require('express');
const fileUpload = require('express-fileupload');
const ErrorLogger = require('../utilities/errorLogger');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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
        this.apiLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, 
            max: 100 
        });
        this.middlewares()
        this.routes()
    }

    middlewares() {
        // const whitelist = ['http://quantumlearn.com']; 
        // const corsOptions = {
        //     origin: function (origin, callback) {
        //       if (whitelist.indexOf(origin) !== -1) {
        //         callback(null, true)
        //       } else {
        //         callback(new Error('Not allowed by CORS'))
        //       }
        //     }
        // }
          
        // this.app.use(cors(corsOptions));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(this.apiLimiter);
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
        //Health Check Endpoint
        this.app.get('/health', (req, res) => {
            res.status(200).send('Server is up and running');
        });
        
        this.app.use((err, req, res, next) => {
            ErrorLogger.log(err);
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