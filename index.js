const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// server side connection
io.on('connection', (socket) => {

    // welcome the user
    socket.emit('message', `BOT: Hey User ${socket.id}. You're connected!`); // logs a message when user connects

    // sending a welcoming message to all clients except the sender 
    socket.broadcast.emit('message', `User ${socket.id} just joined!`);

    socket.on('disconnect', () => {
        // logs a message to whole serverwhen user disconnects
        io.emit('message', `Oh no! User ${socket.id} disconnected!`); 
    });
});

server.listen(3000, () => { // identifies when server is running on my local domain
    console.log("Server running...");
});