/**
 * @param req - json which comes to the server
 * @param res
 */
var User = require('../mongodb');

exports.getBoard = function(req, res) {

    // =============== Getting json , which is userInfo in this case ================
    var userInfo = req.body;

    alert("Get board works!");

    res.send({
        success: true
    });
};

exports.registerUser = function(req, res) {

    if (req.body.email &&
        req.body.username &&
        req.body.password) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        if (User.findOne({email: userData.email}, function (err, user) {
            if (err) {
                console.error('ERROR PARSING USER EMAIL: ' ,err.message);
                return false;
            } else {
                console.log();
                return ;
            }
            })
        || User.findOne({username: userData.username}, function (err, user) {
                if (err) {
                    console.error('ERROR PARSING USERNAME: ' ,err.message);
                    return false;
                } else {
                    return true;
                }
            })) {

        }

        // ================== Using schema.create to insert data into the db ==================

        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/profile');
            }
        });
    }
};