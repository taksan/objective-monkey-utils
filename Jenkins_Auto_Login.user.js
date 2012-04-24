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

main()

function main()
{
	if ($('#login-field').text().trim()!='log in') {
		return;
	}

	var credentials = getCredentials();
	if (credentials == null)
		return;
	doLogin(credentials);
}

function doLogin(credentials)
{
	$.post('j_acegi_security_check',
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
		return storePassword();
	}

	return {
		j_username: username,
		j_password: password
	}
}


function storePassword()
{
	var userInput = $("<input type='text' name='jenkins_username'>");
	var passInput = $("<input type='password' name='jenkins_password'>");

	var diagContent = $("<div style='background: white; padding: 10px; border: 1px solid black'> Enter credentials to save:<br/> </div>").
		append("Username:").
		append(userInput).
		append("<br/>").
		append("Password:").
		append(passInput);

	diagContent.dialog({
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
