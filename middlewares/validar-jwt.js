const jwt = require('jsonwebtoken');
const { ServerErrors } = require('../helpers/server-errors');


const validarJWT = ( req, res, next)=> {

    const token = req.header('x-token');

    if (!token){
        return res.status(ServerErrors.missingToken.status).json({
            ok : false,
            msg: ServerErrors.missingToken.message
        });
    }

    console.log(token);

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        req.uid = uid;

        next();

        
    } catch (error) {
        console.log(error);
        res.status(ServerErrors.genericError.status).json({
            ok : false,
            msg : ServerErrors.genericError.message
        })
        
    }

}


module.exports = {
    validarJWT
}