/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/eventlistener.polyfills.js. */
this.Element&&Element.prototype.attachEvent&&!Element.prototype.addEventListener&&(function(){function addToPrototype(name,method){Window.prototype[name]=HTMLDocument.prototype[name]=Element.prototype[name]=method};addToPrototype("addEventListener",function(type,listener){var target=this,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];if(!typeListeners.length)target.attachEvent("on"+type,typeListeners.event=function(event){var documentElement=target.document&&target.document.documentElement||target.documentElement||{scrollLeft:0,scrollTop:0};event.currentTarget=target;event.pageX=event.clientX+documentElement.scrollLeft;event.pageY=event.clientY+documentElement.scrollTop;event.preventDefault=function(){event.returnValue=false};event.relatedTarget=event.fromElement||null;event.stopImmediatePropagation=function(){immediatePropagation=false;event.cancelBubble=true};event.stopPropagation=function(){event.cancelBubble=true};event.target=event.srcElement||target;event.timeStamp=+new Date();var plainEvt={};for(var i in event)plainEvt[i]=event[i];for(var i=0,typeListenersCache=[].concat(typeListeners),typeListenerCache,immediatePropagation=true;immediatePropagation&&(typeListenerCache=typeListenersCache[i]);++i)for(var ii=0,typeListener;typeListener=typeListeners[ii];++ii)if(typeListener==typeListenerCache){typeListener.call(target,plainEvt);break}});typeListeners.push(listener)});addToPrototype("removeEventListener",function(type,listener){var target=this,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];for(var i=typeListeners.length-1,typeListener;typeListener=typeListeners[i];--i)if(typeListener==listener){typeListeners.splice(i,1);break};if(!typeListeners.length&&typeListeners.event)target.detachEvent("on"+type,typeListeners.event)});addToPrototype("dispatchEvent",function(eventObject){var target=this,type=eventObject.type,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];try{return target.fireEvent("on"+type,eventObject)}catch(error){if(typeListeners.event)typeListeners.event(eventObject);return}});Object.defineProperty(Window.prototype,"CustomEvent",{get:function(){var self=this;return function CustomEvent(type,eventInitDict){var event=self.document.createEventObject(),key;event.type=type;for(key in eventInitDict)if(key=='cancelable'){event.returnValue=!eventInitDict.cancelable}else if(key=='bubbles'){event.cancelBubble=!eventInitDict.bubbles}else if(key=='detail')event.detail=eventInitDict.detail;return event}}})
function ready(event){if(ready.interval&&document.body){ready.interval=clearInterval(ready.interval);document.dispatchEvent(new CustomEvent("DOMContentLoaded"))}};ready.interval=setInterval(ready,1);window.addEventListener("load",ready)})();(!this.CustomEvent||typeof this.CustomEvent==="object")&&(function(){this.CustomEvent=function CustomEvent(type,eventInitDict){var event;eventInitDict=eventInitDict||{bubbles:false,cancelable:false,detail:undefined};try{event=document.createEvent('CustomEvent');event.initCustomEvent(type,eventInitDict.bubbles,eventInitDict.cancelable,eventInitDict.detail)}catch(error){event=document.createEvent('Event');event.initEvent(type,eventInitDict.bubbles,eventInitDict.cancelable);event.detail=eventInitDict.detail};return event}})()
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/eventlistener.polyfills.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/vanillajs.polyfills.js. */
if(window.NodeList&&!NodeList.prototype.forEach)NodeList.prototype.forEach=function(callback,thisArg){thisArg=thisArg||window;for(var i=0;i<this.length;i++)callback.call(thisArg,this[i],i,this)};if(!Object.keys)Object.keys=(function(){'use strict';var hasOwnProperty=Object.prototype.hasOwnProperty,hasDontEnumBug=!{toString:null}.propertyIsEnumerable('toString'),dontEnums=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','constructor'],dontEnumsLength=dontEnums.length;return function(obj){if(typeof obj!=='function'&&(typeof obj!=='object'||obj===null))throw new TypeError('Object.keys called on non-object');var result=[],prop,i;for(prop in obj)if(hasOwnProperty.call(obj,prop))result.push(prop);if(hasDontEnumBug)for(i=0;i<dontEnumsLength;i++)if(hasOwnProperty.call(obj,dontEnums[i]))result.push(dontEnums[i]);return result}}());if(!Array.prototype.forEach)Array.prototype.forEach=function(callback,thisArg){thisArg=thisArg||window;for(var i=0;i<this.length;i++)callback.call(thisArg,this[i],i,this)}
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/vanillajs.polyfills.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/smooth-scroll.polyfills.min.js. */
/*! smooth-scroll v16.1.0 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){if("function"==typeof window.CustomEvent)return;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e})(),(function(){for(var r=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-r)),a=window.setTimeout((function(){e(n+o)}),o);return r=n+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(q){"use strict";var I={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},F=function(){var n={};return Array.prototype.forEach.call(arguments,(function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t]}})),n},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(a):"\\"+n.charAt(a)}return"#"+r},L=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},x=function(e){return e?(t=e,parseInt(q.getComputedStyle(t).height,10)+e.offsetTop):0;var t},H=function(e,t,n,o){if(t.emitEvents&&"function"==typeof q.CustomEvent){var a=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:o}});document.dispatchEvent(a)}};return function(o,e){var A,a,O,C,M={};M.cancelScroll=function(e){cancelAnimationFrame(C),C=null,e||H("scrollCancel",A)},M.animateScroll=function(i,c,e){M.cancelScroll();var s=F(A||I,e||{}),u="[object Number]"===Object.prototype.toString.call(i),t=u||!i.tagName?null:i;if(u||t){var l=q.pageYOffset;s.header&&!O&&(O=document.querySelector(s.header));var n,o,a,m,r,d,f,h,p=x(O),g=u?i:(function(e,t,n,o){var a=0;if(e.offsetParent)for(;a+=e.offsetTop,e=e.offsetParent;);return a=Math.max(a-t-n,0),o&&(a=Math.min(a,L()-q.innerHeight)),a})(t,p,parseInt("function"==typeof s.offset?s.offset(i,c):s.offset,10),s.clip),y=g-l,v=L(),w=0,S=(n=y,a=(o=s).speedAsDuration?o.speed:Math.abs(n/1e3*o.speed),o.durationMax&&a>o.durationMax?o.durationMax:o.durationMin&&a<o.durationMin?o.durationMin:parseInt(a,10)),E=function(e,t){var n,o,a,r=q.pageYOffset;if(e==t||r==t||(l<t&&q.innerHeight+r)>=v)return M.cancelScroll(!0),o=t,a=u,0===(n=i)&&document.body.focus(),a||(n.focus(),document.activeElement!==n&&(n.setAttribute("tabindex","-1"),n.focus(),n.style.outline="none"),q.scrollTo(0,o)),H("scrollStop",s,i,c),!(C=m=null)},b=function(e){var t,n,o;m||(m=e),w+=e-m,d=l+y*(n=r=1<(r=0===S?0:w/S)?1:r,"easeInQuad"===(t=s).easing&&(o=n*n),"easeOutQuad"===t.easing&&(o=n*(2-n)),"easeInOutQuad"===t.easing&&(o=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===t.easing&&(o=n*n*n),"easeOutCubic"===t.easing&&(o=--n*n*n+1),"easeInOutCubic"===t.easing&&(o=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===t.easing&&(o=n*n*n*n),"easeOutQuart"===t.easing&&(o=1- --n*n*n*n),"easeInOutQuart"===t.easing&&(o=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===t.easing&&(o=n*n*n*n*n),"easeOutQuint"===t.easing&&(o=1+--n*n*n*n*n),"easeInOutQuint"===t.easing&&(o=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),t.customEasing&&(o=t.customEasing(n)),o||n),q.scrollTo(0,Math.floor(d)),E(d,g)||(C=q.requestAnimationFrame(b),m=e)};0===q.pageYOffset&&q.scrollTo(0,0),f=i,h=s,u||history.pushState&&h.updateURL&&history.pushState({smoothScroll:JSON.stringify(h),anchor:f.id},document.title,f===document.documentElement?"#top":"#"+f.id),"matchMedia"in q&&q.matchMedia("(prefers-reduced-motion)").matches?q.scrollTo(0,Math.floor(g)):(H("scrollStart",s,i,c),M.cancelScroll(!0),q.requestAnimationFrame(b))}};var t=function(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(a=e.target.closest(o))&&"a"===a.tagName.toLowerCase()&&!e.target.closest(A.ignore)&&a.hostname===q.location.hostname&&a.pathname===q.location.pathname&&/#/.test(a.href)){var t,n=r(a.hash);if("#"===n){if(!A.topOnEmptyHash)return;t=document.documentElement}else t=document.querySelector(n);(t=t||"#top"!==n?t:document.documentElement)&&(e.preventDefault(),(function(e){if(history.replaceState&&e.updateURL&&!history.state){var t=q.location.hash;t=t||"",history.replaceState({smoothScroll:JSON.stringify(e),anchor:t||q.pageYOffset},document.title,t||q.location.href)}})(A),M.animateScroll(t,a))}},n=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(A)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(r(history.state.anchor)))||M.animateScroll(t,null,{updateURL:!1})}};M.destroy=function(){A&&(document.removeEventListener("click",t,!1),q.removeEventListener("popstate",n,!1),M.cancelScroll(),C=O=a=A=null)};return (function(){if(!("querySelector"in document&&"addEventListener"in q&&"requestAnimationFrame"in q&&"closest"in q.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";M.destroy(),A=F(I,e||{}),O=A.header?document.querySelector(A.header):null,document.addEventListener("click",t,!1),A.updateURL&&A.popstate&&q.addEventListener("popstate",n,!1)})(),M}}));
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/themes/custom/sitestudiobask/js/smooth-scroll.polyfills.min.js. */;