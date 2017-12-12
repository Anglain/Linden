Board = require('./board/Board');

var $menu = $("#menu");

function initialize() {

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
}

exports.initialize = initialize;