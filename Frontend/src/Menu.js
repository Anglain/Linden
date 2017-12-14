Board = require('./board/Board');
var Templates = require('./Templates');
var api_frontend = require('./API_frontend');

var $menu = $("#menu");
var logged = false;

function allOk() {
    if (logged)
        return true;
    else {
        return checkMail();
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
        mail.addClass("has-success");
        mail.removeClass("has-error");
        return true;
    } else {
        helpText.show();
        mail.addClass("has-error");
        mail.removeClass("has-success");
        return false;
    }
}

function initialize() {
    var html_code;
    var $node;
    if (logged) {
        html_code = Templates.Menu();
    } else {
        html_code = Templates.Login();
    }

    $node = $(html_code);
    $menu.append($node);

    $("#inputMail").focusout(function () {
        checkMail();
    });

    $menu.find(".change-state-btn").click(function () {
        var check = allOk();
        if (check) {
            logged = !logged;
            if (logged) {
                var user = {
                    email: $("#inputMail").val(),
                    username: "User",
                    password: $("#inputPassword").val(),
                    board: []
                };
                api_frontend.loginUser(user, function(err, data) {
                    if (err) {
                        alert("[MENU.JS] Couldn't login user! " + err.message);
                        console.log(user);
                    } else {
                        user.board = data.board;
                        console.log(user);
                    }
                });

                html_code = Templates.Menu(user);
            } else {
                html_code = Templates.Login();
            }
            $node = $(html_code);
            $menu.html("");
            $menu.append($node);
            update();
        }
    });

}

function update() {
    $menu.find(".change-state-btn").click(function () {
        var check = allOk();
        if (check) {
            logged = !logged;
            if (logged) {
                var user = {
                    email: $("#inputMail").val(),
                    username: "User",
                    password: $("#inputPassword").val(),
                    board: []
                };
                api_frontend.loginUser(user, function(err, data) {
                    if (err) {
                        alert("[MENU.JS] Couldn't login user! " + err.message);
                        console.log(user);
                    } else {
                        user.board = data.board;
                        console.log(user);
                    }
                });

                var html_code = Templates.Menu(user);
            } else {
                html_code = Templates.Login();
            }
            var $node = $(html_code);
            $menu.html("");
            $menu.append($node);
            update();
        }
    });

    var menuOpened = true;
    $menu.find(".menu-functions").show();

    $menu.find(".open-close-menu-button").click(function () {
        if (menuOpened) {
            $(".left-menu-panel").width(0);
            $(".main-container").css({'padding-left': '0px'});
            $menu.find(".menu-functions").hide();
        } else {
            $(".left-menu-panel").width(300);
            $(".main-container").css({'padding-left': '300px'});
            $menu.find(".menu-functions").show();
        }
        menuOpened = !menuOpened;
    });

    $menu.find(".clear-board-button").click(function () {
        Board.removeAll();
    });

    $menu.find(".add-column-button").click(function () {
        Board.addColumn("New column js");
    });

    $("#inputMail").focusout(function () {
        checkMail();
    });
}

exports.initialize = initialize;
exports.logged = logged;