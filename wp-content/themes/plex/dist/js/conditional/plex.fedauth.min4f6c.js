"use strict";function ajax(e){var t=e.method,n=void 0===t?"GET":t,r=e.url,i=e.data,o=e.raw,a=e.headers,s=void 0===a?{}:a;return new Promise(function(e,t){var a=new window.XMLHttpRequest;a.withCredentials=!0;var l=!1;a.ontimeout=function(){l=!0},a.open(n,r);for(var d in s)a.setRequestHeader(d,s[d]);a.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),a.onreadystatechange=function(){if(l&&t(),4===a.readyState){var n=a.status,r=n>=200&&n<300||304===n,i=a.responseText;if(o)r?e(i):t({status:n,response:i});else{var s=void 0;try{s=JSON.parse(a.responseText)}catch(e){r=!1}r?e(s):t({status:n,json:s})}}},a.send(stringifyParams(_extends({"X-Plex-Client-Identifier":plexClientIdentifier},i)))})}function getByPostMessage(e){var t=$.Deferred();return getPostMessage({url:replaceUrlProtocol(window.location.origin,"https:")+"/service-reflector",data:e,timeout:5e3,onMessage:function(e){!0===e.success?t.resolve(e.data,getStatusText(e.xhr),e.xhr):!1===e.success&&t.reject(e.xhr,getStatusText(e.xhr))}}),t.promise()}function getPostMessage(e){function t(){window.document.body.removeChild(l),window.removeEventListener("message",n),clearTimeout(s)}function n(e){if(e.source===l.contentWindow){var n=void 0;try{n=JSON.parse(e.data)}catch(e){}n&&(o(n),t())}}var r=e.url,i=e.data,o=e.onMessage,a=e.timeout,s=setTimeout(function(){o({success:!1}),t()},a);window.addEventListener("message",n);var l=window.document.createElement("iframe");l.style.display="none",l.src=r+"#"+encodeURIComponent(JSON.stringify({data:i})),window.document.body.appendChild(l)}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};!function(e,t){var n={run:function(n){var r=n.method,i=void 0===r?"GET":r,o=n.url,a=n.data,s=n.raw,l=n.headers,d=void 0===l?{}:l;return new Promise(function(n,r){var l=new t.XMLHttpRequest;l.withCredentials=!0;var u=!1;l.ontimeout=function(){u=!0},l.open(i,o);for(var c in d)l.setRequestHeader(c,d[c]);l.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),l.onreadystatechange=function(){if(u&&r(),4===l.readyState){var e=l.status,t=e>=200&&e<300||304===e,i=l.responseText;if(s)t?n(i):r({status:e,response:i});else{var o=void 0;try{o=JSON.parse(l.responseText)}catch(e){t=!1}t?n(o):r({status:e,json:o})}}};var g=_extends({"X-Plex-Client-Identifier":Plex.getClientIdentifier()},a);l.send(e.param(g))})},getUserAPIPromise:function(t){var n={"X-Plex-Product":"Plex SSO","X-Plex-Client-Identifier":Plex.getClientIdentifier()};return t.headers=_extends({},n,t.headers||{}),e.ajax(t)},minDuration:function(t,n){function r(){var e=(new Date).getTime(),t=Math.max(o-e,0);setTimeout(a,t)}var i=e.Deferred(),o=(new Date).getTime()+n,a=void 0;return t.then(function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];a=function(){return i.resolve.apply(i,t)}},function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];a=function(){return i.reject.apply(i,t)}}),t.then(r,r),i.promise()},maxDuration:function(t,n){var r=e.Deferred(),i=setTimeout(function(){r.reject()},n);return t.then(r.resolve,r.reject).always(function(){clearTimeout(i)}),r.promise()},alwaysResolve:function(t){var n=e.Deferred();return t&&t.then?t.then(n.resolve,n.resolve):n.resolve(t),n.promise()}};t.PlexAjax=n}(jQuery,window),function(e,t){var n={auth:function(){var t=e.Deferred(),n={};if("apple"!==PlexSignIn.getURLHashParams("provider"))return t.resolve();var r=PlexSignIn.getURLHashParams();return void 0===r||"1"!=r.externalFederatedAuthComplete||r.error?t.reject(PlexSignIn.getURLHashParams("error")):void 0===r.id_token?t.reject():PlexAuthFederated.auth({provider:"apple",providerToken:r.id_token},n)}};t.PlexAuthApple=n}(jQuery,window),function(e,t){var n={auth:function(t,n){var r=e.Deferred(),i=PlexUtils.getAPIUrl()+"/api/v2/users/authenticate";return n.authToken&&(t["X-Plex-Token"]=n.authToken),PlexAjax.getUserAPIPromise({url:i,type:"POST",data:t,dataType:"json",xhrFields:{withCredentials:!0}}).done(function(e){r.resolve({authToken:e.authToken,uuid:e.uuid,metricsEvent:e.created?PlexSignUp.SIGN_UP:PlexSignIn.SIGN_IN,metricsMode:t.provider,isFirstRun:n.isFirstRun,response:e})}).then(null,function(e){var t=e&&e.status?e.responseJSON.errors:null;r.reject(t)}),r.promise()}};t.PlexAuthFederated=n}(jQuery,window),function(e,t){var n={providers:[],signIn:null},r={set:function(t){this.sessionAttrs=e.extend(!0,this.sessionAttrs,t)},get:function(){return this.sessionAttrs},reset:function(){this.sessionAttrs=e.extend(!0,this.sessionAttrs,this.defaults)}},i={signin:{title:"Sign In",class:".signin-dynamic"},signup:{title:"Sign Up",class:".signup-dynamic"},reset:{title:"Reset Password",class:".reset-dynamic"}},o=e.extend({name:"SignInPageModel",defaults:{errorMessage:"",myPlexAccessToken:"",providerID:"",providerToken:"",isBusy:!1,isAdditionalAuthNeeded:!1,isAdditionalAuthPassword:!1,isSuccess:!1,additionalAuthEmail:"",additionalAuthProviderIDs:[],ssoEmail:"",ssoMyPlexAccessToken:"",isResetPasswordSubmitted:!1,isResetPasswordError:!1},sessionAttrs:{action:"signin",isModal:!1,isSignUp:!1,redirectWeb:!0,forwardUrl:"",errorMessage:"",myPlexAccessToken:"",providerID:"",providerToken:"",isBusy:!1,isAdditionalAuthNeeded:!1,isAdditionalAuthPassword:!1,isSuccess:!1,additionalAuthEmail:"",additionalAuthProviderIDs:[],ssoEmail:"",ssoMyPlexAccessToken:"",isResetPasswordSubmitted:!1,isResetPasswordError:!1}},r),a=e.extend({name:"FederatedAuthProviderModel",context:["signInPageModel"],rootPropertyName:"provider",sessionAttrs:{isLoading:!0,isError:!1,label:"",providerID:"",providerToken:"",email:""}},r),s={getFormModel:function(e){return i[e]},getFedAuthProviderModel:function(t,r){var i=e.extend(!0,{},a);return void 0!==r?i:(n.providers[t]=e.extend(!0,i,n.providers[t]),n.providers[t])},getSignInModel:function(){var t=e.extend(!0,{},o);return n.signIn=e.extend(!0,t,n.signIn),n.signIn}};t.PlexModel=s}(jQuery,window),function(e,t){var n={SIGN_IN:"signin",maxAttempts:0,totalAttempts:0,isSignedInPage:function(){return location.href.indexOf("sign-in/")>=0},isSignedUpPage:function(){return location.href.indexOf("sign-up/")>=0},getSignInPageURL:function(){return plex_l10n.pages.signin},getSignIUpPageURL:function(){return plex_l10n.pages.signup},isAdditionalAuthNeeded:function(){return PlexModel.getSignInModel().get().isAdditionalAuthNeeded},getBaseForwardURL:function(){return t.location.href.split("#?")[0]},setIsSigninIn:function(e){var t=Plex.isSigninIn();Plex.setIsSigninIn(e),t!==e&&(PlexView.refresh(),PlexTemplating.userStateChanged())},clearURLHashParams:function(e){e=e||t.location.origin+t.location.pathname+t.location.search;var n=e;history.replaceState("",document.title,n)},getURLHashParams:function(e){if(!(t.location.href.indexOf("#?")<0)){var n=t.location.href.split("#?"),r=n[1],i=PlexUtils.getParamsFromStringURL(r);return void 0===e?i:i[e]||!1}},alreadySignedIn:function(){var r=e("[data-remodal-id="+t.modalFedAuth+"]"),i=r.remodal();(void 0===i||"opened"===i.getState()||n.isSignedInPage()||n.isSignedInPage())&&(void 0!==r&&r.length>0&&r.find(".remodal-close").hide(),void 0!==i&&setTimeout(function(){i.close()},500))},signInSSO:function(){"apple"===n.getURLHashParams("provider")?(n.setIsSigninIn(!0),PlexAuthApple.auth().then(function(){n.maxAttempts=3,n.loadSSO()}).fail(function(t){if(n.setIsSigninIn(!1),1044===t[0].code){PlexModel.getSignInModel().set({isAdditionalAuthNeeded:!0}),e(document).trigger("fedaAuthAdditionalAuth")}})):n.loadSSO()},loadSSO:function(){var t=Plex.getAuthInfo("authToken"),r=t&&t.authToken||!1,i={"X-Plex-Product":"Plex SSO","X-Plex-Client-Identifier":Plex.getClientIdentifier()};return PlexAjax.getUserAPIPromise({url:PlexUtils.getAPIUrl()+"/api/v2/users/signin",method:"POST",data:{noGuest:!0,skipAuthentication:!0},headers:i,dataType:"json",xhrFields:{withCredentials:!0}}).then(function(t){var n=PlexModel.getSignInModel(),i="signin";if(r!==t.authToken){var o="0"!==t.rememberExpiresAt;t=e.extend({roles:[]},t),PlexUtils.getParam("signUp")&&"1"==PlexUtils.getParam("signUp")&&(i="signup"),Plex.setAuthInfo(t,o),e(document).trigger("fedAuthStateChange",i)}return n.set({action:i,ssoMyPlexAccessToken:t.authToken,ssoEmail:t.email}),n.get()}).fail(function(e){return Plex.isSigninIn()&&(!n.maxAttempts||n.maxAttempts&&n.totalAttempts>=n.maxAttempts)?n.setIsSigninIn(!1):Plex.isSignedIn()&&Plex.removeAuthInfo(),e}).always(function(){var t=PlexModel.getSignInModel();!Plex.isSignedIn()&&n.totalAttempts<n.maxAttempts?(n.totalAttempts++,setTimeout(function(){n.loadSSO()},500)):e(document).trigger("fedAuthFinished",[{action:t.action}])})}};t.PlexSignIn=n}(jQuery,window),function(e,t){var n={SIGN_OUT:"signout",signOut:function(t){return PlexAjax.getUserAPIPromise({url:PlexUtils.getAPIUrl()+"/api/v2/users/signout",type:"DELETE",dataType:"json",xhrFields:{withCredentials:!0},headers:{"X-Plex-Token":t}}).then(function(e){},function(t){return e.Deferred().reject(t&&t.status?t.responseJSON.errors:[]).promise()})}};t.PlexSignOut=n}(jQuery,window),function(e,t){var n={SIGN_UP:"signup",signUp:function(r,i){return PlexAjax.getUserAPIPromise({url:PlexUtils.getAPIUrl()+"/api/v2/users",type:"POST",data:r,dataType:"json",xhrFields:{withCredentials:!0}}).then(function(e){return t.PlexNewUser=!0,{authToken:e.authToken,uuid:e.uuid,metricsEvent:n.SIGN_UP,metricsMode:"password",isFirstRun:i.isFirstRun,response:e}},function(t){return e.Deferred().reject(t&&t.status?t.responseJSON.errors:[]).promise()})}};t.PlexSignUp=n,t.PlexNewUser=!1}(jQuery,window);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};!function(e,t){function n(n){return function(r,i,a){var s=PlexModel.getSignInModel(),l=i.formData,d=i.options,u=l.providerToken,c=l.password,g=d.providerID,f=(d.forwardUrl,{isBusy:!0,errorMessage:null,providerID:g,providerToken:u});s.set(f),n(l,d,r).then(function(n){var r=n.metricsEvent,i=n.metricsMode,l=n.isFirstRun,d=n.authToken,u=n.uuid,c=n.response;PlexMetrics.track(r,r,{properties:{mode:i,firstRun:l}}),PlexHelpers.trackMetricsEvents();var f=Cookies.get("plex_tv_cj");f&&(f=JSON.parse(f));var P=null;void 0!==f&&void 0!==f.CJEVENT&&(P=f.CJEVENT),t.PLEX_USER_UUID=u,t.PLEX_CJ_EVENT=P,t.PLEX_HAS_CJ_COOKIE=!!f;var p=o[r];p&&PlexMetrics.pushEvent(p),s.set({isSuccess:!0,myPlexAccessToken:d,providerID:g}),void 0!==c.created&&s.set({action:c.created?"signup":"signin"});var m="0"!==c.rememberExpiresAt;c=e.extend({roles:[]},c),Plex.setIsSigninIn(),Plex.setAuthInfo(c,m),void 0!==a&&a(s)}).fail(function(e){var t={isBusy:!1};if(!e||PlexHelpers.isUnrecoverable(e,g))t.errorMessage=PlexHelpers.getSignInErrorMessage(e);else if(PlexHelpers.isRecoverableByClearingProviderAuth(e,g)){var n=PlexModel.getFedAuthProviderModel(g);n.set({providerToken:null}),t.errorMessage=PlexHelpers.getSignInErrorMessage(e)}else!c&&PlexHelpers.isAdditionalAuthNeeded(e)?(t.isAdditionalAuthNeeded=!0,t.isAdditionalAuthPassword=PlexHelpers.isAdditionalAuthPassword(e),t.additionalAuthEmail=PlexHelpers.additionalAuthEmail(e),t.additionalAuthProviderIDs=PlexHelpers.additionalAuthProviderIDs(e)):PlexHelpers.isIgnorable(e)||(t.errorMessage=PlexHelpers.getSignInErrorMessage(e));s.set(t),void 0!==a&&a(s,e)})}}function r(e){var t=Plex.getSignInPage("/?"),n={forwardUrl:e},r=function e(t,n){var r,i=[];for(r in t)if(t.hasOwnProperty(r)){var o=n?n+"["+r+"]":r,a=t[r];i.push(null!==a&&"object"===(void 0===a?"undefined":_typeof(a))?e(a,o):encodeURIComponent(o)+"="+encodeURIComponent(a))}return i.join("&")};PlexSignOut.signOut(Plex.getAuthToken()).always(function(){Plex.removeAuthInfo(),void 0!==e&&(t+=r(n),PlexUtils.redirect(t))})}var i,o=(i={},_defineProperty(i,PlexSignUp.SIGN_UP,"SignUpSuccess"),_defineProperty(i,PlexSignIn.SIGN_IN,"SignInSuccess"),i),a=function(e){return e}({loadProvider:function(e,t){var n=e.options,r=n.providerID,i=PlexModel.getFedAuthProviderModel(r);i.set(_extends({isLoading:!0,isError:!1},PlexAuthFederated.federatedAuthProviders[r])),(0,PlexAuthFederated.LOAD_FEDERATED_AUTH_PROVIDER_HELPERS[r])().then(function(e){i.set(_extends({isLoading:!1,isError:!1},e)),t(r)},function(e){i.set({isLoading:!1,isError:!0}),t(r,e)})},authProvider:function(e,t,r){var i=t.options,o=i.providerID,a=PlexModel.getFedAuthProviderModel(o);return a.set({isLoading:!0}),n(function(){var e=PlexAuthFederated.USE_FEDERATED_AUTH_PROVIDER_HELPERS[o],t=e.apply(void 0,arguments);return t.fail(function(e){a.set({isLoading:!1})}),t})(e,t,r)},signin:n(PlexSignIn.signIn),signup:n(PlexSignUp.signUp),signout:function(e){r(e)},reset:function(e,t,n){var r=PlexModel.getSignInModel();r.set({isBusy:!0,isResetPasswordError:!1}),PlexAjax.minDuration(PlexReset.resetPassword(t.formData),1e3).done(function(){r.set({isResetPasswordSubmitted:!0}),PlexHelpers.trackMetricsEvents()}).fail(function(){r.set({isResetPasswordError:!0})}).always(function(e,t){r.set({isBusy:!1}),n(r,e)})},trackClicks:function(t,n,r){var i={context:e(location).attr("origin")+e(location).attr("pathname")+(r?n+"[modal]":"")};if("signup"!==t&&("signin"!==t||"signup"===n)){var o={reset:"forgotPassword","terms-of-service":"termsOfService","privacy-policy":"privacyPolicy",signin:"signIn"};t=void 0!==o[t]?o[t]:t,PlexMetrics.track("click",t,{properties:i})}}});t.PlexSignInActions=a}(jQuery,window);var _slicedToArray=function(){function e(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();!function(e,t){function n(t,n){var r={fedAuthModal:".modal-fedauth",fedAuthRemodal:".remodal-fedauth",panelLeft:".fedauth-panel-left",panelRight:".fedauth-panel-right",fedAuthTitle:".fedauth-title",fedAuthTitleDesc:".fedauth-title-desc",toggleForm:".toggle-form",fedAuthiFrame:"#fedauth-iFrame",fedAuthWait:".fedauth-wait"};return void 0!==n?r[t]:e(r[t])}function r(t){var r=n("fedAuthModal"),i=n("fedAuthRemodal"),a=n("fedAuthiFrame");o(null,t),a.load(function(){u.slickSignup()}),a.ready(function(){u.slickSignup()}),r.show(),i.find(".remodal-close").fadeIn("slow"),u.isModal&&e(document).on("closed",".remodal-fedauth",function(){e(".signup-hero-inside").slick("unslick")})}function i(e,t){return t=t||!1,t&&(e=e.replace("sign-in/",""),e=e.replace("sign-up/","")),PlexUtils.isLocalDevelopment()&&(e=e.replace("https://www.plex.test",PlexUtils.getDefaultStagingUrl()),e=e.replace(".plex.tv","-www.plex.tv")),e}function o(t,n){var r=PlexModel.getSignInModel();void 0!==t&&t?(t.preventDefault(),n=e(t.currentTarget).hasClass("reset-password")?"reset":e(t.currentTarget).hasClass("signin")?"signin":"signup",PlexSignInActions.trackClicks(n,u.context,u.isModal)):"#resetPassword"===PlexUtils.getURLHash()&&(n="reset");var i=PlexModel.getFormModel(n),o=i.class;r.reset(),PlexModel.getSignInModel().set({action:n,isModal:u.isModal,redirectWeb:!(!u.data.redirectWeb||"0"===u.data.redirectWeb)}),a(o)}function a(e,t){var r=PlexModel.getSignInModel().get(),i=n("panelRight");t=void 0!==t?t:r.action,i.find(".toggable:not("+e+")").addClass("fedoff"),i.find(".toggable"+e).removeClass("fedoff"),i.removeClass(function(e,t){return(t.match(/(^|\s)active-action-\S+/g)||[]).join(" ")}),i.addClass("active-action-"+t),s(!0)}function s(e){l(e,e)}function l(e,t){var r=n("fedAuthTitle"),i=n("fedAuthTitleDesc");r.toggle(e),i.toggle(t)}function d(e,t,n,r){t=void 0!==t&&t,u.start(e,t,n,r)}var u={isCheckout:!1,isModal:!1,context:"signin",iframe:null,formLoaded:[],activeForm:"",isSignPage:!1,data:{redirectWeb:!0},start:function(t,n,i,o){var a=PlexModel.getSignInModel();u.isCheckout=o||!1,u.isModal=n,u.data=e.extend(u.data,i),u.context=t,u.isSignPage=PlexSignIn.isSignedInPage()||PlexSignIn.isSignedUpPage(),a.set({action:t,isModal:u.isModal,forwardUrl:PlexUtils.getParam("forwardUrl"),redirectWeb:!(!u.data.redirectWeb||"0"===u.data.redirectWeb)}),u.authAppiFrame(),e(document).ready(function(){r(t)})},authAppiFrame:function(r){function o(){t.iFrameResize({log:!1,onInit:function(e){e.iframe;Plex.debugLog()&&console.log("Init iFrame")},onMessage:function(e){var t=(e.iframe,e.message);if(Plex.debugLog()&&(console.log("[marketing-site] received message"),console.log(t)),"PUSH_GOOGLE_TAG_MANAGER_DATA"===t.type){Cookies.remove("plex_tv_debug_gtm_event");var n=PlexUtils.getParam("origin")||!1;PlexMetrics.pushEvent(t.event,function(){Plex.debugLog()&&(console.log("Google GTM result"),Plex.debugLog()&&Cookies.set("plex_tv_debug_gtm_event",t.event))},{eventOrigin:n||"marketing"})}}},a),u.formLoaded.push(u.isModal?"fedauth-form-modal":"fedauth-form")}if(r=r||"ready",Plex.isSignedIn()||Plex.isSigninIn())return void(Plex.isSignedIn()&&PlexSignIn.alreadySignedIn());var a=n("fedAuthiFrame","class"),s=PlexModel.getSignInModel(),l=s.get(),d="signup"===l.action?1:0;u.iframe&&(u.iframe=null),u.iframe=t.document.createElement("iframe");var c=l.forwardUrl,g=t.location.href;!PlexUtils.getParam("fwdUrl")&&u.isSignPage?(g=PlexUtils.setURLParameter(g,"forwardUrl",""),g=PlexUtils.setURLParameter(g,"fwdUrl",c)):PlexUtils.getParam("fwdUrl")&&s.set({forwardUrl:decodeURIComponent(PlexUtils.getParam("fwdUrl"))}),g=PlexUtils.setURLParameter(g,"signUp",d),g=i(g);var f=PlexUtils.getParam("guestToken")||!1,P={enableSignInWithApple:1,skipLanding:1,signUp:d,forwardUrl:g,externalFederatedAuthCompleteUrl:g,clientID:Plex.getClientIdentifier(),"context[device][product]":"Plex SSO",redirect_uri:PlexSignIn.getURLHashParams("redirect_uri")||"",provider:PlexSignIn.getURLHashParams("provider")||"",state:PlexSignIn.getURLHashParams("state")||"",id_token:PlexSignIn.getURLHashParams("id_token")||"",code:PlexSignIn.getURLHashParams("code")||"",externalFederatedAuthComplete:PlexSignIn.getURLHashParams("externalFederatedAuthComplete")||""};if(f&&(P.guestToken=f),parseInt(P.externalFederatedAuthComplete)){var p=PlexUtils.setURLParameter(PlexSignIn.getBaseForwardURL(),"signUp",0);P.forwardUrl=p,P.externalFederatedAuthCompleteUrl=p}if(PlexUtils.getParam("dogfood")&&"fedauth"===PlexUtils.getParam("dogfood")&&(P.forwardUrl="",P.code="MAGIC"),"en_US"!==PlexLanguage.getSelectedLanguageCode()&&(P.language=PlexLanguage.getSelectedLanguageCode()),g){var m=g.split("?");if(m.length>1){var h=new URLSearchParams(m[1]),x=h.entries();P=Object.assign({},P,function(e){var t={},n=!0,r=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value,l=_slicedToArray(s,2),d=l[0],u=l[1];if(!PlexUtils.getParam("dogfood")&&"forwardUrl"===d&&!u)return;t[d]=u}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}return t}(x))}}var v=PlexUtils.buildURLParams(P);Plex.debugLog()&&PlexUtils.getParam("dogfood")&&"fedauth"===PlexUtils.getParam("dogfood")?u.iframe.src="https://webdogfood.plex.tv/auth-form/auth-gtm-forward/index.html?#!?"+v:u.iframe.src=PlexUtils.getWebUrlBase()+"/auth-form/#!?"+v,u.iframe.style="width:100%;height:100%;border:none;margin:0;padding:0;left:0;overflow:hidden;z-index:999999;min-height:750px;",u.iframe.setAttribute("id","fedauth-iFrame"),u.iframe.setAttribute("name","fedauth-iFrame"),Plex.debugLog()&&console.log("Auth forwardUrl = "+P.forwardUrl),u.activeForm="fedauth-form",l.isModal&&(u.activeForm="fedauth-form-modal"),setTimeout(function(){e(document.getElementById(u.activeForm)).closest(".fedauth-panel").find(n("fedAuthWait","class")).remove()},400),document.getElementById(u.activeForm)&&(document.getElementById(u.activeForm).innerHTML="",document.getElementById(u.activeForm).appendChild(u.iframe));var A=n("fedAuthiFrame");"ready"===r?A.ready(function(){o()}):A.load(function(){o()})},slickSignup:function(){try{e(".signup-hero-inside").slick({autoplay:!0,pauseOnHover:!1,dots:!1,arrows:!1,infinite:!0,fade:!0,speed:600,autoplaySpeed:3e3})}catch(e){}}},c={action:"signin",panels:"all"};e(document).on("fedauthModalOpened",function(r,i){i=e.extend(c,i);var o=e("[data-remodal-id="+t.modalFedAuth+"]");if(void 0!==o.attr("data-last-action")&&(i.action=o.attr("data-last-action"),o.removeAttr("data-last-action")),"right"===i.panels){n("getElement").hide()}PlexMetrics.track("view",i.action,{properties:{page:plex_l10n.curr_page+"[modal]"}}),d(i.action,!0,i)}),e(document).on("fedAuthOpened",function(e,t,n){d(t,!1,{},n)}),e(document).ready(function(){e(document).on("fedAuthStateChange",function(e,t){var n=parseInt(PlexUtils.getParam("signUp")),r=PlexModel.getSignInModel().get();PlexSignIn.clearURLHashParams();var o=r.forwardUrl,a="";if(u.isCheckout||o||(PlexUtils.getParam("forward")?"web"===(o=PlexUtils.getParam("forward"))&&(a=PlexUtils.getWebUrl()):PlexUtils.isMobile()&&n?a="/onboard/mobile/":n&&r.redirectWeb&&!PlexUtils.getParam("skipWeb")&&(a=PlexUtils.getWebUrl()),a&&(o=a)),o=decodeURIComponent(i(o,!0)),a||u.isSignPage){o=o||null;var s="signup"===t?500:0;setTimeout(function(){PlexUtils.redirect(o)},s)}}),t.addEventListener("plexLocationChange",function(e){return!(!parseInt(PlexSignIn.getURLHashParams("externalFederatedAuthComplete")||0)&&u.isCheckout)||(!PlexUtils.getParam("plan")&&"register"!==PlexUtils.getParam("step")||(PlexModel.getSignInModel().set({forwardUrl:e.detail.nextLocation}),void u.authAppiFrame("onLoad")))}),e(document).on("fedaAuthAdditionalAuth",function(e){u.authAppiFrame()}),e(document).on("click",".signin:not(.action), .go-signin",function(){return e(this).trigger("fedAuth",[{action:"signin",panels:"all"}]),!1}),e(document).on("click",".signup:not(.action), .go-signup",function(){return e(this).trigger("fedAuth",[{action:"signup",panels:"all",redirectWeb:e(this).data("redirectweb")}]),!1}),e(document).on("click",".signout, .go-signout",function(){return PlexView.loading(),PlexSignInActions.signout(),!1}),e(document).on("click",".signout-other",function(){var t=location.href;return PlexView.loading(),void 0!==e(this).data("forward")&&(t=""),PlexSignInActions.signout(t),!1})})}(jQuery,window);