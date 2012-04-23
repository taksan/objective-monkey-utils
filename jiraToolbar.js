function addToToolbar(obj)
{
	var jiraToolbarSingleton;
	if ($('#taksan_jiraToolbar') == null) {
		jiraToolbarSingleton = $('<div id="taksan_jiraToolbar" style="position:fixed;top:5px;left:5px; width: 100%">#####</div>');
		$('body').prepend(jiraToolbarSingleton)
	}

	jiraToolbarSingleton.append(obj);
}
