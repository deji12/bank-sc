/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/modules/custom/mparticle/js/mparticle.js. */
document.addEventListener('InitializeCustomJS',function(e){console.log("Initialize Script: mParticle.js");try{(function($,Drupal,drupalSettings){'use strict';Drupal.mparticle={};$(document).ready(function(){window.mParticle=window.mParticle||{isLoading:false,config:{isDevelopmentMode:drupalSettings.mparticle.mparticle_development_mode,useCookieStorage:true,identityCallback:function(result){customMParticleFunctions.Logger.logDebug("initial identity callback: "+result.httpCode);customMParticleFunctions.Logger.logDebug("initial identity callback: MPID: "+result.getUser().getMPID());var codes=window.mParticle.Identity.HTTPCodes;switch(result.httpCode){case codes.noHttpCoverage:break;case 429:break;case codes.validationIssue:break;case 400:break;case 200:case codes.activeIdentityRequest:case codes.activeSession:customMParticleFunctions.isMParticleActive=true;try{Drupal.pendo.initializeWithVisitorId(result.getUser().getMPID())}catch(error){customMParticleFunctions.Logger.logDebug("Error occurred initializing pendo: "+error)};break;default:};if(result.getUser())customMParticleFunctions.MParticleActions.updateUserAttribute('Acquia Username',drupalSettings.mparticle.user_name)}}};(function(t){if(window.mParticle.isLoading)return;console.log("initalizing mParticle!");window.mParticle.isLoading=true;window.mParticle.EventType={Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)}
function e(e,o){return function(){if(o)e=o+"."+e;var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}};var o=["endSession","logError","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"],n=["setCurrencyCode","logCheckout"],i=["identify","login","logout","modify"];o.forEach(function(t){window.mParticle[t]=e(t)});n.forEach(function(t){window.mParticle.eCommerce[t]=e(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=e(t,"Identity")});var r=document.createElement("script");r.type="text/javascript";r.async=true;r.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c)})(drupalSettings.mparticle.mparticle_api_key);window.mParticle.ready(function(){console.log('mParticle has loaded!');switch(drupalSettings.mparticle.mparticle_log_level){case 0:mParticle.setLogLevel('none');break;case 1:mParticle.setLogLevel('warning');break;case 2:mParticle.setLogLevel('verbose');break;default:mParticle.setLogLevel('warning')};customMParticleFunctions.Integration.bindEvents();var urlParams=new URLSearchParams(window.location.search),pageViewAttributes={url:location.href,source:"Acquia",sessionGuid:mParticle.sessionManager.getSession()};urlParams.forEach(function(value,key){pageViewAttributes[key]=value});var pageViewCustomFlags={};customMParticleFunctions.Logger.logDebug("Logging Page View: "+drupalSettings.mparticle.page_title);mParticle.logPageView(drupalSettings.mparticle.page_title,pageViewAttributes,pageViewCustomFlags);customMParticleFunctions.Integration.setupTimeOnPageEvents()});window.customMParticleFunctions=window.customMParticleFunctions||{debugLogging:drupalSettings.mparticle.mparticle_log_level==2?true:false,isMParticleActive:false,mParticleEventsBound:false,Logger:{logDebug:function(value){if(customMParticleFunctions.debugLogging)console.debug("CustomMParticleFunctions: "+value)}},Helpers:{Selectors:{BLUR:'blur',CHANGE:'change',CLICK:'click'},EventType:{Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8},FormInput:{trackById:function(id,selector,attributeName,key){return{id:"#".concat(id),selector:selector,attributeName:attributeName,key:key}},trackByName:function(name,selector,attributeName,key){return{name:"input[name='".concat(name).concat("']"),selector:selector,attributeName:attributeName,key:key}},bindById:function(tracker,callback){var id=tracker.id,selector=tracker.selector,attributeName=tracker.attributeName,key=tracker.key;customMParticleFunctions.Logger.logDebug("Binding: "+id+" on body");$("body").on(selector,id,function(source){callback(source,attributeName,key)})},bindByIdDirect:function(tracker,callback){var id=tracker.id,selector=tracker.selector,attributeName=tracker.attributeName,key=tracker.key;customMParticleFunctions.Logger.logDebug("Binding: "+id+" directly");$(id).on(selector,function(source){callback(source,attributeName,key)})},bindByName:function(tracker,callback){var name=tracker.name,selector=tracker.selector,attributeName=tracker.attributeName,key=tracker.key;customMParticleFunctions.Logger.logDebug("Binding: "+name);$(name).on(selector,function(source){callback(source,attributeName,key)})},updateWithValueFromKey:function(source,attributeName,key){var value=key in source.target?source.target[key]:"";customMParticleFunctions.MParticleActions.updateUserAttribute(attributeName,value)},updateWithValueFromDropdown:function(source,attributeName){var value=$("#"+source.target.id+" option:selected").text();customMParticleFunctions.MParticleActions.updateUserAttribute(attributeName,value)},updateWithValueFromRadioButton:function(source,attributeName){var id=source.target.id,label=$('#'.concat(id)).prop("labels"),value=$.trim($(label).text());customMParticleFunctions.MParticleActions.updateUserAttribute(attributeName,value)}},InteractionEvent:{trackById:function(id,selector,eventName,eventType){return{id:"#".concat(id),selector:selector,eventName:eventName,eventType:eventType}},bindById:function(tracker){var id=tracker.id,selector=tracker.selector,eventName=tracker.eventName,eventType=tracker.eventType,target=$(id);if(target.is("a")){mParticle.logLink(id,eventName,eventType,{sessionGuid:mParticle.sessionManager.getSession()})}else $(id).on(selector,function(source){customMParticleFunctions.Logger.logDebug("logging event: "+eventName);mParticle.logEvent(eventName,eventType,{sessionGuid:mParticle.sessionManager.getSession()},{})})}},ConsentEvent:{trackById:function(id,selector,consentName,consentValue){return{id:"#".concat(id),selector:selector,consentName:consentName,consentValue:consentValue}},bindById:function(tracker){var id=tracker.id,selector=tracker.selector,consentName=tracker.consentName,consentValue=tracker.consentValue;$(id).on(selector,function(source){var target=$(this);if(target.is("a")){source.preventDefault();var href=this.href;customMParticleFunctions.MParticleActions.sendConsent(consentName,consentValue);setTimeout(function(){window.location.href=href},mParticle.Store.SDKConfig.timeout)}else customMParticleFunctions.MParticleActions.sendConsent(consentName,consentValue)})}}},MParticleActions:{updateUserAttribute:function(attributeName,value){var currentUser=mParticle.Identity.getCurrentUser();if(value){customMParticleFunctions.Logger.logDebug("updating user attribute: "+attributeName+" to "+value);currentUser.setUserAttribute(attributeName,value)}},sendConsent:function(consentName,consentValue){var currentUser=mParticle.Identity.getCurrentUser();customMParticleFunctions.Logger.logDebug("logging consent: "+consentName+" with value: "+consentValue);var consent=mParticle.Consent.createGDPRConsent(consentValue=="true",Date.now(),"",location.href,mParticle.getDeviceId()),consentState=mParticle.Consent.createConsentState();consentState.addGDPRConsentState(consentName,consent);currentUser.setConsentState(consentState)},sendTimeOnPageEvent:function(pageTitle,timeOnPage){customMParticleFunctions.Logger.logDebug("logging time on page event "+pageTitle+"for timeOnPage: "+timeOnPage);var urlParams=new URLSearchParams(window.location.search),timeOnPageAttributes={screen:pageTitle,timeOnPage:timeOnPage,url:location.href,source:"Acquia",sessionGuid:mParticle.sessionManager.getSession()};urlParams.forEach(function(value,key){timeOnPageAttributes[key]=value});mParticle.logEvent("Time on Page",customMParticleFunctions.Helpers.EventType.Other,timeOnPageAttributes,{})},sendOpenAccountDisplayEvent:function(){customMParticleFunctions.Logger.logDebug("logging open account display event.");var urlParams=new URLSearchParams(window.location.search),openAccountDisplayAttributes={url:location.href,source:"Acquia",sessionGuid:mParticle.sessionManager.getSession()};urlParams.forEach(function(value,key){openAccountDisplayAttributes[key]=value});mParticle.logEvent("Viewed Open an Account Information Modal",customMParticleFunctions.Helpers.EventType.Other,openAccountDisplayAttributes,{})},sendRemoteConsent:function(attribute,value,consentName,consentValue,callback){console.log("initialize remote consent");mParticle.Identity.logout({},function(result){if(!result.getUser()){console.error("logout failed:"+result.httpCode);return};var identities={};identities[attribute]=value;var identityRequest={userIdentities:identities};mParticle.Identity.identify(identityRequest,function(result){if(result.getUser()){var currentUser=result.getUser();console.log("logging consent: "+consentName+" with value: "+consentValue);var consent=mParticle.Consent.createGDPRConsent(false,Date.now(),"",location.href,mParticle.getDeviceId()),consentState=mParticle.Consent.createConsentState();consentState.addGDPRConsentState(consentName,consent);currentUser.setConsentState(consentState);var remoteConsentAttrs={url:location.href,source:"Acquia",sessionGuid:mParticle.sessionManager.getSession()};mParticle.logEvent("Remote CSR Consent",customMParticleFunctions.Helpers.EventType.Other,remoteConsentAttrs,{});mParticle.Identity.logout({},function(){console.log("logout success")});callback()}})})},submitLeadForm:function(email,submitSource){var identityRequest={userIdentities:{email:email}};mParticle.Identity.identify(identityRequest,function(result){if(result.getUser()){customMParticleFunctions.Logger.logDebug("logging submit lead from event.");var submitLeadFormAttributes={url:location.href,source:"Acquia",sessionGuid:mParticle.sessionManager.getSession(),email:email,submitSource:submitSource};mParticle.logEvent("Submit Lead Form",customMParticleFunctions.Helpers.EventType.Other,submitLeadFormAttributes,{});try{Drupal.pendo.updateVistiorId(result.getUser().getMPID())}catch(error){customMParticleFunctions.Logger.logDebug("Error occurred updating pendo: "+error)}}else mParticle.logError("Error Getting User. Lead email not submitted")})},listLinkItemClick:function(className,href){try{var id="."+className,eventName="microsite-"+className+"-click-interaction",eventType=customMParticleFunctions.Helpers.EventType.Navigation,clickAttributes={url:location.href,sessionGuid:mParticle.sessionManager.getSession(),link:href,sourceClass:className};customMParticleFunctions.Logger.logDebug("logging event: "+eventName+" "+href);mParticle.logEvent("List Link Item Click",eventType,clickAttributes,{})}catch(ex){console.log("error sending click event.")}}},Integration:{bindEvents:function(){customMParticleFunctions.Logger.logDebug("binding events");if(customMParticleFunctions.mParticleEventsBound){customMParticleFunctions.Logger.logDebug("mParticle events already bound, skipping bindings");return};var interactionEvents=[];drupalSettings.mparticle.interaction_events.forEach(function(interactionEvent){var eventData=interactionEvent.split("|");interactionEvents.push(customMParticleFunctions.Helpers.InteractionEvent.trackById(eventData[0],eventData[1],eventData[2],customMParticleFunctions.Helpers.EventType.Navigation))});interactionEvents.forEach(function(idTracker){customMParticleFunctions.Helpers.InteractionEvent.bindById(idTracker)});var consentEvents=[];drupalSettings.mparticle.consent_events.forEach(function(consentEvent){var eventData=consentEvent.split("|");consentEvents.push(customMParticleFunctions.Helpers.ConsentEvent.trackById(eventData[0],eventData[1],eventData[2],eventData[3]))});consentEvents.forEach(function(idTracker){customMParticleFunctions.Helpers.ConsentEvent.bindById(idTracker)})},setupTimeOnPageEvents:function(){TimeMe.initialize({currentPageName:drupalSettings.mparticle.page_title,idleTimeoutInSeconds:5});drupalSettings.mparticle.time_on_page_events.forEach(function(timeOnPageEvent){var eventData=timeOnPageEvent.split("|");if(eventData[0]==drupalSettings.mparticle.page_title)TimeMe.callAfterTimeElapsedInSeconds(eventData[1],function(){customMParticleFunctions.MParticleActions.sendTimeOnPageEvent(eventData[0],eventData[1])})})}}}})})(jQuery,Drupal,drupalSettings)}catch(err){console.log("An error occured initializing mParticle.js");console.log(err)}})
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/modules/custom/mparticle/js/mparticle.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/modules/custom/mparticle/js/timeme.min.js. */
(function(){var e,t;e=this,t=function(){var r={startStopTimes:{},idleTimeoutMs:3e4,currentIdleTimeMs:0,checkStateRateMs:250,active:!1,idle:!1,currentPageName:"default-page-name",timeElapsedCallbacks:[],userLeftCallbacks:[],userReturnCallbacks:[],trackTimeOnElement:function(e){var t=document.getElementById(e);t&&(t.addEventListener("mouseover",function(){r.startTimer(e)}),t.addEventListener("mousemove",function(){r.startTimer(e)}),t.addEventListener("mouseleave",function(){r.stopTimer(e)}),t.addEventListener("keypress",function(){r.startTimer(e)}),t.addEventListener("focus",function(){r.startTimer(e)}))},getTimeOnElementInSeconds:function(e){var t=r.getTimeOnPageInSeconds(e);return t||0},startTimer:function(e,t){if(e||(e=r.currentPageName),void 0===r.startStopTimes[e])r.startStopTimes[e]=[];else{var n=r.startStopTimes[e],i=n[n.length-1];if(void 0!==i&&void 0===i.stopTime)return}r.startStopTimes[e].push({startTime:t||new Date,stopTime:void 0}),r.active=!0},stopAllTimers:function(){for(var e=Object.keys(r.startStopTimes),t=0;t<e.length;t++)r.stopTimer(e[t])},stopTimer:function(e){e||(e=r.currentPageName);var t=r.startStopTimes[e];void 0!==t&&0!==t.length&&(void 0===t[t.length-1].stopTime&&(t[t.length-1].stopTime=new Date),r.active=!1)},getTimeOnCurrentPageInSeconds:function(){return r.getTimeOnPageInSeconds(r.currentPageName)},getTimeOnPageInSeconds:function(e){return void 0===r.getTimeOnPageInMilliseconds(e)?void 0:r.getTimeOnPageInMilliseconds(e)/1e3},getTimeOnCurrentPageInMilliseconds:function(){return r.getTimeOnPageInMilliseconds(r.currentPageName)},getTimeOnPageInMilliseconds:function(e){var t=r.startStopTimes[e];if(void 0!==t){for(var n=0,i=0;i<t.length;i++){var s=t[i].startTime,o=t[i].stopTime;void 0===o&&(o=new Date),n+=o-s}return Number(n)}},getTimeOnAllPagesInSeconds:function(){for(var e=[],t=Object.keys(r.startStopTimes),n=0;n<t.length;n++){var i=t[n],s=r.getTimeOnPageInSeconds(i);e.push({pageName:i,timeOnPage:s})}return e},setIdleDurationInSeconds:function(e){var t=parseFloat(e);if(!1!==isNaN(t))throw{name:"InvalidDurationException",message:"An invalid duration time ("+e+") was provided."};return r.idleTimeoutMs=1e3*e,this},setCurrentPageName:function(e){return r.currentPageName=e,this},resetRecordedPageTime:function(e){delete r.startStopTimes[e]},resetAllRecordedPageTimes:function(){for(var e=Object.keys(r.startStopTimes),t=0;t<e.length;t++)r.resetRecordedPageTime(e[t])},resetIdleCountdown:function(){r.idle&&r.triggerUserHasReturned(),r.idle=!1,r.currentIdleTimeMs=0},callWhenUserLeaves:function(e,t){this.userLeftCallbacks.push({callback:e,numberOfTimesToInvoke:t})},callWhenUserReturns:function(e,t){this.userReturnCallbacks.push({callback:e,numberOfTimesToInvoke:t})},triggerUserHasReturned:function(){if(!r.active)for(var e=0;e<this.userReturnCallbacks.length;e++){var t=this.userReturnCallbacks[e],n=t.numberOfTimesToInvoke;(isNaN(n)||void 0===n||0<n)&&(t.numberOfTimesToInvoke-=1,t.callback())}r.startTimer()},triggerUserHasLeftPage:function(){if(r.active)for(var e=0;e<this.userLeftCallbacks.length;e++){var t=this.userLeftCallbacks[e],n=t.numberOfTimesToInvoke;(isNaN(n)||void 0===n||0<n)&&(t.numberOfTimesToInvoke-=1,t.callback())}r.stopAllTimers()},callAfterTimeElapsedInSeconds:function(e,t){r.timeElapsedCallbacks.push({timeInSeconds:e,callback:t,pending:!0})},checkState:function(){for(var e=0;e<r.timeElapsedCallbacks.length;e++)r.timeElapsedCallbacks[e].pending&&r.getTimeOnCurrentPageInSeconds()>r.timeElapsedCallbacks[e].timeInSeconds&&(r.timeElapsedCallbacks[e].callback(),r.timeElapsedCallbacks[e].pending=!1);!1===r.idle&&r.currentIdleTimeMs>r.idleTimeoutMs?(r.idle=!0,r.triggerUserHasLeftPage()):r.currentIdleTimeMs+=r.checkStateRateMs},visibilityChangeEventName:void 0,hiddenPropName:void 0,listenForVisibilityEvents:function(){void 0!==document.hidden?(r.hiddenPropName="hidden",r.visibilityChangeEventName="visibilitychange"):void 0!==document.mozHidden?(r.hiddenPropName="mozHidden",r.visibilityChangeEventName="mozvisibilitychange"):void 0!==document.msHidden?(r.hiddenPropName="msHidden",r.visibilityChangeEventName="msvisibilitychange"):void 0!==document.webkitHidden&&(r.hiddenPropName="webkitHidden",r.visibilityChangeEventName="webkitvisibilitychange"),document.addEventListener(r.visibilityChangeEventName,function(){document[r.hiddenPropName]?r.triggerUserHasLeftPage():r.triggerUserHasReturned()},!1),window.addEventListener("blur",function(){r.triggerUserHasLeftPage()}),window.addEventListener("focus",function(){r.triggerUserHasReturned()}),document.addEventListener("mousemove",function(){r.resetIdleCountdown()}),document.addEventListener("keyup",function(){r.resetIdleCountdown()}),document.addEventListener("touchstart",function(){r.resetIdleCountdown()}),window.addEventListener("scroll",function(){r.resetIdleCountdown()}),setInterval(function(){r.checkState()},r.checkStateRateMs)},websocket:void 0,websocketHost:void 0,setUpWebsocket:function(e){if(window.WebSocket&&e){var t=e.websocketHost;try{r.websocket=new WebSocket(t),window.onbeforeunload=function(){r.sendCurrentTime(e.appId)},r.websocket.onopen=function(){r.sendInitWsRequest(e.appId)},r.websocket.onerror=function(e){console&&console.log("Error occurred in websocket connection: "+e)},r.websocket.onmessage=function(e){console&&console.log(e.data)}}catch(e){console&&console.error("Failed to connect to websocket host.  Error:"+e)}}return this},websocketSend:function(e){r.websocket.send(JSON.stringify(e))},sendCurrentTime:function(e){var t={type:"INSERT_TIME",appId:e,timeOnPageMs:r.getTimeOnCurrentPageInMilliseconds(),pageName:r.currentPageName};r.websocketSend(t)},sendInitWsRequest:function(e){var t={type:"INIT",appId:e};r.websocketSend(t)},initialize:function(e){var t=r.idleTimeoutMs||30,n=r.currentPageName||"default-page-name",i=void 0,s=void 0;e&&(t=e.idleTimeoutInSeconds||t,n=e.currentPageName||n,i=e.websocketOptions,s=e.initialStartTime),r.setIdleDurationInSeconds(t).setCurrentPageName(n).setUpWebsocket(i).listenForVisibilityEvents(),r.startTimer(void 0,s)}};return r},"undefined"!=typeof module&&module.exports?module.exports=t():"function"==typeof define&&define.amd?define([],function(){return e.TimeMe=t()}):e.TimeMe=t()}).call(this);
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/modules/custom/mparticle/js/timeme.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/modules/custom/pendo/js/pendo.js. */
document.addEventListener('InitializeCustomJS',function(e){console.log("Initialize Script: pendo.js");try{(function($,Drupal,drupalSettings){'use strict';Drupal.pendo={Logger:{logDebug:function(value){if(drupalSettings.pendo.pendo_log_level==1)console.debug("CustomPendoFunctions: "+value)}},initializeWithVisitorId:function(visitorId){Drupal.pendo.Logger.logDebug("initializing pendo with visitorId: "+visitorId);pendo.initialize({visitor:{id:visitorId},account:{},events:{ready:function(){var urlParams=new URLSearchParams(window.location.search),pageViewAttributes={url:location.href,source:"Acquia"};urlParams.forEach(function(value,key){pageViewAttributes[key]=value});Drupal.pendo.sendTrackEvent(drupalSettings.pendo.page_title,pageViewAttributes)}}})},updateVistiorId:function(visitorId){Drupal.pendo.Logger.logDebug("updating pendo visitorId: "+visitorId);pendo.identify({visitor:{id:visitorId},account:{}})},sendTrackEvent:function(eventName,metadata){Drupal.pendo.Logger.logDebug("sending pendo trackEvent: "+eventName);pendo.track(eventName,metadata)}};$(document).ready(function(){(function(apiKey){(function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];v=['initialize','identify','updateOptions','pageLoad'];for(w=0,x=v.length;w<x;++w)(function(m){o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)))}})(v[w]);y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z)})(window,document,'script','pendo')})(drupalSettings.pendo.pendo_api_key);console.log('pendo libarary loaded.')})})(jQuery,Drupal,drupalSettings)}catch(err){console.log("An error occured initializing pendo.js");console.log(err)}})
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/modules/custom/pendo/js/pendo.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/core/misc/jquery.once.bc.js. */
(function($,once){var deprecatedMessageSuffix="is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256",originalJQOnce=$.fn.once,originalJQRemoveOnce=$.fn.removeOnce;$.fn.once=function jQueryOnce(id){Drupal.deprecationError({message:"jQuery.once() ".concat(deprecatedMessageSuffix)});return originalJQOnce.apply(this,[id])};$.fn.removeOnce=function jQueryRemoveOnce(id){Drupal.deprecationError({message:"jQuery.removeOnce() ".concat(deprecatedMessageSuffix)});return originalJQRemoveOnce.apply(this,[id])};var drupalOnce=once
function augmentedOnce(id,selector,context){originalJQOnce.apply($(selector,context),[id]);return drupalOnce(id,selector,context)}
function remove(id,selector,context){originalJQRemoveOnce.apply($(selector,context),[id]);return drupalOnce.remove(id,selector,context)};window.once=Object.assign(augmentedOnce,drupalOnce,{remove:remove})})(jQuery,once)
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/core/misc/jquery.once.bc.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/modules/contrib/simple_popup_blocks/js/simple_popup_blocks.js. */
(function($,Drupal){'use strict';Drupal.behaviors.simplePopupBlocks={attach:function(context,settings){var popup_settings=drupalSettings.simple_popup_blocks.settings,_html=document.documentElement,windowWidth=$(window).width();$.each(popup_settings,function(index,values){if(windowWidth<values.trigger_width)return null;var modal_class='',block_id=values.identifier,visit_counts_arr=values.visit_counts.split(','),allow_cookie=true,read_cookie='',cookie_val=1,cookie_days=values.cookie_expiry||100,match=0,css_identity='',spb_popup_id='',modal_close_class='',modal_minimize_class='',modal_minimized_class='',layout_class='',class_exists=false,delays='',browser_close_trigger=true,use_time_frequency=values.use_time_frequency,time_frequency=values.time_frequency,time_frequency_cookie=0,next_popup=0,current_timestamp=0,show_minimized_button=values.show_minimized_button,show_model=true;if(visit_counts_arr.length==1&&visit_counts_arr[0]==0&&use_time_frequency==0)allow_cookie=false;var element=document.getElementById(block_id);if(typeof element!='undefined'&&element!=null)if(allow_cookie==true)if(use_time_frequency==0){read_cookie=readCookie('spb_'+block_id);if(read_cookie){cookie_val=+read_cookie+1;createCookie('spb_'+block_id,cookie_val,100)}else createCookie('spb_'+block_id,cookie_val,100);cookie_val=cookie_val.toString();match=$.inArray(cookie_val,visit_counts_arr);if(match===-1)show_model=false}else{time_frequency_cookie=readCookie('spb_time'+block_id);current_timestamp=Math.floor(Date.now()/1e3);next_popup=current_timestamp+parseInt(time_frequency,10);if(time_frequency_cookie){if(current_timestamp>=time_frequency_cookie){match=1}else if(next_popup<=time_frequency_cookie){match=1}else{match=-1;show_model=false};if(match===1)createCookie('spb_time'+block_id,next_popup,100)}else createCookie('spb_time'+block_id,next_popup,100)};css_identity='.';if(values.css_selector==1)css_identity='#';spb_popup_id='spb-'+block_id;modal_class=block_id+'-modal';modal_close_class=block_id+'-modal-close';modal_minimize_class=block_id+'-modal-minimize';modal_minimized_class=block_id+'-modal-minimized';layout_class='.'+modal_class+' .spb-popup-main-wrapper';$(css_identity+block_id).once().wrap($('<div class="'+modal_class+'"></div>'));$('.'+modal_class).once().hide();if($(css_identity+block_id).closest('.spb-popup-main-wrapper').length)return;$(css_identity+block_id).wrap($('<div class="spb-popup-main-wrapper"></div>'));$('.'+modal_class).wrap('<div id="'+spb_popup_id+'" class="simple-popup-blocks-global"></div>');$(css_identity+block_id).before($('<div class="spb-controls"></div>'));class_exists=$('#'+spb_popup_id).hasClass('simple-popup-blocks-global');if(!class_exists)return true;if(values.minimize==="1"){$("#"+spb_popup_id+" .spb-controls").prepend($('<span class="'+modal_minimize_class+' spb_minimize">-</span>'));$('.'+modal_class).before($('<span class="'+modal_minimized_class+' spb_minimized"></span>'))};if(values.close==1)$("#"+spb_popup_id+" .spb-controls").prepend($('<span class="'+modal_close_class+' spb_close">&times;</span>'));if(values.overlay==1)$('.'+modal_class).addClass('spb_overlay');switch(values.layout){case'0':$(layout_class).addClass('spb_top_left');$(layout_class).css({width:values.width});break;case'1':$(layout_class).addClass('spb_top_right');$(layout_class).css({width:values.width});break;case'2':$(layout_class).addClass('spb_bottom_left');$(layout_class).css({width:values.width});break;case'3':$(layout_class).addClass('spb_bottom_right');$(layout_class).css({width:values.width});break;case'4':$(layout_class).addClass('spb_center');$(layout_class).css({width:values.width,'margin-left':-values.width/2});break;case'5':$(layout_class).addClass('spb_top_center');$(layout_class).css({width:values.width});break;case'6':$(layout_class).addClass('spb_top_bar');$(layout_class).css({});break;case'7':$(layout_class).addClass('spb_bottom_bar');$(layout_class).css({});break;case'8':$(layout_class).addClass('spb_left_bar');$(layout_class).css({width:values.width});break;case'9':$(layout_class).addClass('spb_right_bar');$(layout_class).css({width:values.width});break};if(show_model===true)if(values.trigger_method==0&&values.delay>0){delays=values.delay*1e3;$('.'+modal_class).delay(delays).fadeIn('slow');if(values.overlay==1)setTimeout(stopTheScroll,delays)}else if(values.trigger_method==0){$('.'+modal_class).show();$(css_identity+block_id).show();if(values.overlay==1)stopTheScroll()}else if(values.trigger_method==1){$(document).on('click',values.trigger_selector,function(e){$('.'+modal_class).show();$(css_identity+block_id).show();if(values.overlay==1)stopTheScroll();return false})}else if(values.trigger_method==2)$(_html).mouseleave(function(e){if(e.clientY>20)return;if(!browser_close_trigger)return;browser_close_trigger=false;$('.'+modal_class).show();$(css_identity+block_id).show();if(values.overlay==1)stopTheScroll()});$('.'+modal_close_class).click(function(){$('.'+modal_class).hide();startTheScroll()});$('.'+modal_minimize_class).click(function(){$('.'+modal_class).hide();startTheScroll();$('.'+modal_minimized_class).show()});$('.'+modal_minimized_class).click(function(){$('.'+modal_class).show();$(css_identity+block_id).show();if(values.overlay==1)stopTheScroll();if(show_minimized_button==0)$('.'+modal_minimized_class).hide()});if(values.enable_escape==1)$(document).keyup(function(e){if(e.keyCode==27){$('.'+modal_class).hide();startTheScroll();$('.'+modal_minimized_class).show()}});if(show_minimized_button==0)$('.'+modal_minimized_class).hide()})}}
function stopTheScroll(){$('body').css({overflow:'hidden'});$('input:text').focus()}
function startTheScroll(){$('body').css({overflow:''})}
function createCookie(name,value,days){if(days>0){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1e3));var expires='; expires='+date.toGMTString()}else var expires='';document.cookie=name+'='+value+expires+'; path=/'}
function readCookie(name){var nameEQ=name+'=',ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length)};return null}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/modules/contrib/simple_popup_blocks/js/simple_popup_blocks.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/themes/custom/sitestudiobask/js/modules.js. */
// Simple Module System
// Register a module that's associated with a given [data-module] attribute.
// Runs after the DOMContentLoaded has fired.

// TODO: Further refine and document.
// TODO: Remove logs.

// Gloabl variable for the Leaving Site Modal "Focus Trap"
var leavingTrap;


var TCB = {
  modules: {
    navigation: navigation,
    mainHero: mainHero,
    howitworks: howitworks,
    cookieConsentPrompt: cookieConsentPrompt,
    faq: faq,
    footer: footer
  },
  initialized: {},

  // Run registered modules.
  run: function () {
    var modules = document.querySelectorAll('[data-module]');

    modules.forEach(function (m) {
      var moduleName = m.dataset.module;

      if (!TCB.initialized[moduleName]) {
        // Store whatever is returned from the module.
        TCB.initialized[moduleName] = TCB.modules[moduleName](m);
      }
    });

    init();
  },

  registerModule: function (name, fn, runAfterRegistering) {
    if (TCB.modules[name]) {
      throw new Error('Module "' + name + '" already registered.');
    }

    TCB.modules[name] = fn;

    if (runAfterRegistering) {
      var element = document.querySelector('[data-module="' + name + '"]');
      TCB.modules[name](element);
    }
  },

  unregisterModule: function (name) {
    // If a function was stored, assume it's a "teardown" function.
    if (TCB.initialized[name] && typeof TCB.initialized[name] === 'function') {
      TCB.initialized[name]();
      delete TCB.initialized[name];
      delete TCB.modules[name];
    }
  },
};

document.addEventListener('InitializeCustomJS', function(e){
  console.log("Initalize Scripts: Modules.js");
  try{
    // Bind Ready Event
    if (document.readyState === 'loading') {
      // Loading hasn't finished yet
      document.addEventListener('DOMContentLoaded', function (event) {
        TCB.run();
      });
    } else {
      // 'DOMContentLoaded' has already fired
      TCB.run();
    }

    (function ($) {

      // List Link Item bind event
      let classname = 'list-link-item-link'
      $(document).on('click', '.'+classname, function(e){
        var href = e.currentTarget.attributes.href.nodeValue;
        customMParticleFunctions.MParticleActions.listLinkItemClick(classname, href);
      });

      // correct regmark super scripting
      $(document).ready(function () {

        $(".layout-container :not(script, sup, iframe)").contents().filter(function () {
          return this.nodeType === 3;
        }).replaceWith(function () {
          return this.nodeValue
            .replace(/((?!<sup>\s*))&reg;((?!\s*<\/sup>))/gi, "<sup class='regmark'>&reg;</sup>")
            .replace(/((?!<sup>\s*))®((?!\s*<\/sup>))/gi, "<sup class='regmark'>&reg;</sup>");
        });

        $(".dialog-off-canvas-main-canvas :not(script, sup, iframe)").contents().filter(function () {
          return this.nodeType === 3;
        }).replaceWith(function () {
          return this.nodeValue
            .replace(/((?!<sup>\s*))&reg;((?!\s*<\/sup>))/gi, "<sup class='regmark'>&reg;</sup>")
            .replace(/((?!<sup>\s*))®((?!\s*<\/sup>))/gi, "<sup class='regmark'>&reg;</sup>");
        });

        // initialize bindFirst plugin
        initializePlugin();

        // rebind initial click events
        $('a:not([href^="/"],[href^="#"],[href^="?"],[href*="baskbank.com"],[href*="texascapitalbank.com"],[href*="bankdirect.com"],[href*="q2ebanking.com"],[href*="?skipcrit=true&skipcart=true"],[href*="?skipcrit=true&amp;skipcart=true"],[href*="tel:"], .toolbar-icon)').bindFirst("click", displayBumper);

        var targetMargin = window.innerWidth * .1;

        // bind lightSlider
        $("#scroll-wrapper").lightSlider({
          item: 1,
          controls: true,
          pager: false,
          loop: false,
          keyPress: true,
          slideMove: 1,
          slideMargin: 0,
          easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
          speed: 600,
          onSliderLoad: afterSliderLoad,
          onBeforeSlide: beforeSliderChange
        });

        $(window).on('resize orientationchange', function (e) {
          setTimeout(function () {
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }
            resetSliderDimensions();
          }, 200);
        });

        $(".quote-slider").each(function () {
          var $slider = $(this);

          $slider.lightSlider({
            item: 1,
            slideMove: 1,
            slideMargin: 0,
            useCSS: true,
            cssEasing: 'ease',
            speed: 1000,
            auto: true,
            loop: true,
            slideEndAnimation: true,
            pause: 5000,
            onSliderLoad: function () {
              $slider.css("height", "inherit");
            }
          });
        });

        $(".mobile-slider").each(function () {
          var $mobileSlider = $(this);

          $mobileSlider.lightSlider({
            item: 1,
            slideMove: 1,
            slideMargin: 16,
            controls: false,
            useCSS: true,
            cssEasing: 'ease',
            speed: 1000,
            auto: true,
            loop: true,
            slideEndAnimation: true,
            pause: 5000,
            onSliderLoad: function () {
              $mobileSlider.css("height", "inherit");
              $mobileSlider.css("display", "flex");
            }
          });
        });

        // open an account behaviors
        // - IE 11 check
        // - open an account modal
        //$('.open-account').bindFirst("click", captureOpenRequest);

        $.urlParams = function (name) {
          var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
          if (results == null) {
            return null;
          }
          else {
            return decodeURI(results[1]) || 0;
          }
        };

        /**
         * 1. Add Referral Code in local storage
         * 2. Get stored referral code
         * 3. If referal code exists in local storage append it to all open-account links
         */

        // 1
        const updatedReferalCode = $.urlParams('rafcode');
        const referralCodeTTL = 1000 * 60 * 60 * 24; // day in milliseconds
        if(updatedReferalCode){
          setWithExpiry('referral-code', updatedReferalCode, referralCodeTTL); // Use A reasonable TTL so that someone cant get reffered or referr somone else accidentally due to the code being stored in local storage
        }

        // 2
        const referralCode = getWithExpiry('referral-code');

        // 3
        if(referralCode){
          $("a.open-account").each(function () {
            var openAccountButton = this;
            openAccountButton.href = openAccountButton.href + "&promoCode=" + referralCode;
          });
        }

        var paths = [ "/special-offers", "/bonus-miles-terms-and-conditions" ];

        if ($.inArray(paths, window.location.pathname)) {
          if ($.urlParams('source') === "olb") {
            // hide panels
            $('main a.tcb-big-btn, footer, header, div.footer_menus').remove();

            // rewrite links to add source=olb (to maintain proper page layout)
            $("a[href='/bonus-miles-terms-and-conditions']").attr('href', '/bonus-miles-terms-and-conditions?source=olb');
          }
        }
      });

      function captureOpenRequest() {
        var navTo = event.target.href;

        event.preventDefault();
        event.stopImmediatePropagation();

        var $overlayContent = $(".modal-hidden").html();

        createOverlay([$overlayContent]);

        $('.open-account-action').attr('href', navTo);
        $('.modal-content-close').focus();

        if (IE.isIE) {
          $('.display-ie').show();
        }

        // log event in mParticle
        customMParticleFunctions.MParticleActions.sendOpenAccountDisplayEvent();
      }

      function afterSliderLoad(slider) {

        $(slider).removeClass('cS-hidden');
        $('.navigation-entry').eq(0).attr('aria-current', 'true')

        $('.navigation-entry').each(function (idx) {
          $(this).click(function (e) {
            slider.goToSlide(idx);
            if (window.innerWidth < 768) {
              var offset = 15 - idx * 20;
              $('.navigator').css('transform', 'translateX(' + offset + '%)');
            }
            e.preventDefault();
          });
        });

        var pin = $('.navigation-pin')[0];
        $(pin).addClass('tcb-primary-borderColor');

        resetSliderDimensions();
      }

      function resetSliderDimensions() {
        $('.navigator').css('transform', '');
        $('#scroll-wrapper').css('height', 'inherit');

        var targetWidth = window.innerWidth * .8;
        var targetMargin = window.innerWidth * .1;

        $('.tcb-saving-carousel-entry').each(function (idx) {
          $(this).css('width', targetWidth + 'px');
          $(this).css('margin-right', targetMargin + 'px');
          $(this).css('margin-left', targetMargin + 'px');

          if (window.innerWidth < 768 && $(this).hasClass('active')) {
            var offset = 15 - idx * 20;
            $('.navigator').css('transform', 'translateX(' + offset + '%)');
          }
        });
      }

      function beforeSliderChange(slider) {
        newSlideIdx = slider.getCurrentSlideCount();

        var dashedLines = $('.dashed-line');
        var pins = $('.navigation-pin');

        dashedLines.each(function (itr) {
          if (itr > newSlideIdx - 2) {
            $(this).removeClass('tcb-primary-borderColor');
          } else {
            $(this).addClass('tcb-primary-borderColor');
          }
        });
        pins.each(function (itr) {
          if (itr > newSlideIdx - 1) {
            $(this).removeClass('tcb-primary-borderColor');
          } else {
            $(this).addClass('tcb-primary-borderColor');
          }
        });
        $('.navigation-entry').removeAttr('aria-current').eq(newSlideIdx - 1).attr('aria-current', 'true')
        if (window.innerWidth < 768) {
          var offset = 15 - ((newSlideIdx - 1) * 20);
          $('.navigator').css('transform', 'translateX(' + offset + '%)');
        }
      }

      function escBumper(event){
        if (event.keyCode === 27) {
          leavingTrap.deactivate();
          overlayClose();
          $(window).off('keyup', escBumper);
        }
      }

      function displayBumper(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        $(window).on('keyup', escBumper);

        var href = event.target.closest('a').getAttribute('href');
        var container = $('<div id="leaving-site-modal" class="text-center"></div>');
        var overlayHeader = $('<h1 id="overlay-header" class="text__title tcb-primary-color">You are now leaving BaskBank.com</h1>');
        var overlayText = $('<p>Links to other websites are provided for your convenience. Bask Bank does not own or maintain these external sites and is not responsible for their security or privacy practices.</p>');
        var overlayProceed = $("<button id='leavingsite-proceed-button' onclick='leavingTrap.deactivate(); overlayClose(); window.open(\"" + href + "\");' class='tcb-big-btn'>proceed</button>");
        var overlayClose = $('<button onclick="leavingTrap.deactivate(); overlayClose();" class="overlay-close tcb-big-btn">cancel</button>');

        container.append(overlayHeader).append(overlayText).append(overlayProceed).append(overlayClose);

        createOverlay([container]);

        var leavingSiteModal = document.getElementById('leaving-site-modal');
        leavingTrap = focusTrap(leavingSiteModal, { escapeDeactivates: true });
        leavingTrap.activate();

        var proceedButton = document.getElementById('leavingsite-proceed-button');
        proceedButton.focus();
      }

    })(jQuery);
  } catch(e){
    console.log("An error occured while initalizing modules");
  }

});


// Initialize.
function init() {
  // Setup smooth navigation
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: function () { return 100; }
  });
  var closeMobileMenu = function () { };
  try {
    closeMobileMenu = TCB.initialized.navigation.closeMenu;
  } catch (e) {
    console.log(e);
  }
  document.addEventListener('scrollStop', closeMobileMenu, false);

  if (hasAnswered()) {
    document.getElementById('cpt_cookie_consent_prompt_container').style.display = "none";
  }
  else{
    // Set contact us button to cookie prompt position
    document.getElementById('contact-us-focus-wrapper-button').classList.add("contact-us-cookie-position");
    document.getElementsByClassName('contact-us-wrapper')[0].classList.add("contact-us-cookie-position");
  }

  captureRemoteConsent();
}

// Navigation bar
function navigation(m) {
  var mobileMenuBtn = m.getElementsByClassName('tcb-navigation__menu__mobile__icon')[0];
  var mobileCloseMenuBtn = m.getElementsByClassName('tcb-navigation__menu__mobile__close')[0];
  var mobileMenu = m.getElementsByClassName('tcb-navigation__menu__mobile__items')[0];
  var opened = false;

  function toggleMenu() {
    if (opened) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    opened = true;
    mobileCloseMenuBtn.classList.add('tcb-navigation__menu__icon__active');
    mobileMenuBtn.classList.remove('tcb-navigation__menu__icon__active');
    mobileMenu.classList.add("tcb-menu-open");
  }

  function closeMenu() {
    opened = false;
    mobileMenuBtn.classList.add('tcb-navigation__menu__icon__active');
    mobileCloseMenuBtn.classList.remove('tcb-navigation__menu__icon__active');
    mobileMenu.classList.remove("tcb-menu-open");
  }

  function isMenuOpen() {
    return opened;
  }

  function unmount() {
    mobileMenuBtn.removeEventListener('click', toggleMenu);
    mobileCloseMenuBtn.removeEventListener('click', toggleMenu);
  }

  mobileMenuBtn.addEventListener('click', toggleMenu);
  mobileCloseMenuBtn.addEventListener('click', toggleMenu);

  // add transtion after render to avoid first transition.
  setTimeout(function () {
    mobileMenu.classList.add('tcb-navigation__menu-transition');
  }, 300);

  return {
    el: mobileMenuBtn,
    unmount: unmount,
    toggleMenu: toggleMenu,
    openMenu: openMenu,
    closeMenu: closeMenu,
    isMenuOpen: isMenuOpen
  }
}

// First hero section
function mainHero(m) {
  var imageEl = m.getElementsByClassName('bg__image__el')[0];
  var bgEl = m.getElementsByClassName('bg')[0];
  var textEl = m.getElementsByClassName('text')[0];
  var started = false;
  var timeouts = [];

  function animateHero() {

    if (isElementInViewport(bgEl) && !started) {
      started = true;
      var t = setTimeout(function () {
        bgEl.classList.add('bg__enter');
        textEl.classList.add('text__enter');
        imageEl.classList.add('bg__image__trans');
      }, 500)
      timeouts.push(t);
    }
  }

  function reset() {
    started = false;
  }

  function unmount() {
    window.removeEventListener('scroll', animateHero);
  }
  window.addEventListener('scroll', animateHero);

  // Workaround for safari.
  setTimeout(function () {
    animateHero();
  }, 100);


  return {
    el: imageEl,
    unmount: unmount
  }
}

// How it works section
function howitworks(m) {
  var started = false;
  var firstDigitCounter = 0;

  var bgEl = m.getElementsByClassName('tcb-hiw-module__bg')[0];
  var graphEl = m.getElementsByClassName('tcb-hiw-module__graph_animation')[0];
  var firstDigitEl = m.getElementsByClassName('tcb-hiw-module__title__digit_1');
  var secondDigitEl = m.getElementsByClassName('tcb-hiw-module__title__digit_2');

  // function animateBg() {
  //   if (isElementInViewport(bgEl) && !started) {
  //     started = true;
  //     bgEl.classList.add('tcb-hiw-module__bg__transition');
  //     setTimeout(function () {
  //       animateGraph();
  //     }, 500);
  //   }
  // }

  function triggerAnimation() {
    if (isElementInViewport(bgEl) && !started) {
      started = true;
      animateGraph();
    }
  }

  function animateNumbers(current) {
    var h = firstDigitEl[0].getBoundingClientRect().height;
    if (current === 0) return;
    if (current % 2 === 0) {
      // even
      secondDigitEl[0].style.transform = 'translateY(-' + current * h + 'px)';
      secondDigitEl[1].style.transform = 'translateY(-' + current * h + 'px)';
    } else {
      firstDigitCounter += 1;
      secondDigitEl[0].style.transform = 'translateY(-' + current * h + 'px)';
      secondDigitEl[1].style.transform = 'translateY(-' + current * h + 'px)';
      firstDigitEl[0].style.transform = 'translateY(-' + firstDigitCounter * h + 'px)';
      firstDigitEl[1].style.transform = 'translateY(-' + firstDigitCounter * h + 'px)';
    }
  }

  function animateGraph() {
    var current = 0;

    function continueAnimation(t) {
      var delay = current === 0 ? 0 : t;
      var inter = setTimeout(function () {
        var barHeight = 10 + (7.5 * (current + 1));
        graphEl.children[current].classList.add('tcb-active-month');
        graphEl.children[current].style.height = barHeight + '%';
        animateNumbers(current);
        if (current - 1 >= 0) {
          graphEl.children[current - 1].classList.remove('tcb-active-month');
        }
        current += 1;
        if (current < graphEl.children.length) {
          continueAnimation(t);
        }
      }, delay);
    }
    continueAnimation(400);
  }

  function reset() {
    started = false;
    firstDigitCounter = 0;
  }

  function unmount() {
    window.removeEventListener('scroll', triggerAnimation);
  }
  window.addEventListener('scroll', triggerAnimation);

  triggerAnimation();

  return {
    el: bgEl,
    unmount: unmount
  }

}

//Cookie Consent Prompt
function cookieConsentPrompt(m) {
  var cookiePrompt = document.getElementById('cpt_cookie_consent_prompt_container');
  var yesButton = document.getElementById('cookie-consent-yes-button');
  var noButton = document.getElementById('cookie-consent-no-button');
  yesButton.addEventListener('click', cookieConsentAnswered);
  yesButton.addEventListener('click', displayFloatLeadForm);
  noButton.addEventListener('click', cookieConsentRejected);
  noButton.addEventListener('click', cookieConsentAnswered);
  noButton.addEventListener('click', disableFloatingLeadFrom);



  // set focus to yes button if the prompt is shown
  if (!hasAnswered())
  {
    cookiePrompt.style.display = "flex";
    yesButton.focus();
  }

  function cookieConsentRejected() {
    mParticle.setOptOut(true);
    // Hide lead form
    localStorage.setItem("consentRejected", true);
    let footer = document.querySelector('.footer-wrapper')
    let leadForm = footer.querySelector(".lead-form-container");
    let leadFormWrapper = footer.querySelector(".lead-form-wrapper");
    leadForm.style.display = "none";
    leadFormWrapper.style.display = "none";
  }

  function cookieConsentAnswered() {
    cookiePrompt.style.display = "none";
    localStorage.setItem("consentAnswered", "complete");

    // Set contact us button to default position
    document.getElementById('contact-us-focus-wrapper-button').classList.remove("contact-us-cookie-position");
    document.getElementsByClassName('contact-us-wrapper')[0].classList.remove("contact-us-cookie-position");
  }
}

function displayFloatLeadForm(){
    var floatContainer = jQuery('.floating-lead-form-container');
    setTimeout(function(){floatContainer.slideToggle();},10000);
}

function disableFloatingLeadFrom(){
  localStorage.setItem('FloatContainerDismissed', 'complete');
}

function hasAnswered() {
  var answered = localStorage.getItem("consentAnswered");
  if (answered == "complete") {
    return true;
  } else {
    return false;
  }
}

//Footer
function footer() {
  var doNotSellLink = document.getElementById('doNotSell__Link');
  var doNotSellModal = document.getElementById("doNotSell__Modal");
  var closeSpan = document.getElementsByClassName("close")[0];

  // use the library to trap activity to the do not sell modal
  var consentTrap = focusTrap(doNotSellModal, {
    onActivate: function () {
      doNotSellModal.style.display = "block";
    },
    onDeactivate: function () {
      doNotSellModal.style.display = "none";
    },
    initialFocus: 'button.close',
    escapeDeactivates: true // this is default
  });

  doNotSellLink.addEventListener("click", function (event) {
    event.preventDefault();
    consentTrap.activate();
  });

  closeSpan.onclick = function () {
    consentTrap.deactivate();
  };
}

//FAQ
function faq() {


  const searchField = document.getElementById("searchfaq");

  if(searchField) {
    searchField.addEventListener("input", function (e) {

      // for every dt
      // if the value has the search string show

      // filter dd & dt
      // hide dl if all items hidden

      // hide header if dl below hidden

    }, false);
  }

  // Wire up "answer-N" ID's for each of the dd elements
  var itr = 0;
  document.querySelectorAll('.styled > div').forEach(function (definition) {
    definition.id = "answer-" + itr;
    itr++;
  });

  // Toggle the aria-expanded value on an expander
  function toggleExpander(event) {

    // Grab state of this expander, and determine its next state
    var currentExpanded = event.target.getAttribute('aria-expanded');
    var nextState = (currentExpanded == null || currentExpanded == "false");

    // Flip all other expander aria-expanded states to "false"
    var containerDl = event.target.closest('div.styled');
    containerDl.querySelectorAll('h3 a.ckeditor-accordion-toggler').forEach(function (link) {
      link.setAttribute('aria-expanded', 'false');
    });

    // Update the target expander's attribute accordingly
    event.target.setAttribute('aria-expanded', nextState);
  }

  document.querySelectorAll('h3 a').forEach(function (expander) {
    // Wire up the expander on-click event, being mindful of the state of the parent <dt> element.
    var currentExpanded = expander.parentElement.classList.contains("active");
    expander.setAttribute('aria-expanded', currentExpanded);
    expander.setAttribute('aria-controls', expander.parentElement.nextElementSibling.id);
    expander.addEventListener("click", toggleExpander);
  }
  );
}

// Helper functions

function setWithExpiry(key, value, ttl) {
  const now = new Date()

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  }
  localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

function isElementInViewport(el) {

  var rect = el.getBoundingClientRect();
  // prevent safari from returning true before element has size.
  if (rect.top === rect.bottom) {
    return false;
  }
  return (
    rect.top >= 0 &&
    rect.bottom * .6 <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function captureRemoteConsent() {
  var optOut = document.getElementById('csr-opt-out');

  if (optOut === null) return;

  optOut.onclick = function () {

    this.setAttribute("disabled", "");
    this.classList.add('disabled');

    var inputField = document.getElementById('csr-input');
    var optoutMessage = document.getElementById('optoutMessage');

    // default value
    var attribute = "email";
    var value = inputField.value;

    // clear error states
    optoutMessage.style.display = "none";
    inputField.classList.remove("error");
    optoutMessage.classList.remove("error");

    if (value.trim() === "") {
      optoutMessage.style.display = "block";
      optoutMessage.firstElementChild.innerHTML = "Please enter a value.";

      inputField.classList.add("error");
      optoutMessage.classList.add("error");

      this.removeAttribute("disabled");
      this.classList.remove('disabled');
      return;
    } // empty

    if (isValidInput(value)) {
      window.customMParticleFunctions.Logger.logDebug("valid input");

      if (validateCif(value)) {
        attribute = "other"; // CIF
      }

      window.customMParticleFunctions.Logger.logDebug("input type: " + attribute);

      // send the consent
      window.customMParticleFunctions.MParticleActions.sendRemoteConsent(attribute, value, "CCPA Do Not Sell", false, function () {
        var optOut = document.getElementById('csr-opt-out');
        var inputField = document.getElementById('csr-input');
        var optoutMessage = document.getElementById('optoutMessage');

        optoutMessage.firstElementChild.innerHTML = "👍 Successfully opted out customer associated with " + value;
        optoutMessage.style.display = "block";
        optoutMessage.classList.add('success');
        optOut.classList.remove('disabled');

        // reset form after callback
        inputField.value = "";
        optOut.removeAttribute("disabled");
      });
    }
    else {
      optoutMessage.style.display = "block";
      optoutMessage.firstElementChild.innerHTML = "Value should either be a CIF or a valid email address.";

      inputField.classList.add("error");
      optoutMessage.classList.add("error");

      // show a message indicating the input is improperly formatted
      customMParticleFunctions.Logger.logDebug("invalid input");

      this.removeAttribute("disabled");
      this.classList.remove('disabled');
    }
  };
}

function isValidInput(input) { return validateCif(input) === true || validateEmail(input) === true; }
function validateCif(cif) { return /^[0-9]{10}$/.test(cif); }
function validateEmail(email) { return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email); }
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/themes/custom/sitestudiobask/js/modules.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/themes/custom/sitestudiobask/js/lightslider.js. */
document.addEventListener('InitializeCustomJS',function(e){console.log("Initialize Script: lightslider.js");try{(function($,undefined){'use strict';var defaults={item:3,autoWidth:false,slideMove:1,slideMargin:10,addClass:'',mode:'slide',useCSS:true,cssEasing:'ease',easing:'linear',speed:400,auto:false,pauseOnHover:false,loop:false,slideEndAnimation:true,pause:2e3,keyPress:false,controls:true,prevHtml:'',nextHtml:'',rtl:false,adaptiveHeight:false,vertical:false,verticalHeight:500,vThumbWidth:100,thumbItem:10,pager:true,gallery:false,galleryMargin:5,thumbMargin:5,currentPagerPosition:'middle',enableTouch:true,enableDrag:true,freeMove:true,swipeThreshold:40,responsive:[],onBeforeStart:function($el){},onSliderLoad:function($el){},onBeforeSlide:function($el,scene){},onAfterSlide:function($el,scene){},onBeforeNextSlide:function($el,scene){},onBeforePrevSlide:function($el,scene){}};$.fn.lightSlider=function(options){if(this.length===0)return this;if(this.length>1){this.each(function(){$(this).lightSlider(options)});return this};var plugin={},settings=$.extend(true,{},defaults,options),settingsTemp={},$el=this;plugin.$el=this;if(settings.mode==='fade')settings.vertical=false;var $children=$el.children(),windowW=$(window).width(),breakpoint=null,resposiveObj=null,length=0,w=0,on=false,elSize=0,$slide='',scene=0,property=(settings.vertical===true)?'height':'width',gutter=(settings.vertical===true)?'margin-bottom':'margin-right',slideValue=0,pagerWidth=0,slideWidth=0,thumbWidth=0,interval=null,isTouch=('ontouchstart'in document.documentElement),refresh={};refresh.chbreakpoint=function(){windowW=$(window).width();if(settings.responsive.length){var item;if(settings.autoWidth===false)item=settings.item;if(windowW<settings.responsive[0].breakpoint)for(var i=0;i<settings.responsive.length;i++)if(windowW<settings.responsive[i].breakpoint){breakpoint=settings.responsive[i].breakpoint;resposiveObj=settings.responsive[i]};if(typeof resposiveObj!=='undefined'&&resposiveObj!==null)for(var j in resposiveObj.settings)if(resposiveObj.settings.hasOwnProperty(j)){if(typeof settingsTemp[j]==='undefined'||settingsTemp[j]===null)settingsTemp[j]=settings[j];settings[j]=resposiveObj.settings[j]};if(!$.isEmptyObject(settingsTemp)&&windowW>settings.responsive[0].breakpoint)for(var k in settingsTemp)if(settingsTemp.hasOwnProperty(k))settings[k]=settingsTemp[k];if(settings.autoWidth===false)if(slideValue>0&&slideWidth>0)if(item!==settings.item)scene=Math.round(slideValue/((slideWidth+settings.slideMargin)*settings.slideMove))}};refresh.calSW=function(){if(settings.autoWidth===false)slideWidth=(elSize-((settings.item*(settings.slideMargin))-settings.slideMargin))/settings.item};refresh.calWidth=function(cln){var ln=cln===true?$slide.find('.lslide').length:$children.length;if(settings.autoWidth===false){w=ln*(slideWidth+settings.slideMargin)}else{w=0;for(var i=0;i<ln;i++)w+=(parseInt($children.eq(i).width())+settings.slideMargin)};return w};plugin={doCss:function(){var support=function(){var transition=['transition','MozTransition','WebkitTransition','OTransition','msTransition','KhtmlTransition'],root=document.documentElement;for(var i=0;i<transition.length;i++)if(transition[i]in root.style)return true};if(settings.useCSS&&support())return true;return false},keyPress:function(){if(settings.keyPress)$(document).on('keyup.lightslider',function(e){if(!$(':focus').is('input, textarea')){if(e.preventDefault){e.preventDefault()}else e.returnValue=false;if(e.keyCode===37){$el.goToPrevSlide()}else if(e.keyCode===39)$el.goToNextSlide()}})},controls:function(){if(settings.controls){$el.before('<div class="lSAction"><button aria-label="go to previous slide" class="lSPrev">'+settings.prevHtml+'</button></div>');$el.after('<div class="lSAction"></button><button aria-label="go to next slide" class="lSNext">'+settings.nextHtml+'</button></div>');if(!settings.autoWidth){if(length<=settings.item)$slide.find('.lSAction').hide()}else if(refresh.calWidth(false)<elSize)$slide.find('.lSAction').hide();$slide.find('.lSAction button').on('click',function(e){if(e.preventDefault){e.preventDefault()}else e.returnValue=false;if($(this).attr('class')==='lSPrev'){$el.goToPrevSlide()}else $el.goToNextSlide();return false})}},initialStyle:function(){var $this=this;if(settings.mode==='fade'){settings.autoWidth=false;settings.slideEndAnimation=false};if(settings.auto)settings.slideEndAnimation=false;if(settings.autoWidth){settings.slideMove=1;settings.item=1};if(settings.loop){settings.slideMove=1;settings.freeMove=false};settings.onBeforeStart.call(this,$el);refresh.chbreakpoint();$el.addClass('lightSlider').wrap('<div class="lSSlideOuter '+settings.addClass+'"><div class="lSSlideWrapper"></div></div>');$slide=$el.parent('.lSSlideWrapper');if(settings.rtl===true)$slide.parent().addClass('lSrtl');if(settings.vertical){$slide.parent().addClass('vertical');elSize=settings.verticalHeight;$slide.css('height',elSize+'px')}else elSize=$el.outerWidth();$children.addClass('lslide');if(settings.loop===true&&settings.mode==='slide'){refresh.calSW();refresh.clone=function(){if(refresh.calWidth(true)>elSize){var tWr=0,tI=0;for(var k=0;k<$children.length;k++){tWr+=(parseInt($el.find('.lslide').eq(k).width())+settings.slideMargin);tI++;if(tWr>=(elSize+settings.slideMargin))break};var tItem=settings.autoWidth===true?tI:settings.item;if(tItem<$el.find('.clone.left').length)for(var i=0;i<$el.find('.clone.left').length-tItem;i++)$children.eq(i).remove();if(tItem<$el.find('.clone.right').length)for(var j=$children.length-1;j>($children.length-1-$el.find('.clone.right').length);j--){scene--;$children.eq(j).remove()};for(var n=$el.find('.clone.right').length;n<tItem;n++){$el.find('.lslide').eq(n).clone().removeClass('lslide').addClass('clone right').appendTo($el);scene++};for(var m=$el.find('.lslide').length-$el.find('.clone.left').length;m>($el.find('.lslide').length-tItem);m--)$el.find('.lslide').eq(m-1).clone().removeClass('lslide').addClass('clone left').prependTo($el);$children=$el.children()}else if($children.hasClass('clone')){$el.find('.clone').remove();$this.move($el,0)}};refresh.clone()};refresh.sSW=function(){length=$children.length;if(settings.rtl===true&&settings.vertical===false)gutter='margin-left';if(settings.autoWidth===false)$children.css(property,slideWidth+'px');$children.css(gutter,settings.slideMargin+'px');w=refresh.calWidth(false);$el.css(property,w+'px');if(settings.loop===true&&settings.mode==='slide')if(on===false)scene=$el.find('.clone.left').length};refresh.calL=function(){$children=$el.children();length=$children.length};if(this.doCss())$slide.addClass('usingCss');refresh.calL();if(settings.mode==='slide'){refresh.calSW();refresh.sSW();if(settings.loop===true){slideValue=$this.slideValue();this.move($el,slideValue)};if(settings.vertical===false)this.setHeight($el,false)}else{this.setHeight($el,true);$el.addClass('lSFade');if(!this.doCss()){$children.fadeOut(0);$children.eq(scene).fadeIn(0)}};$children.find('a, button').attr('tabindex','-1');$children.removeClass('active').attr('aria-hidden','true');if(settings.loop===true&&settings.mode==='slide'){$children.eq(scene).addClass('active')}else $children.first().addClass('active').removeAttr('aria-hidden').find('a, button').removeAttr('tabindex')},pager:function(){var $this=this;refresh.createPager=function(){thumbWidth=(elSize-((settings.thumbItem*(settings.thumbMargin))-settings.thumbMargin))/settings.thumbItem;var $children=$slide.find('.lslide'),length=$slide.find('.lslide').length,i=0,pagers='',v=0;for(i=0;i<length;i++){if(settings.mode==='slide')if(!settings.autoWidth){v=i*((slideWidth+settings.slideMargin)*settings.slideMove)}else v+=((parseInt($children.eq(i).width())+settings.slideMargin)*settings.slideMove);var thumb=$children.eq(i*settings.slideMove).attr('data-thumb');if(settings.gallery===true){pagers+='<li style="width:100%;'+property+':'+thumbWidth+'px;'+gutter+':'+settings.thumbMargin+'px"><a href="#"><img src="'+thumb+'" /></a></li>'}else pagers+='<li><a href="#">'+(i+1)+'</a></li>';if(settings.mode==='slide')if(v>=w-elSize-settings.slideMargin){i=i+1;var minPgr=2;if(settings.autoWidth){pagers+='<li><a href="#">'+(i+1)+'</a></li>';minPgr=1};if(i<minPgr){pagers=null;$slide.parent().addClass('noPager')}else $slide.parent().removeClass('noPager');break}};var $cSouter=$slide.parent();$cSouter.find('.lSPager').html(pagers);if(settings.gallery===true){if(settings.vertical===true)$cSouter.find('.lSPager').css('width',settings.vThumbWidth+'px');pagerWidth=(i*(settings.thumbMargin+thumbWidth))+0.5;$cSouter.find('.lSPager').css({property:pagerWidth+'px','transition-duration':settings.speed+'ms'});if(settings.vertical===true)$slide.parent().css('padding-right',(settings.vThumbWidth+settings.galleryMargin)+'px');$cSouter.find('.lSPager').css(property,pagerWidth+'px')};var $pager=$cSouter.find('.lSPager').find('li');$pager.first().addClass('active');$pager.on('click',function(){if(settings.loop===true&&settings.mode==='slide'){scene=scene+($pager.index(this)-$cSouter.find('.lSPager').find('li.active').index())}else scene=$pager.index(this);$el.mode(false);if(settings.gallery===true)$this.slideThumb();return false})};if(settings.pager){var cl='lSpg';if(settings.gallery)cl='lSGallery';$slide.after('<ul class="lSPager '+cl+'"></ul>');var gMargin=(settings.vertical)?'margin-left':'margin-top';$slide.parent().find('.lSPager').css(gMargin,settings.galleryMargin+'px');refresh.createPager()};setTimeout(function(){refresh.init()},0)},setHeight:function(ob,fade){var obj=null,$this=this;if(settings.loop){obj=ob.children('.lslide ').first()}else obj=ob.children().first();var setCss=function(){var tH=obj.outerHeight(),tP=0,tHT=tH;if(fade){tH=0;tP=(tHT*100)/elSize};ob.css({height:tH+'px','padding-bottom':tP+'%'})};setCss();if(obj.find('img').length){if(obj.find('img')[0].complete){setCss();if(!interval)$this.auto()}else obj.find('img').on('load',function(){setTimeout(function(){setCss();if(!interval)$this.auto()},100)})}else if(!interval)$this.auto()},active:function(ob,t){ob.find('a').attr('tabindex','-1');ob.removeClass('active').attr('aria-hidden','true');if(this.doCss()&&settings.mode==='fade')$slide.addClass('on');var sc=0;if(scene*settings.slideMove<length){ob.removeClass('active');if(!this.doCss()&&settings.mode==='fade'&&t===false)ob.fadeOut(settings.speed);if(t===true){sc=scene}else sc=scene*settings.slideMove;var l,nl;if(t===true){l=ob.length;nl=l-1;if(sc+1>=l)sc=nl};if(settings.loop===true&&settings.mode==='slide'){if(t===true){sc=scene-$el.find('.clone.left').length}else sc=scene*settings.slideMove;if(t===true){l=ob.length;nl=l-1;if(sc+1===l){sc=nl}else if(sc+1>l)sc=0}};if(!this.doCss()&&settings.mode==='fade'&&t===false)ob.eq(sc).fadeIn(settings.speed);ob.eq(sc).addClass('active').removeAttr('aria-hidden').find('a, button').removeAttr('tabindex')}else{ob.eq(ob.length-1).addClass('active').removeAttr('aria-hidden').find('a, button').removeAttr('tabindex');if(!this.doCss()&&settings.mode==='fade'&&t===false){ob.fadeOut(settings.speed);ob.eq(sc).fadeIn(settings.speed)}}},move:function(ob,v){if(settings.rtl===true)v=-v;if(this.doCss()){if(settings.vertical===true){ob.css({transform:'translate3d(0px, '+(-v)+'px, 0px)','-webkit-transform':'translate3d(0px, '+(-v)+'px, 0px)'})}else ob.css({transform:'translate3d('+(-v)+'px, 0px, 0px)','-webkit-transform':'translate3d('+(-v)+'px, 0px, 0px)'})}else if(settings.vertical===true){ob.css('position','relative').animate({top:-v+'px'},settings.speed,settings.easing)}else ob.css('position','relative').animate({left:-v+'px'},settings.speed,settings.easing);var $thumb=$slide.parent().find('.lSPager').find('li');this.active($thumb,true)},fade:function(){this.active($children,false);var $thumb=$slide.parent().find('.lSPager').find('li');this.active($thumb,true)},slide:function(){var $this=this;refresh.calSlide=function(){if(w>elSize){slideValue=$this.slideValue();$this.active($children,false);if(slideValue>w-elSize-settings.slideMargin){slideValue=w-elSize-settings.slideMargin}else if(slideValue<0)slideValue=0;$this.move($el,slideValue);if(settings.loop===true&&settings.mode==='slide'){if(scene>=(length-($el.find('.clone.left').length/settings.slideMove)))$this.resetSlide($el.find('.clone.left').length);if(scene===0)$this.resetSlide($slide.find('.lslide').length)}}};refresh.calSlide()},resetSlide:function(s){var $this=this;$slide.find('.lSAction button').addClass('disabled');setTimeout(function(){scene=s;$slide.css('transition-duration','0ms');slideValue=$this.slideValue();$this.active($children,false);plugin.move($el,slideValue);setTimeout(function(){$slide.css('transition-duration',settings.speed+'ms');$slide.find('.lSAction button').removeClass('disabled')},50)},settings.speed+100)},slideValue:function(){var _sV=0;if(settings.autoWidth===false){_sV=scene*((slideWidth+settings.slideMargin)*settings.slideMove)}else{_sV=0;for(var i=0;i<scene;i++)_sV+=(parseInt($children.eq(i).width())+settings.slideMargin)};return _sV},slideThumb:function(){var position;switch(settings.currentPagerPosition){case'left':position=0;break;case'middle':position=(elSize/2)-(thumbWidth/2);break;case'right':position=elSize-thumbWidth};var sc=scene-$el.find('.clone.left').length,$pager=$slide.parent().find('.lSPager');if(settings.mode==='slide'&&settings.loop===true)if(sc>=$pager.children().length){sc=0}else if(sc<0)sc=$pager.children().length;var thumbSlide=sc*(thumbWidth+settings.thumbMargin)-position;if((thumbSlide+elSize)>pagerWidth)thumbSlide=pagerWidth-elSize-settings.thumbMargin;if(thumbSlide<0)thumbSlide=0;this.move($pager,thumbSlide)},auto:function(){if(settings.auto){clearInterval(interval);interval=setInterval(function(){$el.goToNextSlide()},settings.pause)}},pauseOnHover:function(){var $this=this;if(settings.auto&&settings.pauseOnHover){$slide.on('mouseenter',function(){$(this).addClass('ls-hover');$el.pause();settings.auto=true});$slide.on('mouseleave',function(){$(this).removeClass('ls-hover');if(!$slide.find('.lightSlider').hasClass('lsGrabbing'))$this.auto()})}},touchMove:function(endCoords,startCoords){$slide.css('transition-duration','0ms');if(settings.mode==='slide'){var distance=endCoords-startCoords,swipeVal=slideValue-distance;if(swipeVal>=w-elSize-settings.slideMargin){if(settings.freeMove===false){swipeVal=w-elSize-settings.slideMargin}else{var swipeValT=w-elSize-settings.slideMargin;swipeVal=swipeValT+((swipeVal-swipeValT)/5)}}else if(swipeVal<0)if(settings.freeMove===false){swipeVal=0}else swipeVal=swipeVal/5;this.move($el,swipeVal)}},touchEnd:function(distance){$slide.css('transition-duration',settings.speed+'ms');if(settings.mode==='slide'){var mxVal=false,_next=true;slideValue=slideValue-distance;if(slideValue>w-elSize-settings.slideMargin){slideValue=w-elSize-settings.slideMargin;if(settings.autoWidth===false)mxVal=true}else if(slideValue<0)slideValue=0;var gC=function(next){var ad=0;if(!mxVal)if(next)ad=1;if(!settings.autoWidth){var num=slideValue/((slideWidth+settings.slideMargin)*settings.slideMove);scene=parseInt(num)+ad;if(slideValue>=(w-elSize-settings.slideMargin))if(num%1!==0)scene++}else{var tW=0;for(var i=0;i<$children.length;i++){tW+=(parseInt($children.eq(i).width())+settings.slideMargin);scene=i+ad;if(tW>=slideValue)break}}};if(distance>=settings.swipeThreshold){gC(false);_next=false}else if(distance<=-settings.swipeThreshold){gC(true);_next=false};$el.mode(_next);this.slideThumb()}else if(distance>=settings.swipeThreshold){$el.goToPrevSlide()}else if(distance<=-settings.swipeThreshold)$el.goToNextSlide()},enableDrag:function(){var $this=this;if(!isTouch){var startCoords=0,endCoords=0,isDraging=false;$slide.find('.lightSlider').addClass('lsGrab');$slide.on('mousedown',function(e){if(w<elSize)if(w!==0)return false;if($(e.target).attr('class')!=='lSPrev'&&$(e.target).attr('class')!=='lSNext'){startCoords=(settings.vertical===true)?e.pageY:e.pageX;isDraging=true;if(e.preventDefault){e.preventDefault()}else e.returnValue=false;$slide.scrollLeft+=1;$slide.scrollLeft-=1;$slide.find('.lightSlider').removeClass('lsGrab').addClass('lsGrabbing');clearInterval(interval)}});$(window).on('mousemove',function(e){if(isDraging){endCoords=(settings.vertical===true)?e.pageY:e.pageX;$this.touchMove(endCoords,startCoords)}});$(window).on('mouseup',function(e){if(isDraging){$slide.find('.lightSlider').removeClass('lsGrabbing').addClass('lsGrab');isDraging=false;endCoords=(settings.vertical===true)?e.pageY:e.pageX;var distance=endCoords-startCoords;if(Math.abs(distance)>=settings.swipeThreshold)$(window).on('click.ls',function(e){if(e.preventDefault){e.preventDefault()}else e.returnValue=false;e.stopImmediatePropagation();e.stopPropagation();$(window).off('click.ls')});$this.touchEnd(distance)}})}},enableTouch:function(){var $this=this;if(isTouch){var startCoords={},endCoords={};$slide.on('touchstart',function(e){endCoords=e.originalEvent.targetTouches[0];startCoords.pageX=e.originalEvent.targetTouches[0].pageX;startCoords.pageY=e.originalEvent.targetTouches[0].pageY;clearInterval(interval)});$slide.on('touchmove',function(e){if(w<elSize)if(w!==0)return false;var orig=e.originalEvent;endCoords=orig.targetTouches[0];var xMovement=Math.abs(endCoords.pageX-startCoords.pageX),yMovement=Math.abs(endCoords.pageY-startCoords.pageY);if(settings.vertical===true){if((yMovement*3)>xMovement)e.preventDefault();$this.touchMove(endCoords.pageY,startCoords.pageY)}else{if((xMovement*3)>yMovement)e.preventDefault();$this.touchMove(endCoords.pageX,startCoords.pageX)}});$slide.on('touchend',function(){if(w<elSize)if(w!==0)return false;var distance;if(settings.vertical===true){distance=endCoords.pageY-startCoords.pageY}else distance=endCoords.pageX-startCoords.pageX;$this.touchEnd(distance)})}},build:function(){var $this=this;$this.initialStyle();if(this.doCss()){if(settings.enableTouch===true)$this.enableTouch();if(settings.enableDrag===true)$this.enableDrag()};$(window).on('focus',function(){$this.auto()});$(window).on('blur',function(){clearInterval(interval)});$this.pager();$this.pauseOnHover();$this.controls();$this.keyPress()}};plugin.build();refresh.init=function(){refresh.chbreakpoint();if(settings.vertical===true){if(settings.item>1){elSize=settings.verticalHeight}else elSize=$children.outerHeight();$slide.css('height',elSize+'px')}else elSize=$slide.outerWidth();if(settings.loop===true&&settings.mode==='slide')refresh.clone();refresh.calL();if(settings.mode==='slide')$el.removeClass('lSSlide');if(settings.mode==='slide'){refresh.calSW();refresh.sSW()};setTimeout(function(){if(settings.mode==='slide')$el.addClass('lSSlide')},1e3);if(settings.pager)refresh.createPager();if(settings.adaptiveHeight===true&&settings.vertical===false)$el.css('height',$children.eq(scene).outerHeight(true));if(settings.adaptiveHeight===false)if(settings.mode==='slide'){if(settings.vertical===false){plugin.setHeight($el,false)}else plugin.auto()}else plugin.setHeight($el,true);if(settings.gallery===true)plugin.slideThumb();if(settings.mode==='slide')plugin.slide();if(settings.autoWidth===false){if($children.length<=settings.item){$slide.find('.lSAction').hide()}else $slide.find('.lSAction').show()}else if((refresh.calWidth(false)<elSize)&&(w!==0)){$slide.find('.lSAction').hide()}else $slide.find('.lSAction').show()};$el.goToPrevSlide=function(){if(scene>0){settings.onBeforePrevSlide.call(this,$el,scene);scene--;$el.mode(false);if(settings.gallery===true)plugin.slideThumb()}else if(settings.loop===true){settings.onBeforePrevSlide.call(this,$el,scene);if(settings.mode==='fade'){var l=(length-1);scene=parseInt(l/settings.slideMove)};$el.mode(false);if(settings.gallery===true)plugin.slideThumb()}else if(settings.slideEndAnimation===true){$el.addClass('leftEnd');setTimeout(function(){$el.removeClass('leftEnd')},400)}};$el.goToNextSlide=function(){var nextI=true;if(settings.mode==='slide'){var _slideValue=plugin.slideValue();nextI=_slideValue<w-elSize-settings.slideMargin};if(((scene*settings.slideMove)<length-settings.slideMove)&&nextI){settings.onBeforeNextSlide.call(this,$el,scene);scene++;$el.mode(false);if(settings.gallery===true)plugin.slideThumb()}else if(settings.loop===true){settings.onBeforeNextSlide.call(this,$el,scene);scene=0;$el.mode(false);if(settings.gallery===true)plugin.slideThumb()}else if(settings.slideEndAnimation===true){$el.addClass('rightEnd');setTimeout(function(){$el.removeClass('rightEnd')},400)}};$el.mode=function(_touch){if(settings.adaptiveHeight===true&&settings.vertical===false)$el.css('height',$children.eq(scene).outerHeight(true));if(on===false)if(settings.mode==='slide'){if(plugin.doCss()){$el.addClass('lSSlide');if(settings.speed!=='')$slide.css('transition-duration',settings.speed+'ms');if(settings.cssEasing!=='')$slide.css('transition-timing-function',settings.cssEasing)}}else if(plugin.doCss()){if(settings.speed!=='')$el.css('transition-duration',settings.speed+'ms');if(settings.cssEasing!=='')$el.css('transition-timing-function',settings.cssEasing)};if(!_touch)settings.onBeforeSlide.call(this,$el,scene);if(settings.mode==='slide'){plugin.slide()}else plugin.fade();if(!$slide.hasClass('ls-hover'))plugin.auto();setTimeout(function(){if(!_touch)settings.onAfterSlide.call(this,$el,scene)},settings.speed);on=true};$el.play=function(){$el.goToNextSlide();settings.auto=true;plugin.auto()};$el.pause=function(){settings.auto=false;clearInterval(interval)};$el.refresh=function(){refresh.init()};$el.getCurrentSlideCount=function(){var sc=scene;if(settings.loop){var ln=$slide.find('.lslide').length,cl=$el.find('.clone.left').length;if(scene<=cl-1){sc=ln+(scene-cl)}else if(scene>=(ln+cl)){sc=scene-ln-cl}else sc=scene-cl};return sc+1};$el.getTotalSlideCount=function(){return $slide.find('.lslide').length};$el.goToSlide=function(s){if(settings.loop){scene=(s+$el.find('.clone.left').length-1)}else scene=s;$el.mode(false);if(settings.gallery===true)plugin.slideThumb()};$el.destroy=function(){if($el.lightSlider){$el.goToPrevSlide=function(){};$el.goToNextSlide=function(){};$el.mode=function(){};$el.play=function(){};$el.pause=function(){};$el.refresh=function(){};$el.getCurrentSlideCount=function(){};$el.getTotalSlideCount=function(){};$el.goToSlide=function(){};$el.lightSlider=null;refresh={init:function(){}};$el.parent().parent().find('.lSAction, .lSPager').remove();$el.removeClass('lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right').removeAttr('style').unwrap().unwrap();$el.children().removeAttr('style');$children.removeClass('lslide active');$el.find('.clone').remove();$children=null;interval=null;on=false;scene=0}};setTimeout(function(){settings.onSliderLoad.call(this,$el)},10);$(window).on('resize orientationchange',function(e){setTimeout(function(){if(e.preventDefault){e.preventDefault()}else e.returnValue=false;refresh.init()},200)});return this}}(jQuery))}catch(err){console.log("An error occured initializing lightslider.js");console.log(err)}})
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/themes/custom/sitestudiobask/js/lightslider.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/themes/custom/sitestudiobask/js/contact-us.js. */

document.addEventListener('InitializeCustomJS', function(e){
    console.log("Initialize Script: contact-us.js");
    try {
        (function ($) {
            // correct regmark super scripting
            $(document).ready(function () {
                // Set up contact Us button trigger
                $(document).mouseup(function(e) 
                {
                  try {
                    var container = $("#contact-us-content-container, #contact-us-btn, #contact-us-btn-close");
                    if(container) {
                      // if the target of the click isn't the container nor a descendant of the container
                      if ((!container.is(e.target) && container.has(e.target).length === 0) && !isContactUsHidden()) 
                      {
                          var contactUsCloseButton = document.getElementById('contact-us-close-header-icon');
                          contactUsCloseButton.click();
                      }
                    }
                  }
                  catch(err){
                      console.log("ERROR: failed to set up contact us trigger");
                  }
                });
  
                contactUsButton();
            });
  
            function contactUsButton() {
                try {
                  // items in modal not foucasable by default
                  $('#contact-us-content-container a , #contact-us-content-container button').attr("tabindex", -1);
  
                  var contactUsBtn = document.getElementById('contact-us-btn');
                  var contactUsBtnClose = document.getElementById('contact-us-btn-close');
                  var contactUsCloseButton = document.getElementById('contact-us-close-header-icon');
  
                  let contactUsFocusArea = document.getElementById('contact-us-focus-wrapper');
                  let contactUsTrap = focusTrap(contactUsFocusArea, { escapeDeactivates: false });
  
                  contactUsBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    contactUsButtonClick(contactUsTrap)
                  });
                  contactUsBtnClose.addEventListener('click', function (e) {
                    e.stopPropagation();
                    contactUsButtonClick(contactUsTrap);
                  });
                  contactUsCloseButton.addEventListener('click', function (e) {
                    e.stopPropagation();
                    contactUsButtonClick(contactUsTrap)
                  });
                  contactUsBtnClose.style.display = "none";
                }
                catch(err){
                  console.log("ERROR: failed to bind up contact us click events");
                }
            }
  
            function contactUsButtonClick(contactUsTrap) {
                try {
                  var contactUsBtn = document.getElementById('contact-us-btn');
                  var contactUsBtnClose = document.getElementById('contact-us-btn-close');
                  if(contactUsBtn){
                      if(isContactUsHidden()) {
                          slideInContactUs();
                          contactUsBtn.classList.add("contact-us-open");
                          contactUsBtnClose.classList.add("contact-us-open");
                          contactUsBtnClose.style.display = 'flex';
                          contactUsTrap.activate();
                      }
                      else {
                          contactUsTrap.deactivate();
                          slideOutContactUs();
                          contactUsBtn.classList.remove("contact-us-open");
                      }
                  }
                }
                catch(err){
                  console.log(err);
                  console.log("ERROR: Exception in contact us button click");
                }
            }
  
            function slideInContactUs(event){
                $(document).ready(function () {
                    $('#contact-us-content-container').animate({
                        "margin-left": '0%'
                    });
                    $('#contact-us-content-container a, #contact-us-content-container button').removeAttr("tabindex");
                    
                    $('#contact-us-content-container').css('display', 'block');
                    $('#contact-us-btn').css('display', 'none'); 
                });
            }
  
            function slideOutContactUs(){
                $(document).ready(function () {
                    $('#contact-us-content-container').animate({
                        "margin-left": '120%'
                    }).promise().done(function () {
                    $('#contact-us-content-container a, #contact-us-content-container button').attr("tabindex", -1);

                    $('#contact-us-content-container').css('display', 'none');   
                    $('#contact-us-btn').css('display', 'flex');  
                    $('#contact-us-btn-close').css('display', 'none'); 
                    //$('#contact-us-btn').addClass("focusvisible");
                    $('#contact-us-btn').focus();
      
                    }) ;      
                });
            }
  
            function isContactUsHidden() {
                var contactUsBtn = document.getElementById('contact-us-btn');
                if(contactUsBtn) {
                  if (contactUsBtn.classList.contains("contact-us-open")){
                      return false;
                  }
                }
                return true;
            }
  
        })(jQuery);
    }
    catch(err){
        console.log("An error occured initializing contact-us.js");
        console.log(err);
    }
  });
  
  
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/themes/custom/sitestudiobask/js/contact-us.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.baskbank.com/themes/custom/sitestudiobask/js/acquia-lift-event-listeners.js. */
const initJS=new CustomEvent('InitializeCustomJS');const initMartechJS=new CustomEvent('InitializeMartechJS');document.addEventListener('InitializeCustomJS',function(e){console.log("InitializeCustomJS Event")});document.addEventListener('InitializeMartechJS',function(e){console.log("InitializeMartechJS Event")});var maxFailoverChecks=7,failoverChecks=0,maxLiftLibraryChecks=3,liftLibraryChecks=0;const AcquiaFailoverLoad=setInterval(function(){if(typeof AcquiaLift==="undefined")liftLibraryChecks++;if(liftLibraryChecks==maxLiftLibraryChecks){console.debug("lift library failed to load, revealing elements");revealAcquiaLiftElements()}else if(failoverChecks==maxFailoverChecks){console.debug("lift failed to initialize, revealing elements");revealAcquiaLiftElements()}else failoverChecks++},1e3);window.addEventListener('acquiaLiftStageCollection',function(e){console.debug('acquiaLiftStageCollection event occurred.');revealAcquiaLiftElements()})
function revealAcquiaLiftElements(){clearInterval(AcquiaFailoverLoad);jQuery('body').css('opacity','1');document.dispatchEvent(initJS);document.dispatchEvent(initMartechJS)}
/* Source and licensing information for the above line(s) can be found at https://www.baskbank.com/themes/custom/sitestudiobask/js/acquia-lift-event-listeners.js. */;
