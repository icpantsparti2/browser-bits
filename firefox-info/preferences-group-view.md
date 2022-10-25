### Notes: view a group of preferences in Firefox about:config

* ###### | 2022.10.25 ([first 2021.04.16](https://github.com/icpantsparti/firefox-user.js-tool/issues/3)) | https://github.com/icpantsparti2/browser-bits/blob/main/firefox-info/preferences-group-view.md | License (MIT): https://raw.githubusercontent.com/icpantsparti2/browser-bits/main/LICENSE | Disclaimer: Use with care at your own risk, and verify any results |

Viewing groups of preferences is useful when reviewing, troubleshooting, or for toggles.

In newer versions of Firefox, bookmarks of the style `about:config?filter=...` no longer populate the search box,  
they just open `about:config` now.  However, we can style a `about:config?filter=...` bookmark that you 
can open and drag (or copy/paste) the link text into the `about:config` search box...

---

#### Create about:config link/bookmark

Form the link in this style (and optionally bookmark it):

```
about:config?filter=/^\*$|^(webgl\.disabled|media\.peerconnection\.enabled)(;|$)|^$/i
```

---

#### (Optional) Create the link from a list of preferences

Optionally, paste your list of preferences into [Box 4 of userjs-tool.html](https://icpantsparti2.github.io/firefox-user.js-tool/userjs-tool.html?box=a), then click the `[To Group]` button to help create the link.

<details><summary>Note: userjs-tool.html is standard HTML/JavaScript that runs client side</summary>there is no uploading or external dependency/connection other than fetching text files (eg arkenfox user.js from GitHub) initiated by user action (or by specifying url parameters).  It does not directly edit (or read) about:config or user.js, and web browser security ensures that the user controls the load/save of local files.</details>

---

#### Using the link/bookmark

Just open the `about:config` page and paste (or drag) the link into the search box

* Example 1 (open and drag):

    * **open** the `about:config` page<br>
        ie: click on the `about:config...` bookmark

    * **drag** the [(Logo) Firefox]* into the `about:config` search box<br>
      (*the "button" shown in front of the URL address box)

* Example 2 (copy, open, paste):

    * **copy** the link<br>
        ie: right click on the `about:config...` bookmark and choose Copy<br>
        (tip: press and hold the right mouse button release on Copy)

    * **open** the `about:config` page<br>
        ie: click on the `about:config...` bookmark<br>
            or paste the link into the URL box

    * **paste** the link into the `about:config` search box<br>
        (tip: press and hold the right mouse button release on Paste)

* Example 3 (open, copy, paste):

    * **open** the `about:config` page<br>
        ie: click on the `about:config...` bookmark

    * **copy** the link<br>
        ie: right click in the URL box and Copy the link<br>
        (tip: press and hold the right mouse button release on Copy)

    * **paste** the link into the `about:config` search box<br>
        (tip: press and hold the right mouse button release on Paste)

---

#### Examples

These links generate groups of preferences (the text files specified are fetched):

* [prefs from arkenfox troubleshooter.js](https://icpantsparti2.github.io/firefox-user.js-tool/userjs-tool.html?action=togroup&load4=%68ttps://raw.githubusercontent.com/arkenfox/user.js/master/scratchpad-scripts/troubleshooter.js)  (fetches arkenfox troubleshooter.js file from GitHub)

    * eg bookmark named "about:config arkenfox troubleshooter v1.6.3 prefs plus others" containing link:<br>
        (note: use the link above to get the latest list, below is v1.6.3 plus some extra prefs)<br>
        ```
        about:config?filter=/^\*$|^(=====FROM-ARKENFOX-TROUBLESHOOTER-V1.6.3-PLUS-OTHERS=====|accessibility\.force_disabled|privacy\.trackingprotection\.socialtracking\.enabled|privacy\.trackingprotection\.cryptomining\.enabled|privacy\.trackingprotection\.fingerprinting\.enabled|webgl\.disabled|javascript\.options\.ion|javascript\.options\.baselinejit|javascript\.options\.jit_trustedprincipals|=====START-OF-ARKENFOX-TROUBLESHOOTER-PREFS=====|media\.peerconnection\.enabled|network\.cookie\.cookieBehavior|network\.http\.referer\.XOriginPolicy|privacy\.firstparty\.isolate|privacy\.resistFingerprinting|security\.mixed_content\.block_display_content|svg\.disabled|browser\.cache\.offline\.enable|dom\.storage\.enabled|dom\.storageManager\.enabled|dom\.caches\.enabled|dom\.push\.connection\.enabled|dom\.push\.enabled|dom\.push\.serverURL|dom\.serviceWorkers\.enabled|dom\.webnotifications\.enabled|dom\.webnotifications\.serviceworker\.enabled|browser\.display\.use_document_fonts|font\.blacklist\.underline_offset|gfx\.font_rendering\.graphite\.enabled|gfx\.font_rendering\.opentype_svg\.enabled|layout\.css\.font-loading-api\.enabled|browser\.link\.open_newwindow\.restriction|canvas\.capturestream\.enabled|dom\.event\.clipboardevents\.enabled|dom\.event\.contextmenu\.enabled|dom\.IntersectionObserver\.enabled|dom\.popup_allowed_events|full-screen-api\.enabled|intl\.accept_languages|javascript\.options\.asmjs|javascript\.options\.wasm|permissions\.default\.shortcuts|dom\.vr\.enabled|media\.ondevicechange\.enabled|dom\.webaudio\.enabled|media\.autoplay\.default|media\.autoplay\.blocking_policy|browser\.formfill\.enable|signon\.autofillForms|signon\.formlessCapture\.enabled|security\.cert_pinning\.enforcement_level|security\.family_safety\.mode|security\.OCSP\.require|security\.pki\.sha1_enforcement_level|security\.ssl\.require_safe_negotiation|security\.ssl\.treat_unsafe_negotiation_as_broken|security\.ssl3\.dhe_rsa_aes_128_sha|security\.ssl3\.dhe_rsa_aes_256_sha|security\.ssl3\.ecdhe_ecdsa_aes_128_sha|security\.ssl3\.ecdhe_rsa_aes_128_sha|security\.ssl3\.rsa_aes_128_sha|security\.ssl3\.rsa_aes_256_sha|security\.ssl3\.rsa_des_ede3_sha|security\.tls\.enable_0rtt_data|security\.tls\.version\.max|security\.tls\.version\.min|plugin\.default\.state|plugin\.state\.flash|dom\.popup_maximum|geo\.provider\.network\.url|layout\.css\.visited_links_enabled|mathml\.disabled|network\.auth\.subresource-http-auth-allow|network\.http\.redirection-limit|network\.protocol-handler\.external\.ms-windows-store|privacy\.trackingprotection\.enabled|security\.data_uri\.block_toplevel_data_uri_navigations|privacy\.window\.name\.update\.enabled)(;|$)|^$/i
        ```

* [prefs from arkenfox user.js](https://icpantsparti2.github.io/firefox-user.js-tool/userjs-tool.html?at&groups=true)  (fetches arkenfox user.js file from GitHub)

    * you would not bookmark these, you view them using the links shown, and you would enfore them using a [user.js (see arkenfox)](https://github.com/arkenfox/user.js)

---
