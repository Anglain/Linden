// var express = require('express');
// var router = express.Router();
// var User = require('./mongodb');
//
// router.get('/', function(req, res, next) {
//     res.render('mainPage', {
//         pageTitle: "Your board"
//     });
// });
//
// router.post('/login', function (req, res, next) {
//     if (req.body.username && req.body.email && req.body.password) {
//         var newUser = new User();
//
//         newUser.email = req.body.email;
//         newUser.username = req.body.username;
//         newUser.password = req.body.password;
//         newUser.board = req.body.board;
//
//         User.findOne({email: newUser.email, password: newUser.password}, function (err, user) {
//             if (err) {
//                 console.alert(err.message);
//                 return res.status(500).send();
//             } else if (!user) {
//                 return res.status(404).send();
//             } else {
//                 return res.status(200).send();
//             }
//         });
//     }
// });
//
// router.post('/register', function (req, res) {
//
//     if (req.body.username && req.body.email && req.body.password) {
//         var newUser = new User();
//
//         newUser.email = req.body.email;
//         newUser.username = req.body.username;
//         newUser.password = req.body.password;
//         newUser.save(function(err, savedUser) {
//             if (err) {
//                 console.alert("Error saving new user. " + err.message);
//                 return res.status(500).send();
//             } else {
//
//                 return res.status(200).send();
//             }
//         });
//     }
// });
//
// router.get('/dashboard', function(req, res, next) {
//
// });
//
// router.get('/profile', function(req, res, next) {
//
//     User.findById(req.session.userId).exec(function(err, user) {
//         if (err) {
//             return next(error);
//         } else {
//             if (user === null) {
//                 var err = new Error('You are not authorized!');
//                 err.status = 400;
//                 return next(err);
//             } else {
//                 return res.send({
//                     email: user.email,
//                     username: user.username,
//                     password: user.password,
//                     board: user.board
//                 });
//             }
//         }
//     })
// });
//
// router.get('/logout', function (req, res, next) {
//     if (req.session) {
//         req.session.destroy(function(err) {
//            if (err) {
//                return next(err);
//            } else {
//                return res.redirect('/');
//            }
//         });
//     }
// });

var express = require('express');
var router = express.Router();
var User = require('../models/mongoUser');


// GET route for reading data
router.get('/', function (req, res, next) {
    console.log("standard");
    return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});

//POST route for updating data
router.post('/', function (req, res, next) {

    if (req.body.email &&
        req.body.password) {

        var userData = {
            email: req.body.email,
            password: req.body.password
        };

        console.log(userData);

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });

    } else if (req.body.email && req.body.password) {

        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;