const express = require('express');
const fileUpload = require('express-fileupload');


const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.userPath = '/user'
        this.openaiPath = '/openai'

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

        this.app.use((err, req, res, next) => {
            console.log('asdasdasdasdasdsd',err);
            res.status(500).send('¡Algo salió mal!');
        });
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })

        this.serverWebSocket.listen(process.env.WEBSOCKET_PORT1, () => {
            console.log(`Servidor de WebSockets escuchando en: ${process.env.WEBSOCKET_PORT1}`);
        });
    }
}

module.exports = Server;