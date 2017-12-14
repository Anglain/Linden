Board = require('./board/Board');

//var Templates = require('./Templates');

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
    if (logged) {
        $("#no-login-wrap").show();
        $("#login-wrap").hide();
    } else {
        $("#login-wrap").show();
        $("#no-login-wrap").hide();
    }

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

                $menu.find("#no-login-wrap").find(".user-name").text(user.login);
                $menu.find("#no-login-wrap").find(".user-mail").text(user.mail);
                $menu.find("#no-login-wrap").show();
                $menu.find("#login-wrap").hide();
            } else {
                $menu.find("#no-login-wrap").hide();
                $menu.find("#login-wrap").show();
            }
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

                $menu.find("#no-login-wrap").find(".user-name").text(user.login);
                $menu.find("#no-login-wrap").find(".user-mail").text(user.mail);
                $menu.find("#no-login-wrap").show();
                $menu.find("#login-wrap").hide();
            } else {
                $menu.find("#no-login-wrap").hide();
                $menu.find(".login-wrap").show();
            }
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
        Board.addColumn("New column");
    });

    $("#inputMail").focusout(function () {
        checkMail();
    });
}

exports.initialize = initialize;
exports.logged = logged;