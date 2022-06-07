
const ServerErrors = {
    ///
    /// ========================== 400 =============================
    ///
    alreadyRegistered : 
        {status : 400, message : 'El correo ya esta registrado'},
    invalidEmail : 
        {status : 400, message : 'El correo no es valido',},
    invalidPassword : 
        {status : 400, message : 'La contrasena no es valida',},
    ///
    /// ========================== 401 =============================
    ///
    missingToken : 
        {status : 401, message : 'No hay token en la peticion'},
    ///
    /// ========================== 404 =============================
    ///
    invalidRequest : 
        {status : 404, message : 'Invalid Request'},
    ///
    /// ========================== 500 =============================
    ///
    genericError : 
        {status : 500, message : "Hable con el administrador"},
};

module.exports = { ServerErrors }