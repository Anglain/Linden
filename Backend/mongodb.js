
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    board: {
        type: Array
    }
});

// ============== Authenticate input against database ================
UserSchema.statics.authenticate = function (email, password, callback) {

    User.findOne({ email: email }).exec(function (err, user) {

            if (err) {
                return callback(err);
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};


// ============== Register input against database ================
UserSchema.statics.register = function (email, password, callback) {

    User.findOne({ email: email }).exec(function (err, user) {

        if (err) {
            return callback(err);
        } else if (!user) {
            var newUser = new User ({
                email: email,
                username: 'User',
                password: password,
                board: []
            });

            newUser.save();

            return callback(null, {success : true});
        } else {
            return callback(null, {success : false, message : 'User with this email is already registered.'});
        }
    });
};


// ============ Hashing a password before saving it to the database ==================
UserSchema.pre('save', function (next) {
    var user = this;

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        } else {
            user.password = hash;
            next();
        }
    })
});

var User = mongoose.model('User', UserSchema);

module.exports = User;