// Name         : firefox-extensions-list-with-amo-links.js
// Project      : https://github.com/icpantsparti2/browser-bits
// Version      : 2023.04.13
// File/Update  : https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/javascript/firefox-extensions-list-with-amo-links.js
// License (MIT): https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE
//
// You can see a list of your add-ons by going to 'about:support#addons'.
// However, this code lists your extensions without showing dictionary and
// builtin add-ons.  Shows: name, status, version, addons.mozilla.org link.
//
// To run:
//   (1) select and copy the code below
//   (2) open the 'about:addons' page (Ctrl+Shift+A)
//   (3) open the Web Console (Ctrl+Shift+K or F12/Console)
//   (4) paste the code into the input box
//   (5) press Ctrl+<Enter> to execute the code
//   (6) if you need to copy/paste the result use right click and "Copy Object"

javascript:AddonManager.getAddonsByTypes(["extension"]).then(addons=>{var list=`/* (${new Date().toJSON()}) Firefox Extensions List */\n`;addons.sort((a,b)=>{return a.name.localeCompare(b.name)}).forEach(addon=>{if(!(addon.isBuiltin||addon.isSystem)){list+=`${addon.name}\t${addon.isActive}\t${addon.version}\thttps://addons.mozilla.org/firefox/addon/${encodeURI(addon.id)}\n`};});console.log(list);});
