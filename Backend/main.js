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

var mongodb = require('mongodb');

var sessionSecret = "the cake is a lie";

function configureEndpoints(app) {
    var pages = require('./pageLoad');
    var api_backend = require('./API_backend');

    app.post('/auth', api_backend.loginUser);
    app.post('/reg', api_backend.registerUser);

    //Сторінки
    //Головна сторінка
    app.get('/', pages.mainPage);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

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
            mongooseConnection: db
        })
    }));

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('Linden launched on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;