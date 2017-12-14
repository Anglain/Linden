var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

var db = mongoose.connection;

db.on('error', function(err) {
    console.log("USER DATABASE CONNECTION ERROR: ", err.message);
});

db.once('open', function(callback) {
    console.log('USER DATABASE CONNECTED.');
});

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;