// ==UserScript==
// @name Double-click copy link
// @description Double-click copy links them.
// @namespace ale
// @version 2022.03.17
// @include *
// @grant GM_setClipboard
// ==/UserScript==

/***************************************
  2022.03.17 https://www.reddit.com/r/userscripts/comments/tf75y6/comment/i0z28um/
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
		GM_setClipboard(closestAElement.href);
	}
});
