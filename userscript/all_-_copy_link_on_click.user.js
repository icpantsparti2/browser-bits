// ==UserScript==
// @name         all - Copy Link On Click
// @namespace    Violentmonkey Scripts
// @match        http*://*/*
// @version      2024.01.21
// @description  click links to copy them (see NOTES below)
// @license      MIT
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// ==/UserScript==

(function() {

  /***************************************
    File/Update  : https://github.com/icpantsparti2/browser-bits/blob/main/userscript/all_-_copy_link_on_click.user.js
    License (MIT): https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE
  ***************************************
    NOTES: - this is alpha/experimental and may keep changing
           - the links array is only for current web page and
             lost on page change, refesh, close, etc
           - **** if using the non-cumulative copy options remember to ****
             **** use a "Copy:Array|..." option before any page change ****
           - options are under the UserScript Extension toolbar button
  ***************************************
    thanks for the snippet/idea from:
    2022.03.17 https://www.reddit.com/r/userscripts/comments/tf75y6/comment/i0z28um/
    2023.02.14 https://www.reddit.com/r/FirefoxAddons/comments/111h3g4/comment/j8iutou/
    2024.01.17 https://www.reddit.com/r/firefox/comments/198kv0o/
    // copy link on middle click
    document.addEventListener('auxclick', event => {
      const closestAElement = event.target.closest('a');
      if(closestAElement && closestAElement.href) {
        event.preventDefault();
        GM_setClipboard(closestAElement.href);
      }
    });
  ***************************************/

  'use strict';

  /***************************************
    Initial
  ***************************************/

  var linksArray=[];

  function addSourceToLinksArray() {
    linksArray.push( {
      url: window.location.href,
      name: document.title?document.title:window.location.href,
      nameMerged: document.title?document.title:window.location.href,
      duplicatedUrl: false,
      duplicatedUrlAndName: false,
      date: `${new Date().toJSON()}`  /* only set for source page */
    } );
  }

  addSourceToLinksArray();

  function setLinkHoverCSS(enable=true) {
    var css=""
    if(enable) {
      css=`a:hover {
        box-shadow:
          -2px -2px Yellow, 2px 2px OrangeRed,
          -4px -4px 5px OrangeRed, 4px 4px 5px Yellow,
          -2px -2px Yellow inset, 2px 2px OrangeRed inset,
          -4px -4px 5px OrangeRed inset, 4px 4px 5px Yellow inset
              !important;
      }`;
    }
    else {
      css=`a:hover {
        box-shadow: initial !important;
      }`;
    }
    GM_addStyle(css);
  }

  /***************************************
    Event Handlers
  ***************************************/

  function addToLinksArray(event) {
    const closestAElement = event.target.closest('a');
    if(closestAElement && closestAElement.href) {
      event.preventDefault();
      // check if seen before
      let name=closestAElement.innerText?closestAElement.innerText:closestAElement.href
      let duplicatedUrl=false
      let duplicatedUrlAndName=false
      let dupIndex=linksArray.map(x=>{return x.url;}).indexOf(closestAElement.href)
      if(dupIndex > -1) {
        duplicatedUrl=true;
        if(linksArray.filter(x=>{
            if(x.url==closestAElement.href) return true;
            return false;
          }).map(x=>{return x.name;}).indexOf(name)>-1)
        {
          duplicatedUrlAndName=true;
        }
        else {
          linksArray[dupIndex].nameMerged+=' // '+name;
        }
      }
      // add to array
      linksArray.push( {
        url: closestAElement.href,
        // .innerHTML (.innerText || .textContent)
        name: name,
        nameMerged: name,
        duplicatedUrl: duplicatedUrl,
        duplicatedUrlAndName: duplicatedUrlAndName,
        date: ""  /* only set for source page */
      } );
    }
  }

  function addToLinksArrayAndCopy(event) {
    addToLinksArray(event);
    copyLinksArrayLastEntry();
  }

  function addToLinksArrayAndCopyAsMarkdown(event) {
    addToLinksArray(event);
    copyLinksArrayLastEntryAsMarkdown();
  }

  function addToLinksArrayAndCumulativeCopy(event) {
    addToLinksArray(event);
    copyLinksArrayAsUrl();
  }

  function addToLinksArrayAndCumulativeCopyAsMarkdown(event) {
    addToLinksArray(event);
    copyLinksArrayAsMarkdown();
  }

  function preventLink(event) {
    const closestAElement = event.target.closest('a');
    if(closestAElement && closestAElement.href) {
      event.preventDefault();
    }
  }

  /***************************************
    Event Listeners
  ***************************************/
  
  function setLinkClickEvent(
    enable=true,           // true (addEventListener)  false (removeEventListener)
    mode='cumulative-md',  // array  copy  copy-md  cumulative  cumulative-md
    clickType='auxclick'   // click  dblclick  auxclick
  ) {
    if(clickType=="dblclick"){
      // prevent click when double click
      enable?document.addEventListener('click', preventLink)
            :document.removeEventListener('click', preventLink);
    }
    switch(mode) {
      case "array":
        enable?document.addEventListener(clickType, addToLinksArray)
              :document.removeEventListener(clickType, addToLinksArray);
        break;
      case "copy":
        enable?document.addEventListener(clickType, addToLinksArrayAndCopy)
              :document.removeEventListener(clickType, addToLinksArrayAndCopy);
        break;
      case "copy-md":
        enable?document.addEventListener(clickType, addToLinksArrayAndCopyAsMarkdown)
              :document.removeEventListener(clickType, addToLinksArrayAndCopyAsMarkdown);
        break;
      case "cumulative":
        enable?document.addEventListener(clickType, addToLinksArrayAndCumulativeCopy)
              :document.removeEventListener(clickType, addToLinksArrayAndCumulativeCopy);
        break;
      case "cumulative-md":
        enable?document.addEventListener(clickType, addToLinksArrayAndCumulativeCopyAsMarkdown)
              :document.removeEventListener(clickType, addToLinksArrayAndCumulativeCopyAsMarkdown);
        break;
    }
  }

  /***************************************
    Menu Handlers
  ***************************************/

  function disableLinkClickEvents() {
    ['array','copy','copy-md','cumulative','cumulative-md'].forEach(mode=>{
      ['click','dblclick','auxclick'].forEach(clickType=>{
        setLinkClickEvent(false, mode, clickType);
      });
    });
    setLinkHoverCSS(false);
  }

  function enableAddLinkToArrayOnClick() {
    setLinkClickEvent(true, 'array', 'click')
    setLinkHoverCSS(true);
  }
  function enableAddLinkToArrayOnDoubleClick() {
    setLinkClickEvent(true, 'array', 'dblclick')
    setLinkHoverCSS(true);
  }
  function enableAddLinkToArrayOnMiddleClick() {
    setLinkClickEvent(true, 'array', 'auxclick')
    setLinkHoverCSS(true);
  }

  function enableCopyLinkOnClickAsUrl() {
    setLinkClickEvent(true,'copy','click');
    setLinkHoverCSS(true);
  }
  function enableCopyLinkOnDoubleClickAsUrl() {
    setLinkClickEvent(true,'copy','dblclick');
    setLinkHoverCSS(true);
  }
  function enableCopyLinkOnMiddleClickAsUrl() {
    setLinkClickEvent(true,'copy','auxclick');
    setLinkHoverCSS(true);
  }

  function enableCopyLinkOnClickAsMarkdown() {
    setLinkClickEvent(true,'copy-md','click');
    setLinkHoverCSS(true);
  }
  function enableCopyLinkOnDoubleClickAsMarkdown() {
    setLinkClickEvent(true,'copy-md','dblclick');
    setLinkHoverCSS(true);
  }
  function enableCopyLinkOnMiddleClickAsMarkdown() {
    setLinkClickEvent(true,'copy-md','auxclick');
    setLinkHoverCSS(true);
  }

  function enableCumulativeCopyLinkOnClickAsUrl() {
    setLinkClickEvent(true, "cumulative", 'click');
    setLinkHoverCSS(true);
  }
  function enableCumulativeCopyLinkOnDoubleClickAsUrl() {
    setLinkClickEvent(true, "cumulative", 'dblclick');
    setLinkHoverCSS(true);
  }
  function enableCumulativeCopyLinkOnMiddleClickAsUrl() {
    setLinkClickEvent(true, "cumulative", 'auxclick');
    setLinkHoverCSS(true);
  }

  function enableCumulativeCopyLinkOnClickAsMarkdown() {
    setLinkClickEvent(true, "cumulative-md", 'click');
    setLinkHoverCSS(true);
  }
  function enableCumulativeCopyLinkOnDoubleClickAsMarkdown() {
    setLinkClickEvent(true, "cumulative-md", 'dblclick');
    setLinkHoverCSS(true);
  }
  function enableCumulativeCopyLinkOnMiddleClickAsMarkdown() {
    setLinkClickEvent(true, "cumulative-md", 'auxclick');
    setLinkHoverCSS(true);
  }

  /***************************************
    Text String Functions
  ***************************************/

  function escapeHTML(str) {
    return (str+'')
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function escapeMD(str) {
    return (str+'').replace(/[_*\[\]\(\)]/g, "\\$&");
  }

  function tidyLinkName(str) {
    return (str+'')
      .replace(/^[ \t\r\n]+/g,"")
      .replace(/[ \t\r\n]+$/g,"")
      .replace(/[\r\n]+/g," -- ")
      .replace(/[ \t]+/g," ");
  }

  function domainNameFromUrl(str) {
    if(/^(http|https):/.test(str)) {
      str=(str+'')
        .replace(/^[a-z]+:\/\//,"").replace(/\/.*$/,"")
        .replace(/^(www|old|mobile|m|mbasic|en)\./,"");
    }
    else {
      str=(str+'').replace(/:.*$/,"");
      if(str) str=`(${str})`;
    }
    if(str) str=`${str} - `;
    return str;
  }

  /***************************************
    Copy/Clear Cumulative Links
  ***************************************/

  function copyLinksArrayLastEntry() {
    GM_setClipboard(linksArray[linksArray.length-1].url);
  }

  function copyLinksArrayLastEntryAsMarkdown() {
    let domain=domainNameFromUrl(linksArray[linksArray.length-1].url);
    let name=tidyLinkName(linksArray[linksArray.length-1].name);
    GM_setClipboard(`1. [${escapeMD(`${domain}${name}`)}](${linksArray[linksArray.length-1].url})`);
  }

  function copyLinksArrayAsUrl() {
    GM_setClipboard(linksArray.filter(x=>{
      if(x.duplicatedUrl) return false;
      // if(x.date=="") return true;
      // return false;
      return true;
    }).map(x=>{
      if(x.date=="") {
        return x.url;
      }
      else {
        return `// [${x.date}] ${x.url}`;
      }
      
    }).join("\n")+"\n");
  }

  function copyLinksArrayAsMarkdown() {
    GM_setClipboard(linksArray.filter(x=>{
      if(x.duplicatedUrl) return false;
      // if(x.duplicatedUrlAndName) return false;
      return true;
    }).map(x=>{
      let domain=domainNameFromUrl(x.url);
      let name=tidyLinkName(x.nameMerged);
      if(x.date=="") {
        return `    1. [${escapeMD(`${domain}${name?name:x.url}`)}](${x.url})`;
      }
      else {
        return `1. [${escapeMD(`${domain}${name?name:x.url} [${x.date}]`)}](${x.url})`;
      }
    }).join("\n")+"\n");
  }

  function clearLinksArray() {
    linksArray=[];
    addSourceToLinksArray();
  }

  /***************************************
    Menu Options (UserScript Extension toolbar button)
   **************************************/

  function showMoreOptions() {
    GM_registerMenuCommand("Enable:Copy+|Click|Markdown", enableCumulativeCopyLinkOnClickAsMarkdown);
    GM_registerMenuCommand("Enable:Copy+|Click|URL", enableCumulativeCopyLinkOnClickAsUrl);
    GM_registerMenuCommand("Enable:Copy+|Double Click|Markdown", enableCumulativeCopyLinkOnDoubleClickAsMarkdown);
    GM_registerMenuCommand("Enable:Copy+|Double Click|URL", enableCumulativeCopyLinkOnDoubleClickAsUrl);

    GM_registerMenuCommand("Enable:Copy|Middle Click|Markdown", enableCopyLinkOnMiddleClickAsMarkdown);
    GM_registerMenuCommand("Enable:Copy|Middle Click|URL", enableCopyLinkOnMiddleClickAsUrl);
    GM_registerMenuCommand("Enable:Copy|Click|Markdown", enableCopyLinkOnClickAsMarkdown);
    GM_registerMenuCommand("Enable:Copy|Click|URL", enableCopyLinkOnClickAsUrl);
    GM_registerMenuCommand("Enable:Copy|Double Click|Markdown", enableCopyLinkOnDoubleClickAsMarkdown);
    GM_registerMenuCommand("Enable:Copy|Double Click|URL", enableCopyLinkOnDoubleClickAsUrl);

    GM_registerMenuCommand("Enable:Add|Middle Click", enableAddLinkToArrayOnMiddleClick);
    GM_registerMenuCommand("Enable:Add|Click", enableAddLinkToArrayOnClick);
    GM_registerMenuCommand("Enable:Add|Double Click", enableAddLinkToArrayOnDoubleClick);
  }

  GM_registerMenuCommand("Enable:Copy+|Middle Click|Markdown", enableCumulativeCopyLinkOnMiddleClickAsMarkdown);
  GM_registerMenuCommand("Enable:Copy+|Middle Click|URL", enableCumulativeCopyLinkOnMiddleClickAsUrl);
  GM_registerMenuCommand("Copy:Array|Markdown", copyLinksArrayAsMarkdown);
  GM_registerMenuCommand("Copy:Array|URL", copyLinksArrayAsUrl);
  GM_registerMenuCommand("Disable:Events Enabled", disableLinkClickEvents);
  GM_registerMenuCommand("Clear:Array (page change clears)", clearLinksArray);
  GM_registerMenuCommand("Show More Options", showMoreOptions);

})();
