
var API_URL = "http://localhost:4000";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            if(callback)
                callback(null, data);
        },
        error: function() {
            if (callback)
                callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getBoard = function (callback) {
    backendGet('/API_backend/getBoard', callback);
}

exports.registerUser = function(userData ,callback) {
    backendPost('/API_backend/registerUser', userData, callback);
}
