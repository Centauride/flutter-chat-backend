/*
    path : /api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, connectarUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// "check" es un midleware
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Wrong email format').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], crearUsuario);

router.post('/login', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Wrong email format').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], connectarUsuario);

router.get('/renew',
    validarJWT,
renewToken);

// post
// validar email y password

module.exports = router;