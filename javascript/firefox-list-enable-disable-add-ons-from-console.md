## Firefox List/Enable/Disable Add-ons from Console

| File                                   | firefox-list-enable-disable-add-ons-from-console.md                                                                                                                                                                          |
|:--------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL                                    | [https://github.com/icpantsparti2/browser-bits/javascript/firefox-list-enable-disable-add-ons-from-console.md](https://github.com/icpantsparti2/browser-bits/javascript/firefox-list-enable-disable-add-ons-from-console.md) |
| Version                                | 2022.06.27                                                                                                                                                                                                                   |
| License                                | (MIT) [https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE](https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE)                                                                 |
| <span style="font-size:2em;">⚠️</span> | * **experimental** for **advanced users**<br>* **backup** your profile ([about:support](about:support) Profile Directory)<br>* **test** in a copy/new profile<br>* use with care **at your own risk**                        |

### Introduction

- This is only useful if you need another way to toggle Firefox add-ons on/off<br>eg: in bulk, for testing and experimenting
- JavaScript for use in Firefox web console
- There is also an interactive option

### Instructions

* Run the required JavaScript code (copy/paste) in a Firefox console:
  
     - Web Console *(best way)*
       
          - open Firefox [about:addons](about:addons) page (Ctrl+Shift+A),<br>the page titled "Manage Your Extensions"
       
          - open the Web Console (Ctrl+Shift+K or F12/Console)
     * Browser Console *(alternative way)*
       
          * requires Firefox [about:config](about:config) `devtools.chrome.enabled` set to `true`
       
          * open the Firefox Browser Console (Ctrl+Shift+J)

* Use Option (1) first, to get the current add-on state and the **add-on ids**

### Content

- [(1) list add-ons, **ids** and state (enabled/disabled)](#1-list-add-ons-ids-and-state-enableddisabled)
- [(2) about:addons compact style (temporary)](#2-aboutaddons-compact-style-temporary)
- [(3) toggle (enable/disable) add-ons by **id**](#3-toggle-enabledisable-add-ons-by-id)
- [(4) disable add-ons by **id**](#4-disable-add-ons-by-id)
- [(5) enable add-ons by **id**](#5-enable-add-ons-by-id)
- [(6) disable all add-ons](#6-disable-all-add-ons)
- [(7) enable all add-ons](#7-enable-all-add-ons)
- [(8) interactive toggle (enable/disable) add-ons](#8-interactive-toggle-enabledisable-add-ons)

<hr>

### (1) list add-ons, **ids** and state (enabled/disabled)

- First, run this code to make an add-ons list in the console

- The list shows: add-on id, +/- *(enabled/disabled)*, name, version

- Suggest you copy/paste/save the list with a text editor for later reference *(right click on the results and "Copy Object")*

- You will need some of these **ids** when using other options

```javascript
/* list firefox add-ons and ids */
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  var list="";
  addons.sort( (a,b) => {
    if (a.isActive > b.isActive) return -1;
    if (a.isActive < b.isActive) return 1;
    return a.name.localeCompare(b.name);
  } ).forEach( addon => {
    if(!(addon.isBuiltin||addon.isSystem)) {
      list+=("'"+addon.id+"',").padEnd(45)
        +" /* "+(addon.isActive?"+":"-")
        +" "+addon.name+" ("+addon.version+")"
        //+(addon.creator?" "+addon.creator.name:"")
        +" */\n";
    }
  } );
  console.log(list);
} );
```

<hr>

### (2) about:addons compact style (temporary)

- re-style the "Manage Your Extensions" page as a narrow line list

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

### (3) toggle (enable/disable) add-ons by **id**

```javascript
/* toggle firefox add-ons by id */
AddonManager.getAddonsByIDs( [
  'uBlock0@raymondhill.net',                 /* uBlock Origin */
  '{aecec67f-0d10-4fa7-b7c7-609a2db280cf}',  /* Violentmonkey */
] ).then(addons => { addons.forEach( addon => { 
  addon.isActive?addon.disable():addon.enable();
} ); } );
```

### (4) disable add-ons by **id**

```javascript
/* disable firefox add-ons by id */
AddonManager.getAddonsByIDs( [
  'uBlock0@raymondhill.net',                 /* uBlock Origin */
  '{aecec67f-0d10-4fa7-b7c7-609a2db280cf}',  /* Violentmonkey */
] ).then(addons => { addons.forEach( addon => {
  addon.disable();
} ); } );
```

### (5) enable add-ons by **id**

```javascript
/* enable firefox add-ons by id */
AddonManager.getAddonsByIDs( [
  'uBlock0@raymondhill.net',                 /* uBlock Origin */
  '{aecec67f-0d10-4fa7-b7c7-609a2db280cf}',  /* Violentmonkey */
] ).then(addons => { addons.forEach( addon => {
  addon.enable();
} ); } );
```

<hr>

### (6) disable all add-ons

```javascript
/* disable all firefox add-ons */
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  addons.forEach( addon => {
    if(!(addon.isBuiltin||addon.isSystem)) { addon.disable(); }
} ); } );
```

### (7) enable all add-ons

```javascript
/* enable all firefox add-ons */
AddonManager.getAddonsByTypes(["extension"]).then(addons => {
  addons.forEach( addon => {
    if(!(addon.isBuiltin||addon.isSystem)) { addon.enable(); }
} ); } );
```

<hr>

### (8) interactive toggle (enable/disable) add-ons

- shows a simple popup prompt user interface

- choose the add-ons to toggle or search by names/all/enabled/disabled

- **note:** "line numbers" are used to reference the add-ons, and these will change order (eg if you install/un-install add-ons, etc).  If you need persistent ids use the List/Toggle/Disable/Enable code above instead.

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
      list.push({'name':addon.name,'version':addon.version,'id':addon.id,'isActive':addon.isActive});
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
      if((enabled==null)||((enabled)&&(list[i].isActive))||((!enabled)&&(!list[i].isActive))){
        info+='['+(i+1)+']'+spacer+(list[i].isActive?"+":"-")
          +spacer+list[i].name
          +(divider=="\n"?spacer+list[i].version:"")+divider;
        if(match.test(list[i].name)){choices+=(i+1)+","}
      }
    }
  };
  /*choose*/
  choices=prompt(info,choices);
  if(choices && /[^0-9, ]/.test(choices)){
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
  else {
    /* a number list was entered = toggle add-ons between enabled/disabled */
    for(var choice of choices.replace(/[^0-9]/g,",").split(",")){
      if(choice>0 && choice<=list.length){
        AddonManager.getAddonByID(list[(choice-1)].id).then(addon=>{
          addon.isActive?addon.disable():addon.enable();
          console.log((addon.isActive?"Enabled":"Disabled")
            +": "+addon.name+" '"+addon.id+"'");
        })
      }
    }
  }
};
toggleAddons();
```

* Advanced Options
  
     * specify parameters if you want certain matches from the start
  
     * toggleAddons(match, filter, enabled);

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
