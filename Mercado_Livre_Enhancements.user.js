// ==UserScript==
// @name        Mercado Livre Enhancements
// @namespace   taksan
// @include     http://*mercadolivre.com.br/*
// @version     1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require		https://raw.github.com/taksan/objective-monkey-utils/master/keyboarNavigation.js
// ==/UserScript==

main();

function main() {
	PREV=$("li.first-child a")
	NEXT=$("li.last-child a")
	addKeyboardNavigation(PREV,NEXT)

	$('#searchResults li').each(function(k,v) {
		var adLink = $(v).find('a').attr('href');
		if (adLink != null) {
		   addActualCity(adLink, $(v).find('li.extra-info-location'));
		}
	})
	$("head").append("<link rel='stylesheet' type='text/css' media='screen' href='http://vip.mlstatic.com/css/core__v304cb972025.gz.css'/>");
	$("head").append("<link rel='stylesheet' type='text/css' media='screen' href='http://search-br.mlstatic.com/search-css/MLB/0.6.97/menu.min,main-v2,listview,bookmarks,mclics,apparel'/>");
}

function addActualCity(url, v) {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: url,
	  onload: function(response) {
	  	  var responseData = $(response.responseText);
		  var actualLocation = responseData.find('dd.where').text().trim();
		  $(v).text(actualLocation)
		  var rep=responseData.find("p.meter")
		  $(v).after(rep)
		  console.log(rep.text())
	  }
	});
}
