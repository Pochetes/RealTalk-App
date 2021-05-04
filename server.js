const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/public'));


// server side connection
io.on('connection', (socket) => {

    // welcome the user
    socket.emit('message', `BOT: Hey User ${socket.id}. You're connected!`); // logs a message when user connects

    // sending a welcoming message to all clients except the sender 
    socket.broadcast.emit('message', `User ${socket.id} just joined!`);

    // captures input value event and sends it to client to print to chat
    socket.on('chat message', msg => {
        io.emit('message', `User ${socket.id}: ${msg}`);
    });
    
    // logs a message to whole server when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', `Oh no! User ${socket.id} disconnected!`); 
    });
});

server.listen(3000, () => { // identifies when server is running on my local domain
    console.log("Server running...");
});