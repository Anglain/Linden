$(function () {
    var Menu = require('./Menu');
    var Board = require('./board/Board');
    var Preview = require('./modal/preview');
    var Settings = require('./modal/settings');


    Board.initialize();
    Menu.initialize();
});