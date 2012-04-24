// ==UserScript==
// @name           Jira Issue Comment Button
// @namespace      taksan
// @description    Adds a comment to the current open issue
// @include        https://jira.objective.com.br/browse/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require        https://raw.github.com/taksan/objective-monkey-utils/master/jiraToolbar.js
// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

main();

function main (){
    var issueId = $('input[name="issueId"]').attr('value')

    var commentDiv = $('<div style="position:fixed;top:35px;left:5px;float: left; width: 800px; background: black"></div>')
    var commentInput = $('<textarea></textarea>')
    var confirmB = $('<input type="button" value="Confirm comment">');
    commentDiv.append(commentInput);
    commentDiv.append(confirmB)

    confirmB.click(function() {
        typedComment = commentInput.val()

        $.post('/secure/AddComment.jspa', 
            { comment: typedComment, id: issueId },
            function(data) {
                document.location.reload();
            });

    })

    var addCommentB = $('<input type="button" value="Add comment">');
	addToToolbar(addCommentB);

    addCommentB.click(function() {
        $('body').prepend(commentDiv);

        commentInput.focus()
    })
}
