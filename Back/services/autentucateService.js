const { response } = require('express');
const { googleVerify } = require('../helpers/google-verify');
const { generarJWT } = require('../helpers/generate_jwt');

const googleSignin = async(req, res = response) => {
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify( id_token );


        const token = generarJWT(correo); 
        res.status(200).json({correo, token, img});
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }
}

module.exports = {
    googleSignin
}