
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    var pageLoad = require('./pageLoad');
    var api_backend = require('./API_backend');

    // ============ Get board ============
    app.get('/API_backend/getBoard', api_backend.getBoard);

    // ============ Main page ============
    app.get('/', pageLoad.mainPage);

    // ========= In case of emergency return this ============
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {

    // ========== Creating an express app ============
    var app = express();

    // ============ Configure ejs templates folder ===============
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    // =============== Using morgan to log server activity ================
    app.use(morgan('dev'));

    // ============ Configure POST statements =============
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // =============== Configure pages ===============
    configureEndpoints(app);

    // =============== Launch express app ===============
    app.listen(port, function () {
        console.log('Linden launched on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;