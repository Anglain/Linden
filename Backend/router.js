var express = require('express');
var router = express.Router();
var User = require('./mongodb');

router.get('/', function(req, res, next) {
    res.render('mainPage', {
        pageTitle: "Your board"
    });
});

router.post('/reg', function (req, res) {

});