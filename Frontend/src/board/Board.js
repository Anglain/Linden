var Templates = require('../Templates');

//var API = require("../API");
var boardContent = [];
//var boardContent = require('../BoardContent');

//Сюди колонки
var $TheBoard = $("#central");

function removeAll() {
    boardContent = [];
    update();
}

function addColumn(title){

    var column = {
        title: title,
        cards: []
    };

    boardContent.push(column);
    update();
}

function remove(column) {
    boardContent.splice(boardContent.indexOf(column), 1);
    update();
}

function initialize() {
    boardContent = [];

    newContent = JSON.parse(localStorage.getItem('board'));
    if (newContent)
        boardContent = newContent;
    update();
}

function update() {

    $TheBoard.html("");

    function showOneColumn(column) {
        var html_code = Templates.Column(column);

        var $node = $(html_code);

        $node.find(".sort-cards-button").click(function () {
            //sort(column);
            update();
        });

        $node.find(".delete-column-button").click(function () {
            remove(column);
            update();
        });

        $node.find(".add-card").click(function () {
           var card = {
               name: "New card",
               text: ''
           };
           column.cards.push(card);
           update();
        });

        var $placeForCards = $node.find(".place-for-cards");
        $placeForCards.html("");

        function showOneCard(card) {
            var html_code_card = Templates.Card(card);
            var $card_node = $(html_code_card);

            $card_node.find(".delete-card-button").click(function () {
                column.cards.splice(column.cards.indexOf($card_node),1);
                update();
            });

            //якісь функції на перейменування?

            $placeForCards.append($card_node);
        }
        column.cards.forEach(showOneCard);

        $TheBoard.append($node);
    }

    localStorage.setItem('board', JSON.stringify(boardContent));

    boardContent.forEach(showOneColumn);
}

exports.removeAll = removeAll;
exports.addColumn = addColumn;

exports.initialize = initialize;
