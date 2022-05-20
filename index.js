const express = require('express');
const path = require('path');
const { isModuleNamespaceObject } = require('util/types');
require('dotenv').config();

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




server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto!', process.env.PORT);
})