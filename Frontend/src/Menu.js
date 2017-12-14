Board = require('./board/Board');

//var Templates = require('./Templates');

var $menu = $("#menu");
var logged = false;

var sessionUser = {};

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
        $("#no-login-wrap").css("display", "block");
        $("#login-wrap").css("display", "none");
    } else {
        $("#login-wrap").css("display", "block");
        $("#no-login-wrap").css("display", "none");
    }

    $("#inputMail").focusout(function () {
        checkMail();
    });

    update();

    // $menu.find("#login").click(function () {
    //     var check = allOk();
    //
    //     if (check) {
    //         logged = true;
    //
    //          sessionUser = {
    //             email: $("#inputMail").val(),
    //             username: "User",
    //             password: $("#inputPassword").val(),
    //             board: []
    //         };
    //
    //         $menu.find("#no-login-wrap").find(".user-name").text(sessionUser.username);
    //         $menu.find("#no-login-wrap").find(".user-mail").text(sessionUser.email);
    //         $menu.find("#no-login-wrap").css("display", "block");
    //         $menu.find("#login-wrap").css("display", "none");
    //
    //         update();
    //     }
    // });
    //
    // $menu.find(".exit-button").click(function () {
    //     logged = false;
    //
    //     $menu.find("#no-login-wrap").css("display", "none");
    //     $menu.find("#login-wrap").css("display", "block");
    //
    //     update();
    // })
}

function update() {
    $menu.find("#login").click(function () {
        var check = allOk();

        if (check) {
            logged = true;

            sessionUser = {
                email: $("#inputMail").val(),
                username: "User",
                password: $("#inputPassword").val(),
                board: []
            };

            $menu.find("#no-login-wrap").find(".user-name").text(sessionUser.username);
            $menu.find("#no-login-wrap").find(".user-mail").text(sessionUser.email);
            $menu.find("#no-login-wrap").css("display", "block");
            $menu.find("#login-wrap").css("display", "none");

            //update();
        }
    });

    $menu.find(".exit-button").click(function () {
        logged = false;

        $menu.find("#no-login-wrap").css("display", "none");
        $menu.find("#login-wrap").css("display", "block");

        //update();
    })

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