const socketController = (socket, io) => {
    console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKET_PORT1}`);

    // Escucha la noticia que ha sido creada
    socket.on('noticia_creada', (payload) => {

        // Enviar mensaje a todos los clientes
        io.emit('enviar_notificacion_noticia', payload);
    });
};

module.exports = {
    socketController
};
