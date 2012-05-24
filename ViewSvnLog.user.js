// ==UserScript==
// @name           ViewSvnLog
// @namespace      taksan
// @description    View svn log in a objective svn URL
// @include        https://svn/svn/*
// ==/UserScript==

main();

function showLog() {
	window.location=document.location.href.replace('//svn/svn/', '//svn/viewvc/')+'?view=log';
}

function main() {
	var buttonnode= document.createElement('input');
	buttonnode.setAttribute('type','button');
	buttonnode.setAttribute('name','showLog');
	buttonnode.setAttribute('value','Go to Log');
	buttonnode.onclick = showLog;

	theBody = document.getElementsByTagName('body')[0];


	theBody.insertBefore(buttonnode, theBody.firstChild);
}


