const {Sequelize} = require('sequelize');

class Conexion {
    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
    }

    connect = () => {
        this.db.authenticate().then(() => {
        }).catch(() => {
            console.error('Unable to connect to the database: ')
        })
    }

    desconectar = () => {
        process.on('SIGINT', () => Conexion.close())
    }

}

module.exports = Conexion
