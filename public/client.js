let socket = io('http://localhost:3000');

        let form = document.getElementById('form');
        let input = document.getElementById('input');
        let username = prompt("What is your name?");
        let isTyping = false;

        // allows messages to be posted on the chat
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                // sends input value to the server 
                socket.emit('chat message', input.value);
                input.value = '';
                isTyping = false;
            }
        });

        // sends username to server for classification
        socket.emit('name', username);

        // event handler for all info messages
        socket.on('info', data => {
            $("#messages").append(`<li><i><b>${data}</b></i></li>`);
        });

        // on key press, checks whether user has information in the input or not
        $("#input").keypress( (e) => {
            if (e.which != 13) {
                socket.emit('typing', {user: username, isTyping: true});
            } else {
                socket.emit('typing', {user: username, isTyping: false});
            };
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