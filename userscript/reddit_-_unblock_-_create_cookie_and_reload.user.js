// ==UserScript==
// @name         reddit - unblock (create cookie and reload)
// @namespace    Violentmonkey Scripts
// @match        *://*.reddit.com/*
// @grant        none
// @version      2024.01.08
// @noframes
// @license      MIT License
// @description  for "Blocked" "whoa there, pardner!" cowboy bs
// ==/UserScript==

/*
   NOTES

   File/Update  : https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/userscript/reddit_-_unblock_-_create_cookie_and_reload.user.js
   License (MIT): https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE

   thanks: https://www.reddit.com/r/mullvadvpn/comments/18jbxb2

   if using "Private Browsing" make sure the extension (Violentmonkey/etc) has:
   "Allow" set for "Run in Private Windows"

   Alternatively: add a filter in uBlock Origin/AdGuard:
   reddit.com#%#//scriptlet('set-cookie-reload', 'reddit_session', '0')

   Alternatively: click a bookmarklet, add a bookmark with URL containing:
   javascript:(function(){document.cookie="reddit_session=;Domain=.reddit.com;Path=/;Expires=;Secure=true;SameSite=None";})();
*/

if (document.title === "Blocked") {
  document.cookie="reddit_session=;Domain=.reddit.com;Path=/;Expires=;Secure=true;SameSite=None";
  window.location.reload();
}
