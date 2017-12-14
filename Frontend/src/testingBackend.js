var api_frontend = require('API_frontend');

$(function() {
    $(".my-login-button").click(function() {
        var userData = {
            email: 'mail@mail.com',
            username: 'mail',
            password: 'mail',
            board: []
        };

        var board = ["Something here!"];

        api_frontend.registerUser(userData, function (err, data) {
            if (err) {
                alert("[TESTING_BACKEND.JS ERROR] Can't login user! " + err.message);
            } else {
                board = data.board;
            }
        });

        console.log(board.toString() + " - board variable");
    });
});
