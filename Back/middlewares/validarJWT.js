const jwt = require('jsonwebtoken')

const validarUsuario = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {roles} = jwt.verify(token, process.env.secretOrPrivateKey)
        const rolesArray = roles[0].roles.map(rol => rol.nombre); // Transforma a un array de nombres

        if (rolesArray.includes('usuario')) {
                next();
            } else {
                res.status(400).json({ 'msg': 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(401).json({'msg':'Token no valido'})
    }
}

const validarProfesor = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {roles} = jwt.verify(token, process.env.secretOrPrivateKey)
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (rolesArray.includes('profesor')) {
            next();
        } else {
            res.status(400).json({ 'msg': 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(401).json({'msg':'Token no valido'})
    }
}

const validarJefeEstudios = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {roles} = jwt.verify(token, process.env.secretOrPrivateKey)
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (rolesArray.includes('jefeEstudios')) {
            next();
        } else {
            res.status(400).json({ 'msg': 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(401).json({'msg':'Token no valido'})
    }
}

const validarAdmin = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {roles} = jwt.verify(token, process.env.secretOrPrivateKey)
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (rolesArray.includes('admin')) {
            next();
        } else {
            res.status(400).json({ 'msg': 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(401).json({'msg':'Token no valido'})
    }
}

const validarToken = (req, res, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }
    try {
        next()
    } catch (error) {
        res.status(401).json({'msg':'Token no valido'})
    }
}

const validarProfesoresJefesAdmin = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {roles} = jwt.verify(token, process.env.secretOrPrivateKey)
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (rolesArray.includes('admin') || rolesArray.includes('profesor') || rolesArray.includes('jefeDepto')) {
            next();
        } else {
            res.status(400).json({ 'msg': 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(401).json({'msg':'Token no valido'})
    }
}

module.exports = {
    validarAdmin,
    validarUsuario,
    validarJefeEstudios,
    validarProfesor,
    validarToken,
    validarProfesoresJefesAdmin
}