### Browser Bits (https://github.com/icpantsparti2/browser-bits)

* ###### | 2023.01.17 (first 2021.08.09) | https://github.com/icpantsparti2/browser-bits/blob/main/README.md | License (MIT): https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE | Disclaimer: Use with care at your own risk, and verify any results |

#### Bits of code/config/info/links for web browsers (mainly Firefox)

Listed below: [links-elsewhere](#links-elsewhere) | [firefox-style](#firefox-style) | [javascript](#javascript) | [firefox-info](#firefox-info) | [other](#other)

* ###### Firefox is amazing (but not perfect), **but** do not let big companies take over the web, use Firefox as much as you can. &nbsp;However, if a site does not work in Firefox (sometimes eg: video conference, bank, healthcare), first try an add-on that spoofs your user agent, then if you must use a secondary browser such as Ungoogled Chromium or Brave. &nbsp;(Avoid the data collecting browsers such as Google/Chrome and Microsoft/Edge).

#### links-elsewhere

| Link | Note |
| :--- | :--- |
| [links-elsewhere.md](https://github.com/icpantsparti2/browser-bits/blob/main/links-elsewhere.md) | Links to other places (browsers, user.js, forums, etc) |
| [links-elsewhere-android.md](https://github.com/icpantsparti2/browser-bits/blob/main/links-elsewhere-android.md) | Links to other places for Android (browsers, etc) |

#### firefox-style

| Link | Note |
| :--- | :--- |
| [chrome/**userChrome.css**](https://github.com/icpantsparti2/browser-bits/blob/main/firefox-style/chrome/userChrome.css)&nbsp;&nbsp;\[[raw](https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/firefox-style/chrome/userChrome.css)\] | eg: tab style, tab min-size, numbered tabs, profile indicator, and more |
| [chrome/**userContent.css**](https://github.com/icpantsparti2/browser-bits/blob/main/firefox-style/chrome/userContent.css)&nbsp;&nbsp;\[[raw](https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/firefox-style/chrome/userContent.css)\] | eg to compact the layout (see more at once) on: about:profiles, about:addons, about:config, about:preferences |
| [1]&nbsp;[chrome_debugger_profile/chrome/**userContent.css**](https://github.com/icpantsparti2/browser-bits/blob/main/firefox-style/chrome_debugger_profile/chrome/userContent.css)&nbsp;&nbsp;\[[raw](https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/firefox-style/chrome_debugger_profile/chrome/userContent.css)\]<br>[2]&nbsp;[chrome_debugger_profile/**user.js**](https://github.com/icpantsparti2/browser-bits/blob/main/firefox-style/chrome_debugger_profile/user.js)&nbsp;&nbsp;\[[raw](https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/firefox-style/chrome_debugger_profile/user.js)\] | highlight file names "userChrome.css" and "userContent.css" when using [Browser Toolbox] [Developer Tools] [Style Editor] |

#### javascript

| Link | Note |
| :--- | :--- |
| [firefox-list-enable-disable-add-ons-from-console.md](https://github.com/icpantsparti2/browser-bits/blob/main/javascript/firefox-list-enable-disable-add-ons-from-console.md) | guide: list/toggle Firefox add-ons on/off using JavaScript in Web Console (based on below) |
| [firefox-toggle-add-ons-from-console.js](https://github.com/icpantsparti2/browser-bits/blob/main/javascript/firefox-toggle-add-ons-from-console.js)&nbsp;&nbsp;\[[raw](https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/javascript/firefox-toggle-add-ons-from-console.js)\] | 'prompt' popup for enable/disable add-ons from console with filter option (single/bulk eg disable all active, enable several in one go) |
| [firefox-v109-change-order-under-extensions-button.js](https://github.com/icpantsparti2/browser-bits/blob/main/javascript/firefox-v109-change-order-under-extensions-button.js)&nbsp;&nbsp;\[[raw](https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/javascript/firefox-v109-change-order-under-extensions-button.js)\] | run in 'about:config' web console, for changing add-on order under extensions button (two options, alphabetical or manual sort) |

#### firefox-info

| Link | Note |
| :--- | :--- |
| [command-line-options.md](https://github.com/icpantsparti2/browser-bits/blob/main/firefox-info/command-line-options.md) | Notes: viewing Firefox command line options/switches |
| [preferences-group-view.md](https://github.com/icpantsparti2/browser-bits/blob/main/firefox-info/preferences-group-view.md) | Notes: view a group of preferences in Firefox about:config |
| [profile-in-a-folder-or-encrypted.md](https://github.com/icpantsparti2/browser-bits/blob/main/firefox-info/profile-in-a-folder-or-encrypted.md) | Notes: run a Firefox profile located in its own folder (or encrypted folder) |

#### other

| Link | Note |
| :--- | :--- |
| project: [firefox-user.js-tool](https://github.com/icpantsparti2/firefox-user.js-tool)<br> open: [userjs-tool.html](https://icpantsparti2.github.io/firefox-user.js-tool/userjs-tool.html) | Interactive view, compare, and more for Firefox user.js (eg view arkenfox user.js in a table) |
| [userjs-tool-aboutconfig-functions.js](https://github.com/icpantsparti2/firefox-user.js-tool/blob/master/userjs-tool-aboutconfig-functions.js)&nbsp;&nbsp;\[[raw](https://raw.githubusercontent.com/icpantsparti2/firefox-user.js-tool/master/userjs-tool-aboutconfig-functions.js)\] | JavaScript functions for find/reset/set of user preferences and values in Firefox/Thunderbird about:config |
