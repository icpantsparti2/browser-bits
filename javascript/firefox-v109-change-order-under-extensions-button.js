// JavaScript for Mozilla Firefox web console on 'about:addons' page
//
// Name         : firefox-v109-change-order-under-extensions-button.js
// Project      : https://github.com/icpantsparti2/browser-bits
// Version      : 2023.03.17
// File/Update  : https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/javascript/firefox-v109-change-order-under-extensions-button.js
// License (MIT): https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE
// Disclaimer   : Use with care at your own risk
//
// This is only useful when you have a large amount of add-ons and need to
// change the order shown under the "Extensions" (jigsaw piece) button.
// For Firefox v109 onwards (until the UI has a better way to sort them,
//   beyond the right click pin/unpin which places them at the top).
//
// To run:
//   (1) open the 'about:addons' page (Ctrl+Shift+A)
//   (2) open the Web Console (Ctrl+Shift+K or F12)
//   (3) copy/paste the code into the Firefox web console and run
//
// There are three options:
//   option 1 (SIMPLE)   add-on alphabetical order (1 step)
//   option 2 (OLD)      with optional manual add-on sort (3 step)
//   option 3 (NEW)      with drag and drop interface
// option 3 will run if you copy and paste this whole file into the console
// (the code for options 1 and 2 is within comments)




// **** option 1 (SIMPLE) **** add-on alphabetical order (1 step)
// What happens:
//     - paste the code into the web console and run
//     = this changes the about:config pref "browser.uiCustomization.state"
//     - the old and new values are output to the console (if you need to
//       keep them: right click, and copy object, paste/save in a text editor)
//     note: pinned add-ons might not move (unless you right click unpin them)
//     - close and re-open Firefox to see the changes
// (if required, code can be saved in a bookmark URL, and dragged to console)
//
/*
javascript:AddonManager.getAddonsByTypes(["extension"]).then(addons=>{var order=[];addons.sort((a,b)=>{return a.name.localeCompare(b.name);}).forEach(addon=>{if(!(addon.isBuiltin||addon.isSystem)){order.push(`"${addon.id.toLowerCase().replace(/[{}@.]/g,"_")}-browser-action"`);}});var oVal=Services.prefs.getStringPref("browser.uiCustomization.state");var nVal=oVal.replace(/(^.*,"unified-extensions-area":\[)[^\]]*(\],.*$)/,"$1"+order.join(",")+"$2");Services.prefs.setStringPref("browser.uiCustomization.state",nVal);console.log(`// old\n// Services.prefs.setStringPref("browser.uiCustomization.state", "${oVal.replace(/(["\\])/g,'\\$1')}");\n\n// new\nServices.prefs.setStringPref("browser.uiCustomization.state", "${nVal.replace(/(["\\])/g,'\\$1')}");\n`);console.log(`// about:config pref "browser.uiCustomization.state" changed, old/new values are shown above, ** please restart Firefox to apply **`);});
*/




// **** option 2 (OLD) **** with optional manual add-on sort (3 step)
// This generates a list with more code, which then generates further code for
// setting: Services.prefs.setStringPref("browser.uiCustomization.state"...
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
//
/* step 1 - run to output code listing add-ons and ids */
/*
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  var addonStr="",addonList=[];
  addons.sort((a,b)=>{return a.name.localeCompare(b.name);}).forEach(addon => {
    if(!(addon.isBuiltin||addon.isSystem)) {
      addonStr=`${addon.id.toLowerCase().replace(/[{}@.]/g,"_")}-browser-action`;
      addonList.push(` /${''}* ${addon.name.padEnd(45)} *${''}/ '\\\\"${addonStr}\\\\"'`);
    }
  });
  console.log(`/${''}* step 2 - edit addonOrder and run to output pref change code (old+new) *${''}/
var addonOrder=[\n   ${addonList.join("\n  ,")}\n];
var prefValue=Services.prefs.getStringPref("browser.uiCustomization.state").replace(/(["\\\\])/g,'\\\\$1');
var oldPref=\`Services.prefs.setStringPref("browser.uiCustomization.state", "\${prefValue}");\`;
var newPref=oldPref.replace(/(^.*,\\\\"unified-extensions-area\\\\":\\\[)[^\\\]]*(\\\],.*$)/, "$1"+addonOrder.join(",")+"$2");
console.log(\`/${''}* step 3 - run to apply new pref value, then please restart Firefox *${''}/\\n\\n// old\\n// \${oldPref}\\n\\n// new\\n\${newPref}\\n\`);\n`);
});
*/




// **** option 3 (NEW) **** with drag and drop interface
// What happens:
//     - paste the code into the web console and run
//     - a list of extensions is shown with alphabetical order
//     - [Get] button: if you want to Get the existing order from
//                     about:config "browser.uiCustomization.state"
//     - drag and drop to arrange the order
//     - [Cancel] button: Cancel (without setting the new order)
//     - [Set] button: Set the new order for "unified-extensions-area"
//                     in about:config "browser.uiCustomization.state"
//                     (after this you must restart Firefox)
//         - the old and new values are output to the console (if you need to
//           keep them: right click, and copy object, paste/save in a text editor)
//         = this changes the about:config pref "browser.uiCustomization.state"
//     note: pinned add-ons might not move (unless you right click unpin them)
//     - close and re-open Firefox to see the changes
//
if ( (typeof(Services) == "undefined") || (typeof(AddonManager) == "undefined")
 || (typeof(AddonManager.getAddonsByTypes) == "undefined") ) {
  console.log("// please run this JavaScript on about:addons page");
}
else {
  AddonManager.getAddonsByTypes(["extension"]).then(addons => {

  // create stylesheet and parent div (plus children: 1 div 3 buttons 1 ol)
  var ceoStyle=document.createElement("style")
  ceoStyle.innerText=`
    #ceo-main { position:fixed; top:0; left:0; z-index:99999;
      min-width:20em; max-width:70vw;
      min-height:3em; max-height:calc(90vh - 5em);
      background-color:DimGray; color:White; overflow:scroll;
      border-top:4em Solid DimGray; border-right:20px Solid DimGray;
      border-bottom:20px Solid DimGray; }
    #ceo-buttons { position:fixed; top:0; left:0;
      background-color:DimGray; color:White; padding:5px;}
    #ceo-buttons button { background-color:Salmon; color:Black; }
    #ceo-buttons button:hover { background-color:White; }
    #ceo-ol { margin:0px; }
    .ceo-li { background-color:Black; color:White; }
    .ceo-li:hover { cursor:grab; background-color:White; color:Black; }
  `;
  document.head.appendChild(ceoStyle)
  var ceoMain=document.createElement("div");
  ceoMain.id="ceo-main";
  document.body.appendChild(ceoMain);
  var ceoButtons=document.createElement("div");
  ceoButtons.id="ceo-buttons";
  ceoMain.appendChild(ceoButtons);
  var ceoSet=document.createElement("button");
  ceoSet.textContent="\u2714 Set";
  ceoSet.title='Set the new order for "unified-extensions-area" in about:config'
    +' "browser.uiCustomization.state" (after this you must restart Firefox)';
  ceoButtons.appendChild(ceoSet);
  var ceoGet=document.createElement("button");
  ceoGet.textContent="\u2248 Get";
  ceoGet.title='Get the existing order from about:config "browser.uiCustomization.state"';
  ceoButtons.appendChild(ceoGet);
  var ceoCancel=document.createElement("button");
  ceoCancel.textContent="\u2718 Cancel";
  ceoCancel.title='Cancel (without setting the new order)';
  ceoButtons.appendChild(ceoCancel);
  var ceoOL=document.createElement("ol");
  ceoOL.id="ceo-ol";
  ceoMain.appendChild(ceoOL);

  // create add-ons list
  var ceoAddonIdStr="",ceoLI;
  addons.sort((a,b)=>{return a.name.localeCompare(b.name);}).forEach(addon => {
    if(!(addon.isBuiltin||addon.isSystem)) {
      ceoAddonIdStr=`${addon.id.toLowerCase().replace(/[{}@.]/g,"_")}-browser-action`;
      ceoLI=document.createElement("li");
      ceoLI.className="ceo-li";
      ceoLI.id=ceoAddonIdStr;
      ceoLI.title=ceoAddonIdStr;
      ceoLI.draggable="true";
      ceoLI.textContent=`${addon.name}`;
      ceoOL.appendChild(ceoLI);
    }
  });

  // drag and drop actions
  // ref: https://stackoverflow.com/questions/12332403/html5-ul-li-draggable
  var ceoList,ceoDrag,ceoDragId,ceoDragIx,ceoDropIx;
  document.addEventListener("dragstart", ({target}) => {
    ceoDrag=target; ceoDragId=target.id;
    ceoList=target.parentNode.children;
    [...ceoList].forEach((e,i)=>{if(e===ceoDrag) ceoDragIx=i;});
  });
  document.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  document.addEventListener("drop", ({target}) => {
    if(target.className == "ceo-li" && target.id !== ceoDragId) {
      ceoDrag.remove(ceoDrag);
      [...ceoList].forEach((e,i)=>{if(e===target) ceoDropIx=i;});
      if(ceoDragIx > ceoDropIx) { target.before(ceoDrag); } else { target.after(ceoDrag); }
    }
  });

  // button actions
  ceoCancel.addEventListener("click", function() {
    document.body.removeChild(ceoMain);
    document.head.removeChild(ceoStyle);
  });
  ceoGet.addEventListener("click", function() {
    var ceoOldPref=Services.prefs.getStringPref("browser.uiCustomization.state");
    var ceoOldOrder=(''
      +ceoOldPref.replace(/(^.*,"TabsToolbar":\[)([^\]]*)(\],.*$)/, "$2")
      +ceoOldPref.replace(/(^.*,"nav-bar":\[)([^\]]*)(\],.*$)/, "$2")
      +ceoOldPref.replace(/(^.*,"unified-extensions-area":\[)([^\]]*)(\],.*$)/, "$2")
    ).split('"');
    [...ceoOldOrder].reverse().forEach(existingId=>{
      ceoList=document.getElementsByClassName("ceo-li");
      ceoDropIx=0;
      ceoDragIx=-1;
      [...ceoList].forEach((e,i)=>{if(e.id===existingId) ceoDragIx=i;});
      if(ceoDragIx>-1){
        ceoDrag=ceoList[ceoDragIx];
        if(ceoList[ceoDropIx].id !== ceoDrag.id){
          ceoDrag.remove(ceoDrag);
          ceoList[ceoDropIx].before(ceoDrag);
        }
      }
    });
  });
  ceoSet.addEventListener("click", function() {
    var ceoNewOrder=[],ceoOldPref,ceoNewPref,ceoOldStr,ceoNewStr;
    ceoList=document.getElementsByClassName("ceo-li");
    [...ceoList].forEach(e=>ceoNewOrder.push(`"${e.id}"`));
    document.body.removeChild(ceoMain);
    document.head.removeChild(ceoStyle);
    ceoOldPref=Services.prefs.getStringPref("browser.uiCustomization.state");
    ceoNewPref=ceoOldPref.replace(
      /(^.*,"unified-extensions-area":\[)([^\]]*)(\],.*$)/,
      "$1"+ceoNewOrder.join(",")+"$3");
    ceoNewStr=ceoOldStr=`Services.prefs.setStringPref("browser.uiCustomization.state", "`;
    ceoOldStr+=`${ceoOldPref.replace(/(["\\])/g,'\\$1')}");`;
    ceoNewStr+=`${ceoNewPref.replace(/(["\\])/g,'\\$1')}");`;
    console.log(`/*old*/ // ${ceoOldStr}\n\n/*new*/ // ${ceoNewStr}\n\n`);
    console.log(`// to copy old/new values: right click "Copy Object" on above`);
    console.log(`// close and re-open Firefox to see the Extension button changes`);
    Services.prefs.setStringPref("browser.uiCustomization.state", ceoNewPref);
  });

});}
