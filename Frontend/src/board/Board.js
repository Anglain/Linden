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

function addColumn(title) {

    var column = {
        title: title,
        cards: []
    };

    boardContent.push(column);
    update();
}

var today = new Date();//use in case we decide to change deadline color
var dd = today.getDate();
var mm = (today.getMonth() + 1);
var yyyy = today.getFullYear();


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
                day: 15,
                month: 12,
                year: 2017,
                name: "date",
                text: "",
                picture: ""
            };
            column.cards.push(card);
            update();
        });

        var $name = $node.find(".column-title");
        $name.click(function () {
            $name.hide();
            $node.find(".input-text-column").show();
            $node.find(".input-text-column").val(column.title);
            $node.find(".input-text-column").focus();
        });
        $node.find(".input-text-column").focusout(function () {
            $name.show();
            $node.find(".input-text-column").hide();

            if ($node.find(".input-text-column").val().trim()) {
                column.title = $node.find(".input-text-column").val();
                $name.text(column.title);
                update();
            }
        });
        $node.find(".input-text-column").keyup(function (e) {
            if (e.which === 13) {
                $name.show();

                $node.find(".input-text-column").hide();

                if ($node.find(".input-text-column").val().trim()) {
                    column.title = $node.find(".input-text-column").val();
                    $name.text(column.title);
                    update();
                }
            }
        });

        var $placeForCards = $node.find(".place-for-cards");
        $placeForCards.html("");

        function showOneCard(card) {
            var html_code_card = Templates.Card(card);
            var $card_node = $(html_code_card);

            $card_node.find(".delete-card-button").click(function () {
                column.cards.splice(column.cards.indexOf(card), 1);
                update();
            });

            $card_node.find(".form-control").focusout(function () {
                card.text = $card_node.find(".form-control").val();
                update();
            });

            $card_node.find(".edit-card-button").click(function () {
                var $placeForDialog = $("#myModal");
                $placeForDialog.html("");
                var $modal = $(Templates.Modal(card));

                $modal.find("#datepicker").val(card.year+"-"+card.month+"-"+card.day);
                $modal.find(".set-deadline-text").click(function () {
                    var date = new Date($('#datepicker').val());
                    card.day = date.getDate();
                    card.month = date.getMonth() + 1;
                    card.year = date.getFullYear();
                    card.name = card.day +"." + card.month + "." + card.year;
                    update();
                });

                $modal.find(".save").click(function () {
                    card.text = $modal.find(".card-text").val();
                    card.picture = $modal.find(".image-preview-filename").val();
                    update();
                });

                $placeForDialog.append($modal);
            });

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
