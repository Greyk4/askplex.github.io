!function(e,r){"use strict";var o=null,t=null,n=null;"undefined"==typeof PlexPerks&&(r.PlexPerks=function(){var r={$allPerksHTML:null,userID:0,hasPerm:function(){return Plex.isSignedIn()},init:function(){if(Plex.isSignedIn()){var e=Plex.getAuthInfo();r.userID=e.uuid}r.loadUI()},loadUI:function(){o=e(".pp-perks-list .field-spinner"),t=o,n=e(".pp-perks"),e(".perk-status").hide(),n.before(o.show()).hide(),r.getUserCodes(!0)},giveCode:function(n,a,s,i){var l=e(".perk-details .perk-activated",s);i.hide(),o=t.clone(),l.before(o.show()).hide();var d={user_id:r.userID,post_id:n};e.ajax({type:"GET",url:plex_l10n.perks.endpoint.new_code,headers:{"X-WP-Nonce":plex_l10n.perks.rest_token},data:d,success:function(e){e.success&&void 0!==e.data.code?r.trackValidateCode(e.data.code,a,n,s,i):r.noCodeAvailable(s,e.data.errors)},error:function(e){console.error(e)}})},trackValidateCode:function(o,t,n,a,s){var i={"X-Plex-Product":"Plex Web","X-Plex-Token":Plex.getAuthToken(),"X-Plex-Client-Identifier":Plex.getClientIdentifier()};e.ajax({dataType:"json",type:"POST",headers:i,url:PlexUtils.getAPIUrl()+"/api/v2/promos.json",crossDomain:!0,data:{code:o,campaign:t},success:function(e){r.trackCodeWP(o,n,a)},error:function(e){r.noCodeAvailable(a)}})},trackCodeWP:function(t,n,a){var s=e(".perk-details .perk-activated",a),i=e(".perk-promo",a),l=e(".perk-promo-url",a),d={post_id:n,user_id:r.userID,code:t};e.ajax({type:"POST",url:plex_l10n.perks.endpoint.activate_code,headers:{"X-WP-Nonce":plex_l10n.perks.rest_token},data:d,success:function(e){i.html(t),l.attr("href",l.attr("href")+t).removeClass("perk-promo-url"),s.show(),o.hide().remove(),e.success&&r.getUserCodes(!0)},error:function(e){console.error(e)}})},getUserCodes:function(o){if(!Plex.isSignedIn())return void r.displayPerks(o);o=o||!1;var t={"X-Plex-Product":"Plex Web","X-Plex-Token":Plex.getAuthToken(),"X-Plex-Client-Identifier":Plex.getClientIdentifier()};e.ajax({dataType:"json",type:"GET",headers:t,url:PlexUtils.getAPIUrl()+"/api/v2/promos.json",crossDomain:!0,success:function(e){r.populateUserCodes(e,o)},error:function(e){console.error(e)}})},populateUserCodes:function(o,t){t=t||!1,e.each(o,function(r,o){if(e(".pp-perk[data-perk-name="+o.campaign+"]").length){var t=e(".pp-perk[data-perk-name="+o.campaign+"]"),n=e(".remodal[data-perk-name="+o.campaign+"]");e(".perk-get-code",n).remove(),e(".perk-promo",n).text(o.code),e(".perk-promo-url",n).attr("href",e(".perk-promo-url",n).attr("href")+o.code).removeClass("perk-promo-url"),e(".perk-details .perk-activated",n).show(),e(".perk-status",t).addClass("activated").show()}}),r.displayPerks(t)},displayPerks:function(t){o.hide(0,function(){n.show(),t&&(r.$allPerksHTML=e(".pp-perks").html())})},noCodeAvailable:function(t,n){var a=e(".message-error",t);o.fadeOut("fast",function(){n&&"no_codes_available"===n?e(".no_codes_available",a).show():r.hasPerm()?e(".other_error",a).show():e(".auth_error",a).show(),a.show()})},sortCountriesDropdownList:function(r,o){var t=[],n=[];r.find("option").each(function(){n[e(this).val()]=e(this).text()}),o.each(function(r,o){e(o).data("perkCountries").split(";").forEach(function(e){var r=t.findIndex(function(r){return r.country===e});r<0?t.push({country:e,total:1}):t[r].total++})}),t.sort(function(e,r){return e.total>r.total?1:-1}).forEach(function(e){var o=new Option(n[e.country],e.country);r.find('option[value=""]').after(o)}),r.get(0).selectedIndex=0}};return r}()),e(document).ready(function(){PlexPerks.sortCountriesDropdownList(e("#perks-countries"),e(".pp-perk[data-perk-countries]")),e(document).on("change","#perks-countries",function(){e(".promo-null").hide(),e(".pp-perk").show().removeClass("is-hidden"),PlexPerks.$allPerksHTML&&n.html(PlexPerks.$allPerksHTML);var r=e(this).val();r&&(e('.pp-perk:not([data-perk-countries*="'+r+'"])').not(".no-country-filter").remove(),e(".pp-perk:visible").length||e(".promo-null").show())}),e(document).on("click",".button.pp-perks-get-details",function(){PlexPerks.getUserCodes()}),e(document).on("click",".perk-get-code",function(){var r=e(this).closest(".remodal-perks").data("perk"),o=e(this).closest(".remodal-perks").data("perk-name"),t=e(".remodal[data-perk="+r+"]");PlexPerks.giveCode(r,o,t,e(this))})})}(jQuery,window);