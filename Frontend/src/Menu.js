Board = require('./board/Board');

var $menu = $("#menu");

function initialize() {

    var menuOpened = false;
    $menu.find(".menu-functions").hide();

    $menu.find(".open-close-menu-button").click(function () {
        if (menuOpened) {
            $(".left-menu-panel").width(0);
            $menu.find(".menu-functions").hide();
        } else {
            $(".left-menu-panel").width(300);
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