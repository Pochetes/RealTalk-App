let socket = io('http://localhost:3000');

        let form = document.getElementById('form');
        let input = document.getElementById('input');
        let username = prompt("What is your name?");
        let isTyping = false;

        // prints messages in chat
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                // sends input value to the server 
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        // receives event from online channel and prints num of users online
        socket.on('onlineUsers', (data) => {
            $('#online').text(`${data} people online`);
        })

        // checks input value during keyup and updates server event
        const checkTyping = () => {
            if (input.value.length >= 1) {
                socket.emit('typing', {user: username, isTyping: true});
            } else{
                socket.emit('typing', {user: username, isTyping: false});
            }
        }

        // sends username to server for classification
        socket.emit('name', username);

        // event handler for all info messages
        socket.on('info', data => {
            $("#messages").append(`<li><i><b>${data}</b></i></li>`);
        });
      
        // event handler that prints who is typing at the moment
        socket.on('userTyping', data => {

            if (data.isTyping) {
                $('#typing').text(`${data.user} is typing...`);
            } else {
                $('#typing').text('');
            };
        })

        // event handler for messages for broadcasts, one client, or whole server
        socket.on('message', function(data) {
            $("#messages").append(`<li>${data}</li>`);
        });