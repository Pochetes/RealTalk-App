const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(require('cors')());
app.use(express.static(__dirname + '/public'));


// server side connection
io.on('connection', (socket) => {

    // event handler for all clients with their nickname
    socket.on('name', username => {
        // welcomes the user
        console.log(`User ${socket.id} is ${username}`);

        // sends a welcoming message to client when they connect
        socket.emit('info', `Hey ${username}. You're connected!`);

        // broadcasts a welcoming message to all other clients minus sender 
        socket.broadcast.emit('info', `${username} just joined!`);

        // captures input value event and sends it to client to showcase in chat
        socket.on('chat message', msg => {
            io.emit('message', `${username}: ${msg}`);
        });

        // captures keypress event and sends it back to client to show or hide
        socket.on('typing', data => {
            if (data.isTyping) {
                socket.broadcast.emit('userTyping', data);
            } else {
                socket.broadcast.emit('userTyping', data);
            }
        });

        // captures disconnectivity event and sends to client to showcase in chat
        socket.on('disconnect', () => {
            io.emit('info', `Oh no! ${username} disconnected!`); 
        });
    });
});

server.listen(3000, () => { // identifies when server is running on my local domain
    console.log("Server running...");
});