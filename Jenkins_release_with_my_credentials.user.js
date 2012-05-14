// ==UserScript==
// @name        Jenkins release with my credentials
// @namespace   objective
// @description Release the maven project with your credentials
// @include     http://autotelebuild/hudson/job/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require		http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js
// @require     https://raw.github.com/taksan/objective-monkey-utils/master/jiraToolbar.js
// @version     1
// ==/UserScript==

var USERNAME_PROP = 'jenkins_username';
var PASSWORD_PROP = 'jenkins_password';
main()

function main()
{
	if ($('[href$="m2release"]').size()==0) {
		return
	}

	$('head').append('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/black-tie/jquery-ui.css" rel="stylesheet" type="text/css"/>');


	b = $('<input type="button" value="Release with my credentials">').click(function() {
		var credentials = getCredentials();
		if (credentials == null)
			return;

		doRelease(credentials);
     })

	addToToolbar(b)
}

function doRelease(credentials)
{
	m2releaseData = {
		versioningMode: 'auto',
		specifyScmCredentials: "on",
		scmUsername: credentials.j_username,
		scmPassword: credentials.j_password
	}

	$.post('m2release/submit',
 		m2releaseData,
		function(m2releaseData) {
			document.location.reload();
		}
	).error(function(s) { 
		GM_deleteValue(USERNAME_PROP)
		msg = '<span style="color:red">The release failed. Perhaps the password changed?</span>'
		askCredentialsAndStorePassword(msg)
	})
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


function askCredentialsAndStorePassword(extra)
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
	if (extra != null) {
		diagContent.append("<br/>"+extra);
	}

    diagContent.dialog({
			title: 'Enter SCM credentials',
            buttons: {
                "Ok": function() {
                    GM_setValue(USERNAME_PROP, userInput.val());
                    GM_setValue(PASSWORD_PROP, passInput.val());
                    var res = {
                        j_username: userInput.val(),
                        j_password: passInput.val()
                    }

                    $(this).dialog('close')
                    doRelease(res);
                },
                "Cancel": function() {
                    $(this).dialog('close')
                    return null;
                }
            }
        });
	return null;
}
