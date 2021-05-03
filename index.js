const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// event handler for all messages
io.on('connection', (socket) => {
    console.log('a user connected'); // logs sockets connected to the server to console
    
    socket.on('disconnect', () => {
        console.log('a user disconnected'); // logs sockets that leave the server to console
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // logs a msg to all other sockets in the server
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});