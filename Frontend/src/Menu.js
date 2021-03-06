// ES6 Modules or TypeScript
// CommonJS
const swal = require('sweetalert2');

var Board = require('./board/Board');
var api_frontend = require('./API_frontend');

//var User = require('../models/mongoUser');

//var Templates = require('./Templates');

var $menu = $("#menu");
var logged = false;

var sessionUser = {
    email: "",
    username: "",
    password: "",
    board: []
};

function allOk() {
    if (logged)
        return true;
    else {
        return checkMail() && checkPassword();
    }
}

function checkMail() {
    var mail = $(".mail-group");
    var input = $("#inputMail").val();
    var helpText = $(".mail-help-block");

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    if (validateEmail(input)) {
        helpText.hide();
      //  mail.addClass("has-success");
        mail.removeClass("has-error");
        return true;
    } else {
        helpText.show();
        mail.addClass("has-error");
       // mail.removeClass("has-success");
        return false;
    }
}

function checkPassword() {
    var pass = $(".password-group");
    var input = $("#inputPassword").val();
    var helpText = $(".password-help-block");

    if (input.trim()) {
        helpText.hide();
        pass.addClass("has-success");
        pass.removeClass("has-error");
        return true;
    } else {
        helpText.show();
        pass.addClass("has-error");
        pass.removeClass("has-success");
        return false;
    }
}

function initialize() {

    logged = JSON.parse(localStorage.getItem('loggedIn'));

    if (logged) {
        if (JSON.parse(localStorage.getItem('sessionUser'))) {
            sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
            $menu.find("#no-login-wrap").find(".user-name").text(sessionUser.username);
            $menu.find("#no-login-wrap").find(".user-mail").text(sessionUser.email);
        }
        $("#no-login-wrap").css("display", "block");
        $("#login-wrap").css("display", "none");
    } else {
        $("#login-wrap").css("display", "block");
        $("#no-login-wrap").css("display", "none");
        Board.removeAll();
    }

    $("#inputMail").focusout(function () {
        checkMail();
    });

    $("#inputPassword").focusout(function () {
        checkPassword();
    });

    update();
}

function update() {
    if (JSON.parse(localStorage.getItem('sessionUser'))) {
        sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    }

    $menu.find("#login").click(function () {
        var check = allOk();

        if (check) {
            logged = true;
            localStorage.setItem('loggedIn', JSON.stringify(logged));
            sessionUser.email = $("#inputMail").val();
            sessionUser.username = "User";
            sessionUser.password = $("#inputPassword").val();
            sessionUser.board = Board.boardContent;
            // sessionUser.save(function(err) {
            //     if (err) {
            //         console.log("Error creating sessionUser: " + err.message);
            //     }
            // });
            localStorage.setItem('sessionUser', JSON.stringify(sessionUser));
            console.log(sessionUser);

            $menu.find("#no-login-wrap").find(".user-name").text(sessionUser.username);
            $menu.find("#no-login-wrap").find(".user-mail").text(sessionUser.email);
            $menu.find("#no-login-wrap").css("display", "block");
            $menu.find("#login-wrap").css("display", "none");
            update();
        }
    });

    $menu.find("#register").click(function() {
        sessionUser.email = $("#inputMail").val();
        sessionUser.username = "User";
        sessionUser.password = $("#inputPassword").val();
        sessionUser.board = Board.boardContent;
        // sessionUser.save(function(err) {
        //     if (err) {
        //         console.log("Error creating sessionUser: " + err.message);
        //     }
        // });
    });

    $menu.find(".exit-button").click(function () {
        logged = false;
        localStorage.setItem('loggedIn', logged);

        $menu.find("#no-login-wrap").css("display", "none");
        $menu.find("#login-wrap").css("display", "block");

        sessionUser.board = Board.boardContent;
        console.log("sessionUser.board" + sessionUser.board);
        console.log("Board.boardContent" + Board.boardContent);

        // sessionUser.save(function(err) {
        //     if (err) {
        //         console.log("Error creating sessionUser: " + err.message);
        //     }
        // });
        localStorage.setItem('sessionUser', '');

        console.log(sessionUser);
        Board.removeAll();
    });

    var menuOpened = true;
    $menu.find(".menu-functions").css("display", "block");

    $menu.find(".open-close-menu-button").click(function () {
        if (menuOpened) {
            $(".left-menu-panel").width(0);
            $(".main-container").css({'padding-left': '0px'});
            $menu.find(".menu-functions").css("display", "none");
        } else {
            $(".left-menu-panel").width(300);
            $(".main-container").css({'padding-left': '300px'});
            $menu.find(".menu-functions").css("display", "block");
        }
        menuOpened = !menuOpened;
    });

    $menu.find(".clear-board-button").click(function () {

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Board.removeAll();
                swal(
                    'Deleted!',
                    'Your cards have been deleted.',
                    'success'
                )
            }
        })

    });

    $menu.find(".add-column-button").click(function () {
        Board.addColumn("New column");
    });

    $menu.find(".settings-button").click(function () {
        var $username = $('#userNameChange');
        var $mail = $('#userMailChange');
        var $password = $('#userPasswordChange');

        $username.val(sessionUser.username);
        $mail.val(sessionUser.email);
        $password.val(sessionUser.password);

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        $('#placeForSetModal').find(".saveUser").click(function () {
            if ($password.val().trim() && validateEmail($mail.val()) && $username.val().length <= 14){
                sessionUser.username = $username.val();
                sessionUser.email = $mail.val();
                sessionUser.password = $password.val();
                $('#setModal').removeClass("has-error");
                $('#setModal').addClass("has-success");
                $menu.find("#no-login-wrap").find(".user-name").text(sessionUser.username);
                $menu.find("#no-login-wrap").find(".user-mail").text(sessionUser.email);
                localStorage.setItem('sessionUser', JSON.stringify(sessionUser));
                update();

            } else {
                $('#setModal').addClass("has-error");
                $('#setModal').removeClass("has-success");
            }
        });

    });

    $("#inputMail").focusout(function () {
        checkMail();
    });

    $("#inputPassword").focusout(function () {
        checkPassword();
    });

    sessionUser.board = Board.boardContent;
    localStorage.setItem('loggedIn', logged);
    localStorage.setItem('sessionUser', JSON.stringify(sessionUser));
    console.log(sessionUser);
}

exports.initialize = initialize;
exports.sessionUser = sessionUser;