// ==UserScript==
// @name           Jenkins Auto Login
// @namespace      taksan
// @description    	Auto Logins if not logged in
// @include        	http://autotelebuild/hudson/*
// @require        	http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require			http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js
// ==/UserScript==

var USERNAME_PROP = 'jenkins_username';
var PASSWORD_PROP = 'jenkins_password';
$('head').append('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/black-tie/jquery-ui.css" rel="stylesheet" type="text/css"/>');

main()

function main()
{
	if (isLoggedIn()) {
		return;
	}

	var credentials = getCredentials();
	if (credentials == null)
		return;

	doLogin(credentials);
}

function isLoggedIn() {
	return  ($('#login-field').text().trim()!='log in'); 
}

function doLogin(credentials)
{
	$.post('http://autotelebuild/hudson/j_acegi_security_check',
 		credentials,
        function(data) {
                  document.location.reload();
    });
}

function getCredentials()
{
	var username = GM_getValue(USERNAME_PROP, null);
	var password = GM_getValue(PASSWORD_PROP, null);
	if (username == null) {
		return askCredentialsAndStorePassword();
	}

	return {
		j_username: username,
		j_password: password
	}
}


function askCredentialsAndStorePassword()
{
    var userInput = $("<input type='text' name='jenkins_username'>");
    var passInput = $("<input type='password' name='jenkins_password'>");

    var diagContent =
        $("<div></div>").
        append("Username:<br/>").
        append(userInput).
        append("<br/>").
        append("Password:</br>").
        append(passInput);

    diagContent.dialog({
			title: 'Enter jenkins credentials',
            buttons: {
                "Ok": function() {
                    GM_setValue(USERNAME_PROP, userInput.val());
                    GM_setValue(PASSWORD_PROP, passInput.val());
                    var res = {
                        j_username: userInput.val(),
                        j_password: passInput.val()
                    }

                    $(this).dialog('close')
                    doLogin(res);
                },
                "Cancel": function() {
                    $(this).dialog('close')
                    return null;
                }
            }
        });
	return null;
}
