// ==UserScript==
// @name        Ebay Keyboard Browser
// @namespace   taksan
// @include     http://www.ebay.com/sch/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// ==/UserScript==

$(document).keydown(function(e){
    if (e.keyCode == 37) { 
		if ($(".botpg-prev a").size()==0)
			return false;
  	    document.location=$(".botpg-prev a").attr("href")
        return false;
    }
    if (e.keyCode == 39) { 
		if ($(".botpg-next a").size()==0)
			return false;
  	    document.location=$(".botpg-next a").attr("href")
        return false;
    }
});

$(".ship").each(function (i,v) {
    if ($(v).text().trim()=="Shipping not specified")
       $(v).parent().parent().css("display", "none")
})

$("[itemprop='price']").each(function(k,v){
    itemPrice = parseFloat($(v).text().trim().replace("$",""));
    ship = $(v).parent().find(".ship").text().trim();
    if (ship == "Shipping not specified")
      return;
	if (ship == "Free Shipping")
	   return;
    ship = parseFloat(ship.replace("+$",""))
    total = ship+itemPrice
	total = (total+"").replace(/(\...).*/,"$1")
    $(v).text("($"+total+")"+""+$(v).text())
});

