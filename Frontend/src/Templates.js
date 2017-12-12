var fs = require('fs');
var ejs = require('ejs');


exports.Column = ejs.compile(fs.readFileSync('./Frontend/templates/Column.ejs', "utf8"));

exports.Card = ejs.compile(fs.readFileSync('./Frontend/templates/Card.ejs', "utf8"));