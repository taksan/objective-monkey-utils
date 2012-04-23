alert('addin');
if ($('#taksan_jiraToolbar') == null) {
	var jiraToolbarSingleton = $('<div id="taksan_jiraToolbar" style="position:fixed;top:5px;left:5px; width: 100%">#####</div>');
	$('body').prepend(jiraToolbarSingleton)

	function addToToolbar(obj)
	{
		alert(obj)
		jiraToolbarSingleton.append(obj);
	}
}
