// ==UserScript==
// @name         all - Copy Link On Click
// @namespace    Violentmonkey Scripts
// @match        http*://*/*
// @version      2024.01.20.alpha.1
// @description  click links to copy them
// @license      MIT
// @grant        GM_setClipboard
// ==/UserScript==

(function() {

  /***************************************
    File/Update  : https://github.com/icpantsparti2/browser-bits/blob/main/userscript/all_-_copy_link_on_click.user.js
    License (MIT): https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE
  ***************************************
    TODO: this is alpha/experimental and likely to keep changing
  ***************************************
    thanks for the snippet/idea from:
    2022.03.17 https://www.reddit.com/r/userscripts/comments/tf75y6/comment/i0z28um/
    2023.02.14 https://www.reddit.com/r/FirefoxAddons/comments/111h3g4/comment/j8iutou/
    2024.01.17 https://www.reddit.com/r/firefox/comments/198kv0o/
    document.addEventListener('auxclick', event => {
      const closestAElement = event.target.closest('a');
      if (closestAElement && closestAElement.href) {
        event.preventDefault();
        GM_setClipboard(closestAElement.href);
      }
    });
  ***************************************/

  'use strict';

  /* copy link on middle click */
  document.addEventListener('auxclick', event => {
    const closestAElement = event.target.closest('a');
    if (closestAElement && closestAElement.href) {
      event.preventDefault();
      GM_setClipboard(closestAElement.href);
    }
  });

})();
