var fs = require('fs');
var ejs = require('ejs');


exports.Column = ejs.compile(fs.readFileSync('./Frontend/templates/Column.ejs', "utf8"));

exports.Card = ejs.compile(fs.readFileSync('./Frontend/templates/Card.ejs', "utf8"));

exports.Login = ejs.compile(fs.readFileSync('./Frontend/templates/Login.ejs', "utf8"));

exports.Menu = ejs.compile(fs.readFileSync('./Frontend/templates/Menu.ejs', "utf8"));

// exports.Modal = ejs.compile(fs.readFileSync('./Frontend/templates/Modal.ejs', "utf8"));