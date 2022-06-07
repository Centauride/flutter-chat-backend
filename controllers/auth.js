const { response } = require('express');
const  bcrypt  = require('bcryptjs');

// const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { redirect } = require('express/lib/response');
const { ServerErrors } = require('../helpers/server-errors');


/// ==========================================================
///
const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            return res.status(ServerErrors.alreadyRegistered.status).json({
                ok : false,
                msg :  ServerErrors.alreadyRegistered.message,
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar Token
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok : true,
            // msg: 'Crear Usario !!'
            body : usuario,
            token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(ServerErrors.genericError.status)
            .json({
                ok : false,
                msg : ServerErrors.genericError.message
            });
    }
}

/// ==========================================================
///
const connectarUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    console.log('Tratando de iniciar sesion : ' +email);

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ) {
            return res.status(ServerErrors.invalidEmail.status)
                .json({
                    ok : false,
                    msg : ServerErrors.invalidEmail.message,
                });
        }

        // Decriptar contrasena
        const isPasswordValid = bcrypt.compareSync(password, usuarioDB.password);
    
        if( !isPasswordValid ) {
            return res.status(ServerErrors.invalidPassword.status).json({
                ok : false,
                msg : ServerErrors.invalidPassword.message,
            });
        }


        // Generar Token
        const token = await generarJWT(usuarioDB.id);

        console.log('connection exitosa para ' +email)

        res.json({
            ok : true,
            msg: 'Usuario connectado',
            body : usuarioDB,
            token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(ServerErrors.genericError.status).json({
            ok : false,
            msg : ServerErrors.genericError.message
        })
    }
}

/// ==========================================================
///
const renewToken = async (req, res = response) => {

    try {
        const uid = req.uid;
        console.log('req uid ' + req.uid);

        const token = await generarJWT(uid);

        const usuarioDB = await Usuario.findById( uid );


        // generar new JWT
        // Obtener el usuario por el UID, Usuario.

        res.json({
            ok : true,
            msg: 'token renewed',
            body : usuarioDB,
            token,
            uid : uid,
        });
    
    } catch (error) {
        console.log(error);
        res.status(ServerErrors.genericError.status).json({
            ok : false,
            msg : ServerErrors.genericError.message
        })
    }

    

}


module.exports = {
    crearUsuario,
    connectarUsuario,
    renewToken,
}
