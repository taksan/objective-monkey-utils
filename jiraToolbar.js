function addToToolbar(obj)
{
	var jiraToolbarSingleton = $('#objectiveJiraToolbar');

	if (jiraToolbarSingleton.length == 0) {
		jiraToolbarSingleton = $('<div id="objectiveJiraToolbar" style="position:fixed;top:5px;left:5px; width: 100%"></div>');
		$('body').prepend(jiraToolbarSingleton)
	}

	jiraToolbarSingleton.append(obj);
}
