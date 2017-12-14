$(function () {
    var Menu = require('./Menu');
    var Board = require('./board/Board');
    var Preview = require('./modal/preview');
    var Settings = require('./modal/settings');
    var DragnDrop = require('./DragnDrop');

    Board.initialize();
    Menu.initialize();
    DragnDrop.initialize();

});