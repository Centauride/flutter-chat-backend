const express = require('express');
const path = require('path');
const { isModuleNamespaceObject } = require('util/types');
require('dotenv').config();
const { ServerErrors } = require('./helpers/server-errors');


require('./database/config').dbConnection();

// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);


require('./sockets/socket');


// Path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


/* MIS ROUTAS */
app.use('/api/auth', require('./routes/auth'));

// this is default in case of unmatched routes
app.use(function(req, res) {

  return res.status(ServerErrors.invalidRequest.status).json({
    ok : false,
    msg : ServerErrors.invalidRequest.message,
    name : 'Error',
    statusCode : ServerErrors.invalidRequest.status,
    requestedPath : req.path,

    
});

    // Invalid request
          // res.json({
          //   error: {
          //     name : 'Error',
          //     status : ServerErrors.invalidRequest.status,
          //     statusCode : ServerErrors.invalidRequest.status,
          //     message : ServerErrors.invalidRequest.message,
          //     requestedPath : req.path,
          //   }
          // });
    });
    




server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto!', process.env.PORT);
})