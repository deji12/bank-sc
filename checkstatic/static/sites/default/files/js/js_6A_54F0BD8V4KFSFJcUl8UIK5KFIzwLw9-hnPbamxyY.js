/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/intersectionobserver/intersection-observer.js. */
(function(window,document){'use strict';if('IntersectionObserver'in window&&'IntersectionObserverEntry'in window&&'intersectionRatio'in window.IntersectionObserverEntry.prototype){if(!('isIntersecting'in window.IntersectionObserverEntry.prototype))Object.defineProperty(window.IntersectionObserverEntry.prototype,'isIntersecting',{get:function(){return this.intersectionRatio>0}});return};var registry=[]
function IntersectionObserverEntry(entry){this.time=entry.time;this.target=entry.target;this.rootBounds=entry.rootBounds;this.boundingClientRect=entry.boundingClientRect;this.intersectionRect=entry.intersectionRect||getEmptyRect();this.isIntersecting=!!entry.intersectionRect;var targetRect=this.boundingClientRect,targetArea=targetRect.width*targetRect.height,intersectionRect=this.intersectionRect,intersectionArea=intersectionRect.width*intersectionRect.height;if(targetArea){this.intersectionRatio=Number((intersectionArea/targetArea).toFixed(4))}else this.intersectionRatio=this.isIntersecting?1:0}
function IntersectionObserver(callback,opt_options){var options=opt_options||{};if(typeof callback!='function')throw new Error('callback must be a function');if(options.root&&options.root.nodeType!=1)throw new Error('root must be an Element');this._checkForIntersections=throttle(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT);this._callback=callback;this._observationTargets=[];this._queuedEntries=[];this._rootMarginValues=this._parseRootMargin(options.rootMargin);this.thresholds=this._initThresholds(options.threshold);this.root=options.root||null;this.rootMargin=this._rootMarginValues.map(function(margin){return margin.value+margin.unit}).join(' ')};IntersectionObserver.prototype.THROTTLE_TIMEOUT=100;IntersectionObserver.prototype.POLL_INTERVAL=null;IntersectionObserver.prototype.USE_MUTATION_OBSERVER=true;IntersectionObserver.prototype.observe=function(target){var isTargetAlreadyObserved=this._observationTargets.some(function(item){return item.element==target});if(isTargetAlreadyObserved)return;if(!(target&&target.nodeType==1))throw new Error('target must be an Element');this._registerInstance();this._observationTargets.push({element:target,entry:null});this._monitorIntersections();this._checkForIntersections()};IntersectionObserver.prototype.unobserve=function(target){this._observationTargets=this._observationTargets.filter(function(item){return item.element!=target});if(!this._observationTargets.length){this._unmonitorIntersections();this._unregisterInstance()}};IntersectionObserver.prototype.disconnect=function(){this._observationTargets=[];this._unmonitorIntersections();this._unregisterInstance()};IntersectionObserver.prototype.takeRecords=function(){var records=this._queuedEntries.slice();this._queuedEntries=[];return records};IntersectionObserver.prototype._initThresholds=function(opt_threshold){var threshold=opt_threshold||[0];if(!Array.isArray(threshold))threshold=[threshold];return threshold.sort().filter(function(t,i,a){if(typeof t!='number'||isNaN(t)||t<0||t>1)throw new Error('threshold must be a number between 0 and 1 inclusively');return t!==a[i-1]})};IntersectionObserver.prototype._parseRootMargin=function(opt_rootMargin){var marginString=opt_rootMargin||'0px',margins=marginString.split(/\s+/).map(function(margin){var parts=/^(-?\d*\.?\d+)(px|%)$/.exec(margin);if(!parts)throw new Error('rootMargin must be specified in pixels or percent');return{value:parseFloat(parts[1]),unit:parts[2]}});margins[1]=margins[1]||margins[0];margins[2]=margins[2]||margins[0];margins[3]=margins[3]||margins[1];return margins};IntersectionObserver.prototype._monitorIntersections=function(){if(!this._monitoringIntersections){this._monitoringIntersections=true;if(this.POLL_INTERVAL){this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL)}else{addEvent(window,'resize',this._checkForIntersections,true);addEvent(document,'scroll',this._checkForIntersections,true);if(this.USE_MUTATION_OBSERVER&&'MutationObserver'in window){this._domObserver=new MutationObserver(this._checkForIntersections);this._domObserver.observe(document,{attributes:true,childList:true,characterData:true,subtree:true})}}}};IntersectionObserver.prototype._unmonitorIntersections=function(){if(this._monitoringIntersections){this._monitoringIntersections=false;clearInterval(this._monitoringInterval);this._monitoringInterval=null;removeEvent(window,'resize',this._checkForIntersections,true);removeEvent(document,'scroll',this._checkForIntersections,true);if(this._domObserver){this._domObserver.disconnect();this._domObserver=null}}};IntersectionObserver.prototype._checkForIntersections=function(){var rootIsInDom=this._rootIsInDom(),rootRect=rootIsInDom?this._getRootRect():getEmptyRect();this._observationTargets.forEach(function(item){var target=item.element,targetRect=getBoundingClientRect(target),rootContainsTarget=this._rootContainsTarget(target),oldEntry=item.entry,intersectionRect=rootIsInDom&&rootContainsTarget&&this._computeTargetAndRootIntersection(target,rootRect),newEntry=item.entry=new IntersectionObserverEntry({time:now(),target:target,boundingClientRect:targetRect,rootBounds:rootRect,intersectionRect:intersectionRect});if(!oldEntry){this._queuedEntries.push(newEntry)}else if(rootIsInDom&&rootContainsTarget){if(this._hasCrossedThreshold(oldEntry,newEntry))this._queuedEntries.push(newEntry)}else if(oldEntry&&oldEntry.isIntersecting)this._queuedEntries.push(newEntry)},this);if(this._queuedEntries.length)this._callback(this.takeRecords(),this)};IntersectionObserver.prototype._computeTargetAndRootIntersection=function(target,rootRect){if(window.getComputedStyle(target).display=='none')return;var targetRect=getBoundingClientRect(target),intersectionRect=targetRect,parent=getParentNode(target),atRoot=false;while(!atRoot){var parentRect=null,parentComputedStyle=parent.nodeType==1?window.getComputedStyle(parent):{};if(parentComputedStyle.display=='none')return;if(parent==this.root||parent==document){atRoot=true;parentRect=rootRect}else if(parent!=document.body&&parent!=document.documentElement&&parentComputedStyle.overflow!='visible')parentRect=getBoundingClientRect(parent);if(parentRect){intersectionRect=computeRectIntersection(parentRect,intersectionRect);if(!intersectionRect)break};parent=getParentNode(parent)};return intersectionRect};IntersectionObserver.prototype._getRootRect=function(){var rootRect;if(this.root){rootRect=getBoundingClientRect(this.root)}else{var html=document.documentElement,body=document.body;rootRect={top:0,left:0,right:html.clientWidth||body.clientWidth,width:html.clientWidth||body.clientWidth,bottom:html.clientHeight||body.clientHeight,height:html.clientHeight||body.clientHeight}};return this._expandRectByRootMargin(rootRect)};IntersectionObserver.prototype._expandRectByRootMargin=function(rect){var margins=this._rootMarginValues.map(function(margin,i){return margin.unit=='px'?margin.value:margin.value*(i%2?rect.width:rect.height)/100}),newRect={top:rect.top-margins[0],right:rect.right+margins[1],bottom:rect.bottom+margins[2],left:rect.left-margins[3]};newRect.width=newRect.right-newRect.left;newRect.height=newRect.bottom-newRect.top;return newRect};IntersectionObserver.prototype._hasCrossedThreshold=function(oldEntry,newEntry){var oldRatio=oldEntry&&oldEntry.isIntersecting?oldEntry.intersectionRatio||0:-1,newRatio=newEntry.isIntersecting?newEntry.intersectionRatio||0:-1;if(oldRatio===newRatio)return;for(var i=0;i<this.thresholds.length;i++){var threshold=this.thresholds[i];if(threshold==oldRatio||threshold==newRatio||threshold<oldRatio!==threshold<newRatio)return true}};IntersectionObserver.prototype._rootIsInDom=function(){return!this.root||containsDeep(document,this.root)};IntersectionObserver.prototype._rootContainsTarget=function(target){return containsDeep(this.root||document,target)};IntersectionObserver.prototype._registerInstance=function(){if(registry.indexOf(this)<0)registry.push(this)};IntersectionObserver.prototype._unregisterInstance=function(){var index=registry.indexOf(this);if(index!=-1)registry.splice(index,1)}
function now(){return window.performance&&performance.now&&performance.now()}
function throttle(fn,timeout){var timer=null;return function(){if(!timer)timer=setTimeout(function(){fn();timer=null},timeout)}}
function addEvent(node,event,fn,opt_useCapture){if(typeof node.addEventListener=='function'){node.addEventListener(event,fn,opt_useCapture||false)}else if(typeof node.attachEvent=='function')node.attachEvent('on'+event,fn)}
function removeEvent(node,event,fn,opt_useCapture){if(typeof node.removeEventListener=='function'){node.removeEventListener(event,fn,opt_useCapture||false)}else if(typeof node.detatchEvent=='function')node.detatchEvent('on'+event,fn)}
function computeRectIntersection(rect1,rect2){var top=Math.max(rect1.top,rect2.top),bottom=Math.min(rect1.bottom,rect2.bottom),left=Math.max(rect1.left,rect2.left),right=Math.min(rect1.right,rect2.right),width=right-left,height=bottom-top;return(width>=0&&height>=0)&&{top:top,bottom:bottom,left:left,right:right,width:width,height:height}}
function getBoundingClientRect(el){var rect;try{rect=el.getBoundingClientRect()}catch(err){};if(!rect)return getEmptyRect();if(!(rect.width&&rect.height))rect={top:rect.top,right:rect.right,bottom:rect.bottom,left:rect.left,width:rect.right-rect.left,height:rect.bottom-rect.top};return rect}
function getEmptyRect(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}
function containsDeep(parent,child){var node=child;while(node){if(node==parent)return true;node=getParentNode(node)};return false}
function getParentNode(node){var parent=node.parentNode;if(parent&&parent.nodeType==11&&parent.host)return parent.host;return parent};window.IntersectionObserver=IntersectionObserver;window.IntersectionObserverEntry=IntersectionObserverEntry}(window,document))
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/intersectionobserver/intersection-observer.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/lazyload/lazyload.min.js. */
function _extends(){return(_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.LazyLoad=e()}(this,function(){"use strict";var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),n=t&&"IntersectionObserver"in window,o=t&&"classList"in document.createElement("p"),r={elements_selector:"img",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null,use_native:!1},a=function(t,e){var n,o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)};var i=function(t,e){return t.getAttribute("data-"+e)},s=function(t,e,n){var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)},c=function(t){return"true"===i(t,"was-processed")},l=function(t,e){return s(t,"ll-timeout",e)},u=function(t){return i(t,"ll-timeout")},d=function(t,e){t&&t(e)},f=function(t,e){t._loadingCount+=e,0===t._elements.length&&0===t._loadingCount&&d(t._settings.callback_finish)},_=function(t){for(var e,n=[],o=0;e=t.children[o];o+=1)"SOURCE"===e.tagName&&n.push(e);return n},v=function(t,e,n){n&&t.setAttribute(e,n)},g=function(t,e){v(t,"sizes",i(t,e.data_sizes)),v(t,"srcset",i(t,e.data_srcset)),v(t,"src",i(t,e.data_src))},m={IMG:function(t,e){var n=t.parentNode;n&&"PICTURE"===n.tagName&&_(n).forEach(function(t){g(t,e)});g(t,e)},IFRAME:function(t,e){v(t,"src",i(t,e.data_src))},VIDEO:function(t,e){_(t).forEach(function(t){v(t,"src",i(t,e.data_src))}),v(t,"src",i(t,e.data_src)),t.load()}},b=function(t,e){var n,o,r=e._settings,a=t.tagName,s=m[a];if(s)return s(t,r),f(e,1),void(e._elements=(n=e._elements,o=t,n.filter(function(t){return t!==o})));!function(t,e){var n=i(t,e.data_src),o=i(t,e.data_bg);n&&(t.style.backgroundImage='url("'.concat(n,'")')),o&&(t.style.backgroundImage=o)}(t,r)},h=function(t,e){o?t.classList.add(e):t.className+=(t.className?" ":"")+e},p=function(t,e,n){t.addEventListener(e,n)},y=function(t,e,n){t.removeEventListener(e,n)},E=function(t,e,n){y(t,"load",e),y(t,"loadeddata",e),y(t,"error",n)},w=function(t,e,n){var r=n._settings,a=e?r.class_loaded:r.class_error,i=e?r.callback_loaded:r.callback_error,s=t.target;!function(t,e){o?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")}(s,r.class_loading),h(s,a),d(i,s),f(n,-1)},I=function(t,e){var n=function n(r){w(r,!0,e),E(t,n,o)},o=function o(r){w(r,!1,e),E(t,n,o)};!function(t,e,n){p(t,"load",e),p(t,"loadeddata",e),p(t,"error",n)}(t,n,o)},k=["IMG","IFRAME","VIDEO"],A=function(t,e){var n=e._observer;z(t,e),n&&e._settings.auto_unobserve&&n.unobserve(t)},L=function(t){var e=u(t);e&&(clearTimeout(e),l(t,null))},x=function(t,e){var n=e._settings.load_delay,o=u(t);o||(o=setTimeout(function(){A(t,e),L(t)},n),l(t,o))},z=function(t,e,n){var o=e._settings;!n&&c(t)||(k.indexOf(t.tagName)>-1&&(I(t,e),h(t,o.class_loading)),b(t,e),function(t){s(t,"was-processed","true")}(t),d(o.callback_reveal,t),d(o.callback_set,t))},O=function(t){return!!n&&(t._observer=new IntersectionObserver(function(e){e.forEach(function(e){return function(t){return t.isIntersecting||t.intersectionRatio>0}(e)?function(t,e){var n=e._settings;d(n.callback_enter,t),n.load_delay?x(t,e):A(t,e)}(e.target,t):function(t,e){var n=e._settings;d(n.callback_exit,t),n.load_delay&&L(t)}(e.target,t)})},{root:(e=t._settings).container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}),!0);var e},N=["IMG","IFRAME"],C=function(t,e){return function(t){return t.filter(function(t){return!c(t)})}((n=t||function(t){return t.container.querySelectorAll(t.elements_selector)}(e),Array.prototype.slice.call(n)));var n},M=function(t,e){this._settings=function(t){return _extends({},r,t)}(t),this._loadingCount=0,O(this),this.update(e)};return M.prototype={update:function(t){var n,o=this,r=this._settings;(this._elements=C(t,r),!e&&this._observer)?(function(t){return t.use_native&&"loading"in HTMLImageElement.prototype}(r)&&((n=this)._elements.forEach(function(t){-1!==N.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),z(t,n))}),this._elements=C(t,r)),this._elements.forEach(function(t){o._observer.observe(t)})):this.loadAll()},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(t,e){z(t,this,e)},loadAll:function(){var t=this;this._elements.forEach(function(e){A(e,t)})}},t&&function(t,e){if(e)if(e.length)for(var n,o=0;n=e[o];o+=1)a(t,n);else a(t,e)}(M,window.lazyLoadOptions),M});

/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/lazyload/lazyload.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/image/init.lazyload.js. */
(function($,Drupal){"use strict";Drupal.behaviors.CohesionLazyLoad={attach:function(context,settings){function isScrollable(el){return(el.scrollWidth>el.clientWidth&&(getComputedStyle(el).overflowY==='auto'||getComputedStyle(el).overflowY==='scroll'))||(el.scrollHeight>el.clientHeight&&(getComputedStyle(el).overflowX==='auto'||getComputedStyle(el).overflowX==='scroll'))||el.tagName==='HTML'};$.each($('[loading=lazy]',context).once(),function(){var $this=$(this);$this.parents().each(function(){var $parent=$(this);if($parent.data('lazyContainerFound')===true){if($parent.data('llContainer'))$parent.data('llContainer').update();return false}else if(isScrollable(this)){$parent.data('lazyContainerFound',true);var llContainer=new LazyLoad({container:this.tagName==='HTML'?document:this,elements_selector:"[loading=lazy]",class_loading:'coh-lazy-loading',class_loaded:'coh-lazy-loaded',class_error:'coh-lazy-error',use_native:true});$parent.data('llContainer',llContainer);return false}});$this.on('load',function(){if($(this).length)$.fn.matchHeight._update()})})}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/image/init.lazyload.js. */;