const { response } = require('express');
const  bcrypt  = require('bcryptjs');

// const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { redirect } = require('express/lib/response');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if( existeEmail ) {
            return res.status(400).json({
                ok : false,
                msg : 'El correo ya esta registrado',
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
        res.status(500).json({
            ok : false,
            msg : "Hable con el administrador"
        })
    }
}

const connectarUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ) {
            return res.status(400).json({
                ok : false,
                msg : 'El correo no es valido',
            });
        }

        // Decriptar contrasena
        const isPasswordValid = bcrypt.compareSync(password, usuarioDB.password);
    
        if( !isPasswordValid ) {
            return res.status(400).json({
                ok : false,
                msg : 'La contrasena no es valida',
            });
        }


        // Generar Token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok : true,
            msg: 'Usuario connectado',
            body : usuarioDB,
            token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : "Hable con el administrador"
        })
    }
}

// const login req res
// ok : true, msg : logged in.

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
        res.status(500).json({
            ok : false,
            msg : "Hable con el administrador"
        })
    }

    

}


module.exports = {
    crearUsuario,
    connectarUsuario,
    renewToken,
}
