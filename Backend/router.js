var express = require('express');
var router = express.Router();
var User = require('./mongodb');

router.get('/', function(req, res, next) {
    res.render('mainPage', {
        pageTitle: "Your board"
    });
});

router.post('/reg', function (req, res) {
    if (req.body.username && req.body.email && req.body.password) {
        var newUser = new User();
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.save(function(err, savedUser) {
            if (err) {
                console.alert("Error saving new user. " + err.message);
                return res.status(500).send();
            } else {

                return res.status(200).send();
            }
        });
    }
});

router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
           if (err) {
               return next(err);
           } else {
               return res.redirect('/');
           }
        });
    }
});