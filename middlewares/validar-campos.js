
const { validationResult } = require("express-validator")


/// Next es un callback que va a indiquar a Express que si todo salé bien
/// puede continuir con el siguiente middleware.
const validarCampos = (req, res, next) => {

    const errores = validationResult(req);
    
    if(!errores.isEmpty()) {
        return res.status(400).json({
            ok : false,
            errors : errores.mapped(),
        });
    }

    next();

}

module.exports = {
    validarCampos
}