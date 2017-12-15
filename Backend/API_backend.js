/**
 * @param req - client request
 * @param res - server response
 */

//var express = require('express');
//var router = express.Router();
var User = require('./mongodb');

exports.loginUser = function(req, res) {

    console.log(req);
    console.log(req.body);
    var userData = req.body;

    User.authenticate(userData.email, userData.password, function(err, data) {
        if (err) {
            res.status(500).send({success: false});
            alert("Authentication failed. " + err.message);
        } else {
            res.send({
                success: true,
                username: data.username,
                email: data.email,
                board: data.board
            })
        }
    });

    res.status(500).send({success: false});
};

exports.registerUser = function(req, res) {
    console.log(req);
    console.log(req.body);

    var userData = req.body;
    var foundUser;

    User.findOne({ email: userData.email }, function (err, user) {
        if (err) {
            console.alert("User not found!" + err.message);
        } else {
            foundUser = user;
        }
    });

    if (!foundUser) {

        User.create(userData, function(err, user) {
            if (err) {
                return next(err);
            } else {
                req.session.userId = user._id;
            }
        });

        res.send({
            success: true
        });

    } else {
        alert("User with this email is already registered!");
    }
};