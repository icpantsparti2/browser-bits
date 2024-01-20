// ==UserScript==
// @name          Link To Clipboard
// @description   Prevent default opening of links. Double-click or middle-click links to copy them.
// @version       2023.02.14
// @match         https://www.messenger.com/*
// @grant         GM_setClipboard
// ==/UserScript==

/***************************************
  2022.03.17 https://www.reddit.com/r/userscripts/comments/tf75y6/comment/i0z28um/
  2023.02.14 https://www.reddit.com/r/FirefoxAddons/comments/111h3g4/comment/j8iutou/
***************************************/

document.addEventListener('click', event => {
	const closestAElement = event.target.closest('a');
	if (closestAElement && closestAElement.href) {
    event.preventDefault();
	}
});
 
document.addEventListener('dblclick', event => {
	const closestAElement = event.target.closest('a');
	if (closestAElement && closestAElement.href) {
		event.preventDefault();
    GM_setClipboard(closestAElement.href);
	}
});
 
document.addEventListener('auxclick', event => {
	const closestAElement = event.target.closest('a');
	if (closestAElement && closestAElement.href) {
		event.preventDefault();
    GM_setClipboard(closestAElement.href);
	}
});
