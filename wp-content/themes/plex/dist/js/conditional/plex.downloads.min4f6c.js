!function(e,a){"use strict";var l=JSON.parse(plex_l10n.downloads.apps_info),o=JSON.parse(plex_l10n.downloads.nas_info),t=JSON.parse(plex_l10n.downloads.pms_info),n=!1,s={page:".page-item-57","plex-media-server":".menu-item-9218","plex-app":".menu-item-4707"},p={pht:"plex-app",pms:"plex-media-server"},d={pms:"pms",pmp:"pht",pmp_alt:"pht",pht:"pht"},r={},i={};"undefined"==typeof PlexDownloads&&(a.PlexDownloads=function(){var l={},o={},t={},c={},h={},m={},f={},u={},x=!1,w=!1,g=!1,v=!1,b=null,P=null,k=!1;return l.displayPMS=function(){e(".tab-plex-app").click()},l.displayApps=function(){e(".tab-plex-media-server").click()},l.setDownloadsAppsData=function(e){m=e},l.setDownloadsExtraPMSData=function(e){f=e},l.setDownloadsExtraNASData=function(e){u=e},l.initDownloadsForms=function(a){void 0===a&&(a="pms");var s=null,p=null,r="";r="pms"===a?".plex-downloads-pms-platform":".plex-downloads-pht-platform",p=d[a],s=e(".plex-"+p+"-modal");var i=e(".plex-form-downloads"),m=e(".plex-downloads-loading");e(r).off("change.plexdownloads").on("change.plexdownloads",function(){l.loadDownloadsReleases(p),v&&l.loadDownloadsReleases(p,"pmp_alt")});var f=function(e,a){("pms"===e||g||w||v)&&("pms"!==e||x)&&(n=!0,a.closest(".tabs-panel").find(".plex-error").hide(),a.show(),m.hide(),i.show(),l.loadDownloadsPlatforms(e),l.loadDownloadsReleases(e),x&&g&&l.setCurrentOS())};s.find("#plex-pass-channel-"+p).change(function(n){b=s.find(r).val(),P=e(r).find(":selected").data("group"),Plex.isSignedIn()?"pms"==a?(o={},x=!1,l.loadDownloads("pms",f)):(t={},c={},h={},w=!1,g=!1,v=!1,l.loadDownloads("pmp",f),l.loadDownloads("pmp_alt",f)):Plex.signInRedirect()}),"pms"==a?l.loadDownloads("pms",f):(l.loadDownloads("pmp",f),l.loadDownloads("pmp_alt",f)),s.find(".toggle-hash-hide").click(function(a){e(a.currentTarget).hide(),k=!1,s.find(".release-hash").hide(),e(".plex-downloads-releases").find(".release-hash").hide(),s.find(".toggle-hash-show").show()}),s.find(".toggle-hash-show").click(function(a){k=!0,e(a.currentTarget).hide(),s.find(".release-hash").show(),e(".plex-downloads-releases").find(".release-hash").show(),s.find(".toggle-hash-hide").show()})},l.setCurrentOS=function(){var t=platform.os.family.toLowerCase(),n=b||PlexUtils.getParam("platform"),d=P||a.location.hash.substring(1),r=d||"plex-media-server",i=null;void 0!==n&&(t=n.toLowerCase().replace(/-/g," ")),"os x"===t&&(t=6==plex_l10n.downloads.products.pmp?"macOS":"mac"),i=t.substr(0,1).toUpperCase()+t.substr(1);var h="";if(e.each(o.computer,function(a,l){if(i.toLowerCase()===a.toLowerCase())return h=a,e(".plex-downloads-pms-platform").val(a),d&&"plex-media-server"!==d||e(".plex-downloads-pms-platform").val(a).trigger("change"),!1}),e.each(c,function(a,l){if(i.toLowerCase()===a.toLowerCase())return h=a,e(".plex-downloads-pht-platform").val(a).trigger("change"),"plex-app"===d&&e(".plex-downloads-pms-platform").val(a).trigger("change"),!1}),h||e.each(m,function(a,l){if(a=a.toLowerCase(),i.toLowerCase()===a)return h=a,e(".plex-downloads-pht-platform").val(a).trigger("change"),!1}),h||e(".plex-downloads-pht-platform").val("").trigger("change"),e(document).on("change.zf.tabs","#download-tabs",function(a,o){var t=o.find("a").attr("href"),n=t.split("#")[1];l.setActiveFooterItem(e(s[n]))}),e(document).on("click",s.page+" li a",function(a){a.preventDefault(),void 0!==e(this).attr("href").split("#")[1]?e(".tab-plex-app").click():e(".tab-plex-media-server").click(),e("html, body").animate({scrollTop:e(".tabs").offset().top},500)}),"plex-app"===d?d="applications":"plex-media-server"===d&&(d="computer"),void 0!==n){void 0!==d&&d||(d=null);var f=null,u="pms";e.each(["pms","pht"],function(a,l){f=e(".plex-downloads-"+l+"-platform"),u=l;var o=f.find("option").filter(function(){var a=e(this).data(),l=e(this).data(),o=!1;return void 0===a||null!==d&&d!==a.group&&d!==a.type||(o=t===l.slug||t===e(this).val().toLowerCase()||i===e(this).val()||n===e(this).val()),o}).val();if(o)return f.val(o).trigger("change"),e(".tab-"+p[u]).click(),!1})}else e(".tab-"+r).click(),l.setActiveFooterItem(e(s[r]));e(".plex-downloads-pms-platform").val()||e(".plex-downloads-pms-platform").val("").trigger("change"),e(".plex-downloads-pht-platform").val()||e(".plex-downloads-pht-platform").val("").trigger("change"),b=null},l.loadDownloads=function(a,l,n){void 0===n&&(n=!1);var s={},p={},m=0,b=null,P=null;void 0!==plex_l10n.downloads.products[a]&&(m=plex_l10n.downloads.products[a]),b=d[a],P=e(".plex-"+b+"-modal"),s["X-Plex-Client-Identifier"]=Plex.getClientIdentifier(),Plex.isSignedIn()&&(Plex.getAuthInfo().subscription.active?P.find("#plex-pass-channel-"+b).is(":checked")&&(s["X-Plex-Token"]=Plex.getAuthToken(),p.channel="plexpass"):P.find(".plex-downloads-ppcheck").hide());var k=function(n){if("pms"==a)return o=n,o.other=f,e.extend(o.nas,u),x=!0,void l(b,P,!1);var s={};for(var p in n)for(var d in n[p])s[d]=n[p][d];"pmp"==a?(e.extend(c,s),g=!0,l(b,P,!1)):"pmp_alt"==a?(h=s,v=!0,l(b,P,!1)):"pht"==a&&(t=s,w=!0,l(b,P,!1))};if(void 0!==p.channel&&"plexpass"===p.channel){if(void 0!==i[m]){var C=i[m];Plex.debugLog()&&console.log("pulled PP channel '"+m+"' from cache")}}else if(void 0!==r[m]){var C=r[m];Plex.debugLog()&&console.log("pulled non PP channel '"+m+"' from cache")}void 0!==C?k(C):e.ajax({type:"GET",headers:s,cache:!1,url:PlexUtils.getAPIUrl()+"/api/downloads/"+m+".json",crossDomain:!0,data:p,success:function(e){void 0!==p.channel&&"plexpass"===p.channel?(i[m]=e,Plex.debugLog()&&console.log("pulled PP channel '"+m+"' from API")):(r[m]=e,Plex.debugLog()&&console.log("pulled non PP channel '"+m+"' from API")),k(e)},error:function(e){console.error("Could not get info for '"+a+"' from server at this time. Error: "+e.status)}})},l.loadDownloadsPlatforms=function(a){var l=".plex-downloads-"+a+"-platform",n=e(l),s=null,p="";"pms"==a?(s=o,p=e("#plex-option-caption-pms").html()):(s={},p=e("#plex-option-caption-pht").html(),Object.keys(c).length&&(s["plex media player"]=c),Object.keys(m).length&&(s.applications=m),Object.keys(t).length&&(s["plex home theater"]=t)),n.html(""),e(l).html(""),n.append(new Option(p,"")),e.each(s,function(l,o){var t=l.substr(0,1).toUpperCase()+l.substr(1),p=l.trim().split(" ").join("-").toLowerCase(),d=p;"pht"==a&&"Computer"==t?(t="Plex Home Theater",d="pht"):"pht"==a&&"Plex media player"==t&&(t="Plex Media Player",d="pmp"),"pht"==a&&"Plex home theater"==t&&(t="Plex Home Theater",d="pht");var r=null;if("pms"===a&&(r=e("<optgroup data-type='"+d+"' data-group='"+p+"' label='"+t+"'></optgroup>")),e.each(s[l],function(l,o){"macos"==o.id&&(o.name="Mac");var s=new Option(o.name,l);e(s).attr("data-slug",o.id).attr("data-group",p).attr("data-group-name",t),"pms"===a?r.append(s):n.append(s)}),"pms"===a){var i=r.find("option");i.sort(function(a,l){var o=e(a).text().toLowerCase(),t=e(l).text().toLowerCase();return e(a).val()&&e(l).val()?o>t?1:o<t?-1:0:0}),r.html("").append(i),n.append(r)}else{var i=n.find("option");i.sort(function(a,l){var o=e(a).text().toLowerCase(),t=e(l).text().toLowerCase();return e(a).val()&&e(l).val()?o>t?1:o<t?-1:0:0}),n.html("").append(i)}})},l.loadDownloadsReleases=function(a,l){l=l||!1;var n=e(".plex-downloads-"+a+"-platform"),s=e(".plex-"+a+"-modal"),p=n.val(),d=null,r=n.find("option:selected"),i=null,f=e(".plex-downloads-"+a+"-platform :selected").data("groupName"),u=e(".plex-downloads-releases"),x=null,w=0,g=null,v="{os}",b=a,P=null,C=null,D=f;l||s.find(".plex-downloads-releasesbutton").hide(),s.find(".unique-release, .toggle-hash").show();if(void 0===f||""==f)return void s.find(".download-tray").hide();if(D=f.toLowerCase(),s.find(".download-tray").show(),"pms"==a)x=o,v=e("#plex-caption-"+a).html();else{if(x={},Object.keys(c).length)if(l){e(".plex-pmp-release").find(".pmp-disclaimer-os").hide(),x["plex media player"]=h,x["plex media player"].MacOS=x["plex media player"].Mac,s=s.find(".plex-pmp-release");var y=p;"MacOS"===p&&(y="macOS"),e(".plex-pmp-release").find(".pmp-disclaimer-os").html(y).show()}else x["plex media player"]=c;Object.keys(m).length&&(x.applications=m),Object.keys(t).length&&(x["plex home theater"]=t),e(".plex-pmp-release").hide(),"plex media player"===D?(v=e("#plex-caption-pmp").html(),b="pmp",l&&e(".plex-pmp-release").show()):"plex home theater"===D?(v=e("#plex-caption-pht").html(),b="pht"):(b="app",v=e("#plex-caption-app").html())}if(u.html(""),P=function(a){var l=e(a.currentTarget),o={url:l.attr("href"),os:l.data("os"),platform:l.data("platform")};PlexMetrics.track("download",l.data("product"),{properties:o}),PlexMetrics.pushEvent("DownloadClick",null,o)},s.find("#name").html(v.replace("{os}",x[D][p].name)),s.find("#requirements").html(x[D][p].requirements),s.find("#version").html(x[D][p].version),s.find("#hash").html(""),void 0!==x[D][p].description&&s.find("#version").html(x[D][p].description),w=x[D][p].release_date,w>0?s.find("#date").html(moment.unix(w).format("LL")):s.find("#date").html(""),e.each(x[D][p].releases,function(a,l){var o='style="display:block;"';k||(o='style="display:none;"'),C=e("<a></a>").attr("href",l.url).data("os",p).data("platform",f).data("product",b).data("product",b).off("click").on("click",P).html(l.label+'<br/><span class="release-hash modal-hash" '+o+">SHA-1 Checksum<br />"+l.checksum+"</span>"),u.append(C)}),x[D][p].releases.length>1){var _=e("button.plex-downloads-releasesbutton.all-platforms"),L=e('button.plex-downloads-releasesbutton[data-platform="'+f.toUpperCase()+'"]'),A=e('[data-os="'+p.toUpperCase()+'"]',L);L.length?s.find(L).show():A.length?s.find(A).show():s.find(_).show(),s.find(".unique-release").hide()}else if(void 0!==x[D][p].app){s.find(".toggle-hash").hide(),g=x[D][p].releases;var O=x[D][p].external_link?"_blank":"_self",S="a.plex-downloads-releasesbutton.releasesbutton-app",I="label";g[0].url&&(g[0].image_markup&&(S="a.plex-downloads-releasesbutton.releasesbutton-app-image",I="image_markup"),s.find(S).attr("target",O).attr("href",g[0].url).data("os",p).data("platform",f).data("product",b).off("click").on("click",P).html(g[0][I]).show()),g[0].icon&&(i=e(g[0].icon),d=i.find("svg").attr("id"),i.addClass("icon-"+d))}else g=x[D][p].releases,s.find("#hash").html(g[0].checksum),s.find("a.plex-downloads-releasesbutton.releasesbutton-build"+(l?"-pmp":"")).attr("href",g[0].url).data("os",p).data("platform",f).data("product",b).data("hash",g[0].checksum).off("click").on("click",P).html(g[0].label).show();if(s.find(".nas-info").hide(),"nas"===D&&(s.find(".nas-info").show(),s.find(".nas-info .extra-info").html(x[D][p].extra_info)),null===i){switch(d=r.length&&r.data("slug")?r.data("slug"):p,d=d.replace(/\s/g,"").toLowerCase()){case"mac":case"macos":d="apple"}i=s.find(".svg-icon-hidden.icon-"+d)}s.find(".plex-sel-icon").removeClass().addClass("plex-sel-icon plex-svg-holder").html(""),i.length&&(s.find(".plex-sel-icon").html(i.html()),s.find(".plex-sel-icon").addClass(i.attr("class")).removeClass("dynamic-icons svg-icon-hidden"))},l.setActiveFooterItem=function(a){e(s.page).find("ul li").removeClass("current-menu-item current_page_item"),a.addClass("current-menu-item current_page_item")},l}()),e(document).ready(function(){PlexView.addAfterRenderHook(function(){PlexDownloads.setDownloadsAppsData(l),PlexDownloads.setDownloadsExtraPMSData(t),PlexDownloads.setDownloadsExtraNASData(o),PlexDownloads.initDownloadsForms("pms"),PlexDownloads.initDownloadsForms("pht"),setTimeout(function(){if(!n)return void e(".plex-downloads-loading").html(e(".plex-error-no-downloads").html())},15e3)}),e(".tooltip-pms-downloads").tooltipster({theme:"tooltipster-shadow",maxWidth:300,interactive:!0,contentAsHTML:!0,trigger:"click",contentCloning:!0,functionAfter:function(a,l){e(l.origin).removeClass("tooltip-active")},functionBefore:function(a,l){a.content(e(".plex-downloads-releases").html()),e(l.origin).addClass("tooltip-active")}})})}(jQuery,window);