/**
 * @author Shudra Ihor, Software Engineering-2
 */

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var pageLoad = require('./pageLoad');
var api_backend = require('./API_backend');
var mongodb = require('../mongodb');

// ========== Creating an express app ============
var app = express();
var sessionSecret = "the cake is a lie";

function startServer(port) {
    // ========== Setup mongoose connection ============
    mongoose.connect('mongodb://localhost/testForAuth');
    var db = mongoose.connection;

    // =============== Handle mongo error ===============
    db.on('error', function(err) {
        console.log("USER DATABASE CONNECTION ERROR: ", err.message);
    });

    db.once('open', function(callback) {
        console.log('USER DATABASE CONNECTED.');
    });


    // ========== Creating express session
    app.use(session({
        secret: sessionSecret,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongodb.db
        })
    }));

    // ============ Configure ejs templates folder ===============
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    // =============== Using morgan to log server activity ================
    app.use(morgan('dev'));

    // ============ Configure POST statements =============
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // =============== Configure pages ===============
    // ============ Main page ============
    app.get('/', pageLoad.mainPage);

    // ========= In case of emergency return this ============
    app.use(express.static(path.join(__dirname, '../Frontend/www')));

    // ============= Catch 404 and forward to error handler ==========
    app.use(function (req, res, next) {
        var err = new Error('File Not Found');
        err.status = 404;
        next(err);
    });

    /* ====================== Error handler ====================
     * Define as the last app.use callback */
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
    });

    // =============== Launch express app ===============
    app.listen(port, function () {
        console.log('Linden launched on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;