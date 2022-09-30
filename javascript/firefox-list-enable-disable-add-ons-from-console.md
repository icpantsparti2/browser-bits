## Firefox List/Enable/Disable Add-ons from Console

| File                                   | firefox-list-enable-disable-add-ons-from-console.md                                                                                                                                                                                              |
|:--------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URL                                    | [https://github.com/icpantsparti2/browser-bits/blob/main/javascript/firefox-list-enable-disable-add-ons-from-console.md](https://github.com/icpantsparti2/browser-bits/blob/main/javascript/firefox-list-enable-disable-add-ons-from-console.md) |
| Version                                | 2022.09.30                                                                                                                                                                                                                                       |
| License                                | (MIT) [https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE](https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE)                                                                                     |
| <span style="font-size:2em;">⚠️</span> | * **experimental** for **advanced users**<br>* **backup** your profile ([about:support](about:support) Profile Directory)<br>* **test** in a copy/new profile<br>* use with care **at your own risk**                                            |

### Introduction

- This is only useful if you need another way to toggle Firefox add-ons on/off<br>eg: in bulk, for testing and experimenting
- JavaScript for use in Firefox web console
- There is also an interactive option

### Instructions

- Run the required JavaScript code (copy/paste) in a Firefox console:
    - Web Console *(best way)*
        - open Firefox [about:addons](about:addons) page (Ctrl+Shift+A),<br>the page titled "Manage Your Extensions"
        - open the Web Console (Ctrl+Shift+K or F12/Console)
    - Browser Console *(alternative way)*
        - requires Firefox [about:config](about:config) `devtools.chrome.enabled` set to `true`
        - open the Firefox Browser Console (Ctrl+Shift+J)
- Start by using the first option to get the current add-on state and the **add-on ids** (some other options need the ids)
- Optionally, you could save individual code snippets as a bookmarklet (ie create a bookmark and put the URL as `javascript:` followed by the code), although in this case you cannot click them to run, however you can drag the bookmarklet into the console input box

### Useful Links

- https://firefox-source-docs.mozilla.org/toolkit/mozapps/extensions/addon-manager/AddonManager.html

### Content

- [list your add-ons, **ids** and state](#list-your-add-ons-ids-and-state)
- [list your add-ons as links to their Mozilla Add-ons website page](#list-your-add-ons-as-links-to-their-mozilla-add-ons-website-page)
- [about:addons links for Mozilla add-ons website pages (temporary)](#aboutaddons-links-for-mozilla-add-ons-website-pages-temporary)
- [about:addons compact style (temporary)](#aboutaddons-compact-style-temporary)
- [toggle (enable/disable) add-ons by **id**](#toggle-enabledisable-add-ons-by-id)
- [disable add-ons by **id**](#disable-add-ons-by-id)
- [enable add-ons by **id**](#enable-add-ons-by-id)
- [disable all add-ons](#disable-all-add-ons)
- [enable all add-ons](#enable-all-add-ons)
- [reload active add-ons](#reload-active-add-ons)
- [interactive toggle (enable/disable) add-ons](#interactive-toggle-enabledisable-add-ons)

<hr>

### list your add-ons, **ids** and state

- First, run this code to make an add-ons list in the console

- The list shows: add-on id, +/- *(enabled/disabled)*, name, version

- Suggest you copy/paste/save the list with a text editor for later reference *(right click on the results and "Copy Object")*

- You will need some of these **ids** when using some of the other options

```javascript
/* list your firefox add-ons, ids and state */
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  var list="";
  addons.sort( (a,b) => {
    if (a.isActive > b.isActive) return -1;
    if (a.isActive < b.isActive) return 1;
    return a.name.localeCompare(b.name);
  }).forEach(addon => {
    if(!(addon.isBuiltin||addon.isSystem)) {
      list+=("'"+addon.id+"',").padEnd(45)
        +" /* "+(addon.isActive?"+":"-")
        +" "+addon.name+" ("+addon.version+")"
        //+(addon.creator?" "+addon.creator.name:"")
        +" */\n";
    }
  });
  console.log(list);
});
```

<hr>

### list your add-ons as links to their Mozilla add-ons website page

- Sometimes `https://addons.mozilla.org/firefox/addon/ID` will redirect to the add-on page
- examples: [uBlock0@raymondhill.net](https://addons.mozilla.org/firefox/addon/uBlock0@raymondhill.net) for [ublock-origin](https://addons.mozilla.org/firefox/addon/ublock-origin/) and [{aecec67f-0d10-4fa7-b7c7-609a2db280cf}](https://addons.mozilla.org/firefox/addon/%7Baecec67f-0d10-4fa7-b7c7-609a2db280cf%7D) for [violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)
- you can see the add-on IDs on the `about:support#addons` page
- if you have many add-ons the code below generates a html page of these links
- optionally save the page created with right click "Save Page As..."
- tip: make an account and extensions collection on the Mozilla Add-ons website
- alternatively: see the section below for "about:addons links..."

```javascript
/* list your add-ons as links to their Mozilla Add-ons website page */
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  var list=`<!DOCTYPE html>\n<head>\n<title>add-ons-${
      new Date().toJSON().replace(/[:.]/g,"-")
    }</title>\n</head>\n<body>\n<br>\n`;
  addons.sort( (a,b) => {
    if (a.isActive > b.isActive) return -1;
    if (a.isActive < b.isActive) return 1;
    return a.name.localeCompare(b.name);
  }).forEach(addon => {
    if(!(addon.isBuiltin||addon.isSystem)) {
      list+=
        `&nbsp;<a href="https://addons.mozilla.org/firefox/downloads/latest/${
          encodeURI(addon.id)}" target="_blank">&nbsp;&#11015;&#65039;&nbsp;</a>\n`
        + `&nbsp;<a href="https://addons.mozilla.org/firefox/addon/${
          encodeURI(addon.id)}/versions/" target="_blank">&nbsp;&#127483;&nbsp;</a>\n`
        + `&nbsp;<a href="https://addons.mozilla.org/firefox/addon/${
          encodeURI(addon.id)}/reviews/" target="_blank">&nbsp;&#127479;&nbsp;</a>\n`
        + `&nbsp;<a href="https://addons.mozilla.org/firefox/addon/${
          encodeURI(addon.id)}" target="_blank">${addon.name}</a>&nbsp;&nbsp;${
          addon.version}${(addon.isActive?"":"&nbsp;&nbsp;(disabled)")}\n`
        /* + `${(addon.creator?`&nbsp;&nbsp;(${addon.creator.name})`:"")}` */
        + `<br>\n`;
    }
  });
  list+="<br><br><br>\n</body>\n</html>";
  console.log(list);
  /* console.log(`data:text/html;base64,${btoa(list)}`); */
  window.open(`data:text/html;base64,${btoa(list)}`,'_blank').focus();
});
```


### about:addons links for Mozilla add-ons website pages (temporary)

- show links for the add-on pages at `https://addons.mozilla.org/firefox/addon/...`
- run this in the Web Console (Ctrl+Shift+K) while on the about:addons page
- alternatively: see the section above for "list your add-ons as links..."

```javascript
/* firefox about:addons links for Mozilla add-ons website pages (temporary) */
[...document.querySelectorAll('a[href^="addons:"]')].forEach(a=>{
  a.parentElement.insertAdjacentHTML("beforebegin",`<a href="https://addons.mozilla.org/firefox/addon/${
    encodeURI(a.href.replace(/^addons:\/\/detail\//,''))}" target="_blank">&#128279;&nbsp;</a>`);
});
```

<hr>

### about:addons compact style (temporary)

- re-style the "Manage Your Extensions" page as a narrow line list
- run this in the Web Console (Ctrl+Shift+K) while on the about:addons page
- tip: if you always want a compact style you can use style sheets eg:
    - https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/firefox-style/chrome/userContent.css

```javascript
/* firefox about:addons compact style (temporary) */
[...document.querySelectorAll(".addon.card .addon-icon")]
  .forEach(e => { e.style.width = "18px"; e.style.height = "18px"; });
[...document.querySelectorAll(".addon.card .addon-description")]
  .forEach(e => { e.style.display = "none"; });
[...document.querySelectorAll(".addon.card")]
  .forEach(e => { e.style.margin = "3px"; e.style.padding = 0; });
```

<hr>

### toggle (enable/disable) add-ons by **id**

```javascript
/* toggle firefox add-ons by id */
AddonManager.getAddonsByIDs( [
  'uBlock0@raymondhill.net',                 /* uBlock Origin */
  '{aecec67f-0d10-4fa7-b7c7-609a2db280cf}',  /* Violentmonkey */
] ).then(addons => { addons.forEach(addon => {
  addon.isActive?addon.disable():addon.enable();
}); });
```

### disable add-ons by **id**

```javascript
/* disable firefox add-ons by id */
AddonManager.getAddonsByIDs( [
  'uBlock0@raymondhill.net',                 /* uBlock Origin */
  '{aecec67f-0d10-4fa7-b7c7-609a2db280cf}',  /* Violentmonkey */
] ).then(addons => { addons.forEach(addon => {
  addon.disable();
}); });
```

### enable add-ons by **id**

```javascript
/* enable firefox add-ons by id */
AddonManager.getAddonsByIDs( [
  'uBlock0@raymondhill.net',                 /* uBlock Origin */
  '{aecec67f-0d10-4fa7-b7c7-609a2db280cf}',  /* Violentmonkey */
] ).then(addons => { addons.forEach(addon => {
  addon.enable();
}); });
```

<hr>

### disable all add-ons

```javascript
/* disable all firefox add-ons */
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  addons.forEach(addon => {
    if(!(addon.isBuiltin||addon.isSystem)) { addon.disable(); }
  });
});
```

### enable all add-ons

```javascript
/* enable all firefox add-ons */
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  addons.forEach(addon => {
    if(!(addon.isBuiltin||addon.isSystem)) { addon.enable(); }
  });
});
```

### reload active add-ons

```javascript
/* reload active firefox add-ons */
AddonManager.getActiveAddons(["extension"]).then(({addons}) => {
  addons.forEach(addon => {
    if(!(addon.isBuiltin||addon.isSystem||addon.hidden)) addon.reload();
  });
});
```

<hr>

### interactive toggle (enable/disable) add-ons

- shows a simple popup prompt user interface

- choose the add-ons to toggle or search by names/all/enabled/disabled

- **note:** "line numbers" are used to reference the add-ons, and these will change order (eg if you install/un-install add-ons, etc).  If you need exact ids use the List/Toggle/Disable/Enable code options instead.

- no add-on is toggled until you input the "line number(s)" to toggle

- searching pre-fills the input box with "line numbers" (which you can edit)

- prefix search names with + or - to only list enabled/disabled matches

- entering just either:  -  +  .*  lists disabled/enabled/all add-ons

- examples:  name  name|name.*two   .*   -   +   -name   +name|name.*two

- to run the function enter:  `toggleAddons();`

```javascript
/* interactive firefox add-ons toggle */
var toggleAddons=async function(
  match=/^$/i, filter=false, enabled=null /*boolean*/) {
  var addons,list=[],info="",spacer="",divider="\t\t",choices="";
  /*list*/
  addons=await AddonManager.getAddonsByTypes(["extension"]);
  for(var addon of addons){
    if(!(addon.isBuiltin||addon.isSystem)){
      list.push({'name':addon.name,'version':addon.version,
        'id':addon.id,'isActive':addon.isActive});
    }
  }
  /*sort*/
  list.sort((a,b)=>a.name.localeCompare(b.name));
  /*info*/
  info="**** Toggle Add-ons between enabled/disabled ****\n";
  info+="**** Filter by entering eg: name|foo.*bar - + .* +foo -bar ****\n";
  info+="**** Only toggles when line numbers entered eg 1,2... ****\n";
  if(typeof(DevToolsSocketStatus)=="undefined"){spacer="..";divider="\n"};
  for(var i=0,l=list.length;i<l;i++){
    if((!filter)||(match.test(list[i].name))){
      if( (enabled==null)
        || ((enabled) && (list[i].isActive))
        || ((!enabled) && (!list[i].isActive)) )
      {
        info+='['+(i+1)+']'+spacer+(list[i].isActive?"+":"-")
          +spacer+list[i].name
          +(divider=="\n"?spacer+list[i].version:"")+divider;
        if(match.test(list[i].name)){choices+=(i+1)+","}
      }
    }
  };
  /*choose*/
  choices=prompt(info,choices);
  console.log(choices);
  if(choices && /[^0-9, ]/.test(choices)) {
    /* a search was entered (ie not a number list) */
    if(/^\+/.test(choices)){
      /* eg entered "+ublock" = show enabled matching add-ons */
      toggleAddons(new RegExp(choices.replace(/^\+/,""),"i"),true,true);
    }
    else if(/^-/.test(choices)){
      /* eg entered "-ublock" = show disabled matching add-ons */
      toggleAddons(new RegExp(choices.replace(/^-/,""),"i"),true,false);
    }
    else{
      /* eg entered "ublock" = show matching add-ons */
      toggleAddons(new RegExp(choices,"i"),true);
    }
  }
  else if(choices) {
    /* a number list was entered = toggle add-ons between enabled/disabled */
    for(var choice of choices.replace(/[^0-9]/g,",").split(",")){
      if(choice>0 && choice<=list.length){
        AddonManager.getAddonByID(list[(choice-1)].id).then(addon=>{
          addon.isActive?addon.disable():addon.enable();
          console.log(("'"+addon.id+"',").padEnd(45)+" "
            +("/* "+(addon.isActive?"Enabled":"Disabled")
            +": "+addon.name+" */").padEnd(60)+" // ");
        });
      }
    }
  }
};
toggleAddons();
```

- Advanced Options
  
     - specify parameters if you want certain matches from the start
  
     - toggleAddons(match, filter, enabled);

| Parameter | Value      | Description                                |
| --------- | ---------- | ------------------------------------------ |
| match     | `/regex/i` | match add-on names (to pre-fill input box) |
|           | /^$/i      | (default)                                  |
| filter    | false      | list all add-ons (default)                 |
|           | true       | only list  add-ons with name match         |
| enabled   | null       | show enabled+disabled add-ons (default)    |
|           | false      | only show disabled add-ons                 |
|           | true       | only show enabled add-ons                  |

```javascript
/* advanced options: toggleAddons(match, filter, enabled); */
toggleAddons(/^$/i, false, null); /* default show all toggleAddons(); */
toggleAddons(/ublock/i); /* show all with matches selected */
toggleAddons(/ublock|v.*monkey/i, true); /* show matches */
toggleAddons(/ublock|v.*monkey/i, true, false); /* show disabled matches */
toggleAddons(/ublock|v.*monkey/i, true, true); /* show enabled matches */
```

<hr>
