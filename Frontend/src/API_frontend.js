
var API_URL = "http://localhost:4040";

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
            console.log("Success, Ajax POST completed. " + data);
            callback(null, data);
        },
        error: function() {
            console.log("Error." + data);
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.loginUser = function(userData, callback) {
    backendPost('/loginUser', userData, callback);
};

exports.registerUser = function(userData, callback) {
    backendPost('/registerUser', userData, callback);
};
