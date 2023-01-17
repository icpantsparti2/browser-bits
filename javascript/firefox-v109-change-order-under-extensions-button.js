// JavaScript for Mozilla Firefox web console on 'about:addons' page
//
// Name         : firefox-v109-change-order-under-extensions-button.js
// Project      : https://github.com/icpantsparti2/browser-bits
// Version      : 2023.01.16
// File/Update  : https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/javascript/firefox-v109-change-order-under-extensions-button.js
// License (MIT): https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE
// Disclaimer   : Use with care at your own risk
//
// This is only useful when you have a large amount of add-ons and need to
// change the order shown under the "Extensions" (jigsaw piece) button.
// For Firefox v109 onwards (until the UI has a better way to sort them).
//
// This generates a list with more code, which then generates further code for
// setting: Services.prefs.setStringPref("browser.uiCustomization.state"...
//
// To run:
//   (1) open the 'about:addons' page (Ctrl+Shift+A)
//   (2) open the Web Console (Ctrl+Shift+K or F12)
//   (3) copy/paste the code into the Firefox web console and run
//
// What happens:
//   - We do this in three main steps, you have control and are given the
//     old setting value.  The change is only applied when you run step 3.
//     (step 1) - paste the code into the web console and run
//              = this outputs to the console a list of addons/ids with
//                some further JavaScript code
//              - copy the console output (right click, and copy object)
//     (step 2) - keep as alphabetical order (and continue)
//                  - or paste the code into a text editor and change the order
//                    of the add-on name/id lines, then copy back to clipboard
//              - paste the code into the web console and run
//              = this outputs to the console the old (current) and a new
//                value for user preference "browser.uiCustomization.state"
//              - copy the console output (right click, and copy object)
//     note: pinned add-ons might not move (unless you right click unpin them)
//     (step 3) - (you can paste the code into a text editor to check it)
//              - paste the code into the web console and run
//              = this changes the value of "browser.uiCustomization.state"
//              - close and re-open Firefox to see the changes
//     (step 3 variation)
//              - you could alter "Services.prefs.setStringPref" to
//                "user_pref" and add that to a "user.js" file in your Firefox
//                profile folder, restart Firefox for the change to apply
//                then remove the line which you added to the "user.js"

/* step 1 - run to output code listing add-ons and ids */
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  var addonStr="",addonList=[];
  addons.sort((a,b)=>{return a.name.localeCompare(b.name);}).forEach(addon => {
    if(!(addon.isBuiltin||addon.isSystem)) {
      addonStr=`${addon.id.toLowerCase().replace(/[{}@.]/g,"_")}-browser-action`;
      addonList.push(` /* ${addon.name.padEnd(45)} */ '\\\\"${addonStr}\\\\"'`);
    }
  });
  console.log(`/* step 2 - edit addonOrder and run to output pref change code (old+new) */
var addonOrder=[\n   ${addonList.join("\n  ,")}\n];
var prefValue=Services.prefs.getStringPref("browser.uiCustomization.state").replace(/(["\\\\])/g,'\\\\$1');
var oldPref=\`Services.prefs.setStringPref("browser.uiCustomization.state", "\${prefValue}");\`;
var newPref=oldPref.replace(/(^.*,\\\\"unified-extensions-area\\\\":\\\[)[^\\\]]*(\\\],.*$)/, "$1"+addonOrder.join(",")+"$2");
console.log(\`/* step 3 - run to apply new pref value, then please restart Firefox */\\n\\n// old\\n// \${oldPref}\\n\\n// new\\n\${newPref}\\n\`);\n`);
});
