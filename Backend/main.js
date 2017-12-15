/**
 * @author Shudra Ihor, Software Engineering-2
 * main.js backup
 */

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

function configureEndpoints(app) {
    var pages = require('./pageLoad');
    var api_backend = require('./API_backend');

    app.post('/loginUser', api_backend.loginUser);
    app.post('/registerUser', api_backend.registerUser);

    // ======= Main page load ==========
    app.get('/', pages.mainPage);

    // ====== Use this in case of emergency ========
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    // ============ Creating express app =============
    var app = express();

    mongoose.connect('mongodb://localhost/usersDatabase');
    var db = mongoose.connection;

    // ========= Handle mongo error ===========
    db.on('error', function(err) {
        console.log("USER DATABASE CONNECTION ERROR: ", err.message);
    });

    db.once('open', function(callback) {
        console.log('USER DATABASE CONNECTED.');
    });

    // ========== Creating express session ===========

    // ====== Configuring templates folder ========
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // ========== Using morgan to log changes ============
    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    configureEndpoints(app);

    // =========== Launch app ===========
    app.listen(port, function () {
        console.log('Linden launched on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;