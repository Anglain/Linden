/**
 * @param req - client request
 * @param res - server response
 */

//var express = require('express');
//var router = express.Router();
var User = require('./mongodb');

exports.loginUser = function(req, res) {

    console.log(req.body);

    var userData = req.body;

    User.authenticate(userData.email, userData.password, function(err, data) {
        if (err) {
            res.status(500).send({success: false});
            console.log("Authentication failed. " + err.message);
        } else {
            res.status(200).send({
                success: true,
                email: data.email,
                username: data.username,
                password: data.password,
                board: data.board
            })
        }
    });

    res.status(500).send({success: false});
};

exports.registerUser = function(req, res) {

    console.log(req.body);

    var userData = req.body;
    var foundUser;

    User.findOne({ email: userData.email }, function (err, user) {
        if (err) {
            console.log("User not found!" + err.message);
        } else {
            foundUser = user;
        }
    });

    if (!foundUser) {

        User.create(userData, function(err, user) {
            if (err) {
                console.log(err.message);
                res.status(500).send({ success: false });
            } else {
                req.session.userId = user._id;
            }
        });

        res.status(200).send({
            success: true
        });

    } else {
        console.log("User with this email is already registered!");
        res.status(500).send({ success: false });
    }
};