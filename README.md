# RealTalk
RealTalk is a node.js live chat application powered by Socket.io and Express.

## Features
* Responsive "User is typing..." event
* Handles countless participant activity
* Provides System alerts about user events
* Real-time communication access

## How it Works
RealTalk uses sockets (protocols that a node uses to send/recieve data across the internet) to communicate from computer to computer. They are actively looking for signals to pickup and send once instructed. The `socket.on(eventName, callback)` picks up events from sockets and decides to send it to server and vice versa. The client-server model works seamlessly sending each other events and displaying it to the browser.

The GIF below demonstrates the functionality of RealTalk:

![first-half](public/images/first-half-vid.gif)

It also works well handling multiple sockets at a time:

![second-half](public/images/second-half-vid.gif)

 