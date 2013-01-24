function addKeyboardNavigation(PREV,NEXT)
{
	$(document).keydown(function(e){
		var ignore=["INPUT","SELECT","TEXTAREA"];
		var typeOfFocusedComponent=document.activeElement.tagName.toUpperCase().trim();
		if ($.inArray(typeOfFocusedComponent, ignore)>=0)
			return true;
		if (e.keyCode == 37) { 
			if (PREV.size()==0)
				return false;
			document.location=PREV.attr("href")
			return false;
		}
		if (e.keyCode == 39) { 
			if (NEXT.size()==0)
				return false;
			document.location=NEXT.attr("href")
			return false;
		}
	});
}
