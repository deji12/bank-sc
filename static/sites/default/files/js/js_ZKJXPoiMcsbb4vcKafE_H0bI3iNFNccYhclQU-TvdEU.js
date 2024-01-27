/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/plugins.js. */
function initializePlugin(){(function($){var splitVersion=$.fn.jquery.split("."),major=parseInt(splitVersion[0]),minor=parseInt(splitVersion[1]),JQ_LT_17=(major<1)||(major==1&&minor<7)
function eventsData($el){return JQ_LT_17?$el.data('events'):$._data($el[0]).events}
function moveHandlerToTop($el,eventName,isDelegated){var data=eventsData($el),events=data[eventName];if(!JQ_LT_17){var handler=isDelegated?events.splice(events.delegateCount-1,1)[0]:events.pop();events.splice(isDelegated?0:(events.delegateCount||0),0,handler);return};if(isDelegated){data.live.unshift(data.live.pop())}else events.unshift(events.pop())}
function moveEventHandlers($elems,eventsString,isDelegate){var events=eventsString.split(/\s+/);$elems.each(function(){for(var i=0;i<events.length;++i){var pureEventName=$.trim(events[i]).match(/[^\.]+/i)[0];moveHandlerToTop($(this),pureEventName,isDelegate)}})}
function makeMethod(methodName){$.fn[methodName+'First']=function(){var args=$.makeArray(arguments),eventsString=args.shift();if(eventsString){$.fn[methodName].apply(this,arguments);moveEventHandlers(this,eventsString)};return this}};makeMethod('bind');makeMethod('one');$.fn.delegateFirst=function(){var args=$.makeArray(arguments),eventsString=args[1];if(eventsString){args.splice(0,2);$.fn.delegate.apply(this,arguments);moveEventHandlers(this,eventsString,true)};return this};$.fn.liveFirst=function(){var args=$.makeArray(arguments);args.unshift(this.selector);$.fn.delegateFirst.apply($(document),args);return this};if(!JQ_LT_17)$.fn.onFirst=function(types,selector){var $el=$(this),isDelegated=typeof selector==='string';$.fn.on.apply($el,arguments);if(typeof types==='object'){for(type in types)if(types.hasOwnProperty(type))moveEventHandlers($el,type,isDelegated)}else if(typeof types==='string')moveEventHandlers($el,types,isDelegated);return $el}})(jQuery)}
function createOverlay(overlayElements){jQuery(document).mouseup(function(e){var container=jQuery("div.overlay-content-inner");if(!container.is(e.target)&&container.has(e.target).length===0){overlayClose();if(leavingTrap)leavingTrap.deactivate()}});var body=jQuery("body"),overlayCanvas=jQuery('<div class="overlay-canvas"></div>'),overlay=jQuery('<div class="overlay" role="dialog" aria-labelledby="overlay-header" aria-modal="true"></div>'),overlayContent=jQuery('<div class="overlay-content"></div>'),overlayInner=jQuery('<div class="overlay-content-inner"></div>');jQuery.each(overlayElements,function(index,element){overlayInner.append(element)});overlayContent.append(overlayInner);overlay.append(overlayContent);body.append(overlayCanvas);body.append(overlay);body.css("overflow","hidden")}
function overlayClose(){jQuery('div.overlay,div.overlay-canvas').remove();jQuery('body').css('overflow','auto')};(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else g=this;g.focusTrap=f()}})(function(){var define,module,exports;return(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f};var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)};return n[o].exports};var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var tabbable=require('tabbable'),listeningFocusTrap=null
function focusTrap(element,userOptions){var tabbableNodes=[],firstTabbableNode=null,lastTabbableNode=null,nodeFocusedBeforeActivation=null,active=false,paused=false,tabEvent=null,container=(typeof element==='string')?document.querySelector(element):element,config=userOptions||{};config.returnFocusOnDeactivate=(userOptions&&userOptions.returnFocusOnDeactivate!==undefined)?userOptions.returnFocusOnDeactivate:true;config.escapeDeactivates=(userOptions&&userOptions.escapeDeactivates!==undefined)?userOptions.escapeDeactivates:true;var trap={activate:activate,deactivate:deactivate,pause:pause,unpause:unpause};return trap
function activate(activateOptions){if(active)return;var defaultedActivateOptions={onActivate:(activateOptions&&activateOptions.onActivate!==undefined)?activateOptions.onActivate:config.onActivate};active=true;paused=false;nodeFocusedBeforeActivation=document.activeElement;if(defaultedActivateOptions.onActivate)defaultedActivateOptions.onActivate();addListeners();return trap}
function deactivate(deactivateOptions){if(!active)return;var defaultedDeactivateOptions={returnFocus:(deactivateOptions&&deactivateOptions.returnFocus!==undefined)?deactivateOptions.returnFocus:config.returnFocusOnDeactivate,onDeactivate:(deactivateOptions&&deactivateOptions.onDeactivate!==undefined)?deactivateOptions.onDeactivate:config.onDeactivate};removeListeners();if(defaultedDeactivateOptions.onDeactivate)defaultedDeactivateOptions.onDeactivate();if(defaultedDeactivateOptions.returnFocus)setTimeout(function(){tryFocus(nodeFocusedBeforeActivation)},0);active=false;paused=false;return this}
function pause(){if(paused||!active)return;paused=true;removeListeners()}
function unpause(){if(!paused||!active)return;paused=false;addListeners()}
function addListeners(){if(!active)return;if(listeningFocusTrap)listeningFocusTrap.pause();listeningFocusTrap=trap;updateTabbableNodes();tryFocus(firstFocusNode());document.addEventListener('focus',checkFocus,true);document.addEventListener('click',checkClick,true);document.addEventListener('mousedown',checkPointerDown,true);document.addEventListener('touchstart',checkPointerDown,true);document.addEventListener('keydown',checkKey,true);return trap}
function removeListeners(){if(!active||listeningFocusTrap!==trap)return;document.removeEventListener('focus',checkFocus,true);document.removeEventListener('click',checkClick,true);document.removeEventListener('mousedown',checkPointerDown,true);document.removeEventListener('touchstart',checkPointerDown,true);document.removeEventListener('keydown',checkKey,true);listeningFocusTrap=null;return trap}
function getNodeForOption(optionName){var optionValue=config[optionName],node=optionValue;if(!optionValue)return null;if(typeof optionValue==='string'){node=document.querySelector(optionValue);if(!node)throw new Error('`'+optionName+'` refers to no known node')};if(typeof optionValue==='function'){node=optionValue();if(!node)throw new Error('`'+optionName+'` did not return a node')};return node}
function firstFocusNode(){var node;if(getNodeForOption('initialFocus')!==null){node=getNodeForOption('initialFocus')}else if(container.contains(document.activeElement)){node=document.activeElement}else node=tabbableNodes[0]||getNodeForOption('fallbackFocus');if(!node)throw new Error('You can\'t have a focus-trap without at least one focusable element');return node}
function checkPointerDown(e){if(config.clickOutsideDeactivates&&!container.contains(e.target))deactivate({returnFocus:false})}
function checkClick(e){if(config.clickOutsideDeactivates)return;if(container.contains(e.target))return;e.preventDefault();e.stopImmediatePropagation()}
function checkFocus(e){if(container.contains(e.target))return;e.preventDefault();e.stopImmediatePropagation();if(typeof e.target.blur==='function')e.target.blur();if(tabEvent)readjustFocus(tabEvent)}
function checkKey(e){if(e.key==='Tab'||e.keyCode===9)handleTab(e);if(config.escapeDeactivates!==false&&isEscapeEvent(e))deactivate()}
function handleTab(e){updateTabbableNodes();if(e.target.hasAttribute('tabindex')&&Number(e.target.getAttribute('tabindex'))<0)return tabEvent=e;e.preventDefault();var currentFocusIndex=tabbableNodes.indexOf(e.target);if(e.shiftKey){if(e.target===firstTabbableNode||tabbableNodes.indexOf(e.target)===-1)return tryFocus(lastTabbableNode);return tryFocus(tabbableNodes[currentFocusIndex-1])};if(e.target===lastTabbableNode)return tryFocus(firstTabbableNode);tryFocus(tabbableNodes[currentFocusIndex+1])}
function updateTabbableNodes(){tabbableNodes=tabbable(container);firstTabbableNode=tabbableNodes[0];lastTabbableNode=tabbableNodes[tabbableNodes.length-1]}
function readjustFocus(e){if(e.shiftKey)return tryFocus(lastTabbableNode);tryFocus(firstTabbableNode)}}
function isEscapeEvent(e){return e.key==='Escape'||e.key==='Esc'||e.keyCode===27}
function tryFocus(node){if(!node||!node.focus)return;if(node===document.activeElement)return;node.focus();if(node.tagName.toLowerCase()==='input')node.select()};module.exports=focusTrap},{tabbable:2}],2:[function(require,module,exports){module.exports=function(el){var basicTabbables=[],orderedTabbables=[],isUnavailable=createIsUnavailable(),candidateSelectors=['input','select','a[href]','textarea','button','[tabindex]'],candidates=el.querySelectorAll(candidateSelectors),candidate,candidateIndex;for(var i=0,l=candidates.length;i<l;i++){candidate=candidates[i];candidateIndex=candidate.tabIndex;if(candidateIndex<0||(candidate.tagName==='INPUT'&&candidate.type==='hidden')||candidate.disabled||isUnavailable(candidate))continue;if(candidateIndex===0){basicTabbables.push(candidate)}else orderedTabbables.push({tabIndex:candidateIndex,node:candidate})};var tabbableNodes=orderedTabbables.sort(function(a,b){return a.tabIndex-b.tabIndex}).map(function(a){return a.node});Array.prototype.push.apply(tabbableNodes,basicTabbables);return tabbableNodes}
function createIsUnavailable(){var isOffCache=[]
function isOff(node,nodeComputedStyle){if(node===document.documentElement)return false;for(var i=0,length=isOffCache.length;i<length;i++)if(isOffCache[i][0]===node)return isOffCache[i][1];nodeComputedStyle=nodeComputedStyle||window.getComputedStyle(node);var result=false;if(nodeComputedStyle.display==='none'){result=true}else if(node.parentNode)result=isOff(node.parentNode);isOffCache.push([node,result]);return result};return function isUnavailable(node){if(node===document.documentElement)return false;var computedStyle=window.getComputedStyle(node);if(isOff(node,computedStyle))return true;return computedStyle.visibility==='hidden'}}},{}]},{},[1])(1)})
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/plugins.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/ie11.js. */
(function(IE,undefined){IE.IEfixApplied=false;IE.version=function(){var sAgent=window.navigator.userAgent,Idx=sAgent.indexOf("MSIE");if(Idx>0){return parseInt(sAgent.substring(Idx+5,sAgent.indexOf(".",Idx)))}else if(!!navigator.userAgent.match(/Trident\/7\./)){return 11}else return 0};IE.isIE=IE.version()!==0;IE.fix=function(){if(!IE.IEfixApplied){var ieVersion=IE.version();if(ieVersion>0&&ieVersion<=11){initializePlugin();jQuery(".loginLink").bindFirst("click",IE.confirmNav);jQuery(".open-account").bindFirst("click",IE.confirmNav);IE.warningPopup()};if(ieVersion==11)document.body.classList.add('IE11');IE.IEfixApplied=true}};IE.warningPopup=function(){var container=jQuery('<div class="modal-ie"></div>'),overlayHeader=jQuery('<h1 class="text__title tcb-primary-color text-center">You appear to be using Internet Explorer</h1>'),overlayText=jQuery('<p>To optimize your experience, we recommend switching to one of the following web browsers:</p><ul><li>Google Chrome</li><li>Microsoft Edge</li><li>Apple Safari</li><li>Mozilla Firefox</li></ul>'),overlayClose=jQuery('<div class="text-center"><button onclick="overlayClose();" class="overlay-close tcb-big-btn">Dismiss</button></div>');container.append(overlayHeader).append(overlayText).append(overlayClose);createOverlay([container])};IE.confirmNav=function(event){event.preventDefault();event.stopImmediatePropagation();var href=event.target.closest('a').getAttribute('href'),container=jQuery('<div class="modal-ie"></div>'),overlayHeader=jQuery('<h1 class="text__title tcb-primary-color text-center">You appear to be using Internet Explorer</h1>'),overlayText=jQuery('<p>To optimize your experience, we recommend switching to one of the following web browsers:</p><ul><li>Google Chrome</li><li>Microsoft Edge</li><li>Apple Safari</li><li>Mozilla Firefox</li></ul>'),overlayClose=jQuery('<div class="text-center"><button onclick="overlayClose();" class="overlay-close tcb-big-btn">cancel</button></div>'),overlayProceed=jQuery("<div class='text-center modal-ie--login'><a href=\""+href+"\" class='orange-link'>Continue</a></div>");container.append(overlayHeader).append(overlayText).append(overlayClose).append(overlayProceed);createOverlay([container])}})(window.IE=window.IE||{});document.addEventListener('InitializeCustomJS',function(e){console.log("Initialize Script: ie11.js");try{if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(event){IE.fix()})}else IE.fix()}catch(err){console.log("An error occured initializing ie11.js");console.log(err)}})
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/ie11.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/embedded_video.js. */
document.addEventListener('InitializeCustomJS',function(e){(function($){$(document).ready(function(){$('.bask__video-embed iframe').each(function(){$(this).attr('title','video')})})})(jQuery)})
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/embedded_video.js. */;