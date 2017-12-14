/**
 * @param req - client request
 * @param res - server response
 */
var User = require('../mongodb');

exports.loginUser = function(req, res, next) {
    var userData = req.body;

    if (User.find()) {

        User.create(userData, function(err, user) {
            if (err) {
                return next(error);
            } else {
                req.session.userId = user._id;
            }
        });
    } else if (userData.logemail) {

    }

};

exports.registerUser = function(req, res) {

};