/**
 * Created by Janne on 10.11.2014.
 */

$(document).ready(function() {

    // Button functions
    $('#gamecloud-login-button').on('click', Login);
    $('#gamecloud-logout-button').on('click', Logout);

    // Hide the logout
    $('#gamecloud-logged').hide();

});

/**
 * Handles loggin out from the server
 * @constructor
 */
function Logout() {
    // Show the login
    $('#gamecloud-login').show();
    // Empty the fields
    $('#gamecloud-login-username').val("");
    $('#gamecloud-login-password').val("");
    // And hide yourself
    $('#gamecloud-logged').hide();
}

/**
 * Handles logging in to the gamecloud server
 * @constructor
 */
function Login() {
    var json = ReadCredentials();
    SendToServer(json);
}

/**
 * Reads the user credentials from the webpage
 * @returns {JSON} Stringified JSON
 * @constructor
 */
function ReadCredentials() {
    var username = $('#gamecloud-login-username').val();
    var password = $('#gamecloud-login-password').val();
    console.log("Username is:", username, "password is:", password);

    var json = {
        "callType": "loginUser",
        "username": username,
        "password": password
    };

    return JSON.stringify(json);
}

/**
 * Sends the stringified json to server
 * @param {JSON} json the stringified JSON sent to the server
 * @constructor
 */
function SendToServer(json) {
    $.post("http://127.0.0.1:8888/api/1/", json, function (data) {

        if (CheckAuth(data)) {
            // Authentication success
            alert("Login succesfull!");
            // Hide yourself
            $('#gamecloud-login').hide();
            // And show the logged
            $('#gamecloud-logged').show();
            // And set username
            $('#gamecloud-username').text($('#gamecloud-login-username').val());
        } else {
            alert(data);
        }

    });
}

/**
 * Checks for auth results
 * @param {String} authResult The results of the authentication
 * @returns {boolean} depending on whether auth was succesful or not
 * @constructor
 */
function CheckAuth(authResult) {
    return (authResult !== "No such player in the system");
}