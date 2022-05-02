const {io} = require('../index');

// Mensages de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensajjjeee', payload);

        io.emit('mensaje', {admin : 'Nuevo mensaje'});
    });
  });
