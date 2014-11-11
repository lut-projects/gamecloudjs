/**
 * Created by Janne on 10.11.2014.
 */

$(document).ready(function() {

    $('#gamecloud-login-button').on('click', Login);


    function Login() {
        var username = $('#gamecloud-login-username').val();
        var password = $('#gamecloud-login-password').val();
        console.log("Username is:", username, "password is:", password);

        var json = {
            "callType": "loginUser",
            "username": username,
            "password": password
        };

        json = JSON.stringify(json);

        $.post("http://127.0.0.1:8888/api/1/", json, function (data) {

            if (CheckAuth(data)) {
                // Authentication success
                alert("Login succesfull!");
            } else {
                alert(data);
            }

        });

    }

    function CheckAuth(authResult) {
        return (authResult !== "No such player in the system");
    }

});

