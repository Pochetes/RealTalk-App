let socket = io('http://localhost:3000');

        let form = document.getElementById('form');
        let input = document.getElementById('input');
        let username = prompt("What is your name?");

        // allows messages to be posted on the chat
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                // sends input value to the server 
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        // sends username to server for classification
        socket.emit('name', username);

        // event handler for messages for broadcasts, one client, or whole server
        socket.on('message', function(data) {
            let item = document.createElement('li');
            item.textContent = data;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });