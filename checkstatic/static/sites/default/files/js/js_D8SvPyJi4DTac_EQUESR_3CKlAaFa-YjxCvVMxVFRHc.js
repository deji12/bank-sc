/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/parallax_scrolling/jquery.paroller.js. */
(function(factory){'use strict';if(typeof module==='object'&&typeof module.exports==='object'){module.exports=factory(require('jquery'))}else factory(jQuery)})(function($){'use strict';var setDirection={bgVertical:function(elem,bgOffset,bgStart){return elem.css({backgroundPositionY:'calc('+ -bgOffset+'px + '+bgStart+')'})},bgHorizontal:function(elem,bgOffset,bgStart){return elem.css({backgroundPositionX:'calc('+ -bgOffset+'px + '+bgStart+')'})},vertical:function(elem,elemOffset,oldTransform){(oldTransform==='none'?oldTransform='':true);return elem.css({'-webkit-transform':'translateY('+elemOffset+'px)'+oldTransform,'-moz-transform':'translateY('+elemOffset+'px)'+oldTransform,transform:'translateY('+elemOffset+'px)'+oldTransform,transition:'transform linear','will-change':'transform'})},horizontal:function(elem,elemOffset,oldTransform){(oldTransform==='none'?oldTransform='':true);return elem.css({'-webkit-transform':'translateX('+elemOffset+'px)'+oldTransform,'-moz-transform':'translateX('+elemOffset+'px)'+oldTransform,transform:'translateX('+elemOffset+'px)'+oldTransform,transition:'transform linear','will-change':'transform'})}};$.fn.paroller=function(options){var windowHeight=$(window).height(),documentHeight=$(document).height();options=$.extend({factor:0,type:'background',direction:'vertical',bgstart:0},options);return this.each(function(){var working=false,$this=$(this),offset=$this.offset().top,height=$this.outerHeight(),dataFactor=$this.data('paroller-factor'),dataType=$this.data('paroller-type'),dataDirection=$this.data('paroller-direction'),dataBgStart=$this.data('paroller-bg-start'),factor=dataFactor?dataFactor:options.factor,type=dataType?dataType:options.type,direction=dataDirection?dataDirection:options.direction,bgStart=dataBgStart?dataBgStart:options.bgstart,bgOffset=Math.round(offset*factor),transform=Math.round((offset-(windowHeight/2)+height)*factor),oldTransform=$this.css('transform');if(type==='background'){if(typeof bgStart==='number')bgStart=bgStart+'px';if(!bgStart.length)bgStart='0';if($.isNumeric(bgStart.slice(-1)))bgStart=bgStart+'px';if(direction==='vertical'){setDirection.bgVertical($this,bgOffset,bgStart)}else if(direction==='horizontal')setDirection.bgHorizontal($this,bgOffset,bgStart)}else if(type==='foreground')if(direction==='vertical'){setDirection.vertical($this,transform,oldTransform)}else if(direction==='horizontal')setDirection.horizontal($this,transform,oldTransform);$(window).on('scroll.paroller',onScroll).trigger('scroll')
function scrollAction(){working=false}
function onScroll(){if(!working){var scrolling=$(this).scrollTop();documentHeight=$(document).height();bgOffset=Math.round((offset-scrolling)*factor);transform=Math.round(((offset-(windowHeight/2)+height)-scrolling)*factor);if(type==='background'){if(direction==='vertical'){setDirection.bgVertical($this,bgOffset,bgStart)}else if(direction==='horizontal')setDirection.bgHorizontal($this,bgOffset,bgStart)}else if((type==='foreground')&&(scrolling<=documentHeight))if(direction==='vertical'){setDirection.vertical($this,transform,oldTransform)}else if(direction==='horizontal')setDirection.horizontal($this,transform,oldTransform);window.requestAnimationFrame(scrollAction);working=true}}})}})
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/parallax_scrolling/jquery.paroller.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/parallax_scrolling/init.paroller.js. */
(function($,Drupal,drupalSettings){"use strict";Drupal.behaviors.DX8ParallaxScrolling={attach:function(context,settings){var cmm=new Drupal.CohesionResponsiveBreakpoints(),resetCSS={background:'',transform:'',transition:'','will-change':'','background-position-y':'','background-position-x':''},count=0,total=0
function initParoller(settings){var key=settings.cohesion.key,settings=settings.cohesion.settings,$el=settings.$el;if(!count){total=$('[data-coh-paroller]',context).length;count=total};if(count===total)$(window).off('.paroller');count--;$el.css(resetCSS);if(settings.breakpoints[key].enabled)$el.paroller({factor:settings.breakpoints[key].factor,direction:settings.breakpoints[key].direction,type:settings.breakpoints[key].type,bgstart:settings.breakpoints[key].bgstart})};$.each($('[data-coh-paroller]',context).once('dx8-js-parallax-init'),function(){var $el=$(this),responsiveSettings=$el.data('coh-paroller'),key,previous,settings={$el:$el,breakpoints:{}};for(var i=0;i<cmm.breakpoints.length;i++){key=cmm.breakpoints[i].key;settings.breakpoints[key]={};if(typeof responsiveSettings[key]!=='undefined'){settings.breakpoints[key]=responsiveSettings[key];previous=responsiveSettings[key]}else if(typeof cmm.breakpoints[i-1]!=='undefined'&&typeof previous!=='undefined')settings.breakpoints[key]=previous};cmm.addListeners(settings,initParoller)})}}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/parallax_scrolling/init.paroller.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/link/jquery.scrollTo.js. */
(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof module!=='undefined'&&module.exports){module.exports=factory(require('jquery'))}else factory(jQuery)})(function($){'use strict';var $scrollTo=$.scrollTo=function(target,duration,settings){return $(window).scrollTo(target,duration,settings)};$scrollTo.defaults={axis:'xy',duration:0,limit:true}
function isWin(elem){return!elem.nodeName||$.inArray(elem.nodeName.toLowerCase(),['iframe','#document','html','body'])!==-1};$.fn.scrollTo=function(target,duration,settings){if(typeof duration==='object'){settings=duration;duration=0};if(typeof settings==='function')settings={onAfter:settings};if(target==='max')target=9e9;settings=$.extend({},$scrollTo.defaults,settings);duration=duration||settings.duration;var queue=settings.queue&&settings.axis.length>1;if(queue)duration/=2;settings.offset=both(settings.offset);settings.over=both(settings.over);return this.each(function(){if(target===null)return;var win=isWin(this),elem=win?this.contentWindow||window:this,$elem=$(elem),targ=target,attr={},toff;switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break};targ=win?$(targ):$(targ,elem);case'object':if(targ.length===0)return;if(targ.is||targ.style)toff=(targ=$(targ)).offset()};var offset=$.isFunction(settings.offset)&&settings.offset(elem,targ)||settings.offset;$.each(settings.axis.split(''),function(i,axis){var Pos=axis==='x'?'Left':'Top',pos=Pos.toLowerCase(),key='scroll'+Pos,prev=$elem[key](),max=$scrollTo.max(elem,axis);if(toff){attr[key]=toff[pos]+(win?0:prev-$elem.offset()[pos]);if(settings.margin){attr[key]-=parseInt(targ.css('margin'+Pos),10)||0;attr[key]-=parseInt(targ.css('border'+Pos+'Width'),10)||0};attr[key]+=offset[pos]||0;if(settings.over[pos])attr[key]+=targ[axis==='x'?'width':'height']()*settings.over[pos]}else{var val=targ[pos];attr[key]=val.slice&&val.slice(-1)==='%'?parseFloat(val)/100*max:val};if(settings.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&settings.axis.length>1)if(prev===attr[key]){attr={}}else if(queue){animate(settings.onAfterFirst);attr={}}});animate(settings.onAfter)
function animate(callback){var opts=$.extend({},settings,{queue:true,duration:duration,complete:callback&&function(){callback.call(elem,targ,settings)}});$elem.animate(attr,opts)}})};$scrollTo.max=function(elem,axis){var Dim=axis==='x'?'Width':'Height',scroll='scroll'+Dim;if(!isWin(elem))return elem[scroll]-$(elem)[Dim.toLowerCase()]();var size='client'+Dim,doc=elem.ownerDocument||elem.document,html=doc.documentElement,body=doc.body;return Math.max(html[scroll],body[scroll])-Math.min(html[size],body[size])}
function both(val){return $.isFunction(val)||$.isPlainObject(val)?val:{top:val,left:val}};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(t){return $(t.elem)[t.prop]()},set:function(t){var curr=this.get(t);if(t.options.interrupt&&t._last&&t._last!==curr)return $(t.elem).stop();var next=Math.round(t.now);if(curr!==next){$(t.elem)[t.prop](next);t._last=this.get(t)}}};return $scrollTo})
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/link/jquery.scrollTo.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/link/link.js. */
if(!Array.prototype.find)Object.defineProperty(Array.prototype,"find",{value:function(predicate){if(this==null)throw new TypeError('"this" is null or not defined');var o=Object(this),len=o.length>>>0;if(typeof predicate!=="function")throw new TypeError("predicate must be a function");var thisArg=arguments[1],k=0;while(k<len){var kValue=o[k];if(predicate.call(thisArg,kValue,k,o))return kValue;k++};return undefined},configurable:true,writable:true});(function($){"use strict";Drupal.behaviors.CohesionLink={attach:function(context){var cmm=new Drupal.CohesionResponsiveBreakpoints();$.each($(".coh-js-scroll-to",context).once("coh-js-scroll-to-init"),bindScrollTo);$.each($(".coh-js-scroll-top",context).once("coh-js-scroll-top-init"),bindScrollTop);$.each($(".coh-interaction",context).once("coh-toggle-modifier-init"),bindModifier);$.each($(".coh-interaction",context).once("coh-animation-init"),bindAnimation)
function whichTransitionEvent(){var t,el=document.createElement("fakeelement"),transitions={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in transitions)if(el.style[t]!==undefined)return transitions[t]}
function getComponentClass($el){if(!$el||!$el.length)return undefined;for(var i=0;i<$el.prop("classList").length;i++)if($el.prop("classList")[i].match(/coh-component-instance-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/))return $el.prop("classList")[i]}
function bindScrollTo(){var $this=$(this);$this.on("click",function(e){e.preventDefault();var defaultSettings={duration:450,offset:0},scrollTarget=$this.data("cohScrollTo"),scrollDuration=$this.data("cohScrollDuration"),scrollOffset=function(){var offset=$this.data("cohScrollOffset");if(typeof offset==="string"){var $el=$(offset);if($el.length)return 0-$el.height();return 0};return offset*-1},scrollSettings={duration:scrollDuration,offset:scrollOffset()},settings=$.extend(defaultSettings,scrollSettings);$("html, body").scrollTo(scrollTarget,settings)})}
function bindScrollTop(){$(this).on("click",function(e){e.preventDefault();$("html, body").scrollTo(0,450)})}
function bindModifier(){var settings=$(this).data("interactionModifiers");if(!settings||settings[0].modifierType==="")return;$(this).on("click.coh.modifier",function(e){var $this=$(this);e.preventDefault();var modifier_types={"add-modifier":"addClass","remove-modifier":"removeClass","toggle-modifier":"toggleClass","toggle-modifier-accessible-collapsed":"toggleClass","toggle-modifier-accessible-expanded":"toggleClass"};for(var i=0;i<settings.length;i++){if(!settings[i].modifierName){console.warn('Link element is set to toggle a modifier class on a target element but no "Modifier class name" was specified. You must specify a "Modifier class name".');return};var modifier_name=settings[i].modifierName.replace(/^\./,""),interaction_target=settings[i].interactionTarget,modifier_type=settings[i].modifierType,transitionEvent=whichTransitionEvent(),$interaction_scope,$target;if(settings[i].interactionScope!=="this"&&!interaction_target){console.warn('Link element is set to "'+modifier_type+'" but does not have a "Target (jQuery selector)" specified. You must specify a "Target (jQuery selector)" or set "Scope to" to "This element"');return};$interaction_scope=getScope($this,settings[i].interactionScope,settings[i].interactionParent);$target=getTarget($this,interaction_target,$interaction_scope,settings[i].interaction_scope);if($target.length){$this.data("clickedModifier",!$this.data.clickedModifier);$target[modifier_types[modifier_type]](modifier_name).addClass("coh-transition");$target.on(transitionEvent,function(){$(this).removeClass("coh-transition").off(transitionEvent)});if(modifier_type.indexOf("toggle-modifier-accessible-")===0)$(this).attr("aria-expanded",$(this).attr("aria-expanded")==="true"?"false":"true");Drupal.attachBehaviors($target[0])}}})}
function cohCheckDisplayResize(mm){var currentSettings=mm.cohesion.settings.breakpoints[mm.cohesion.key]||{},animSettings=currentSettings.linkAnimation||currentSettings.buttonAnimation||[];mm.cohesion.settings.element.data("previousBreakPointAnimSettings").forEach(function(prevSetting){var matchedSetting=animSettings.find(function(setting){return prevSetting.animationTarget===setting.animationTarget});if(!matchedSetting&&prevSetting.displayReset!==false)if(mm.cohesion.settings.element.data("clickedAnimation")){runAnimation(mm.cohesion.settings.element,prevSetting,true);if(mm.cohesion.settings.element.data("clickedModifier"))mm.cohesion.settings.element.trigger("click.coh.modifier")}else if(prevSetting.animationTarget){var $interaction_scope=getScope(mm.cohesion.settings.element,prevSetting.animationScope,prevSetting.animationParent),$target=getTarget(mm.cohesion.settings.element,prevSetting.animationTarget,$interaction_scope,prevSetting.animationScope);$target.css("display","")}});mm.cohesion.settings.element.data("previousBreakPointAnimSettings",animSettings||[])}
function bindAnimation(){var $this=$(this),data=$this.data("cohSettings"),settings={element:$this,breakpoints:{}},key;$this.data("previousBreakPointAnimSettings",[]);for(var i=0;i<cmm.breakpoints.length;i++){key=cmm.breakpoints[i].key;settings.breakpoints[key]={};if(typeof data[key]!=="undefined"&&!$.isEmptyObject(data[key])){settings.breakpoints[key]=data[key];var previous=data[key]}else if(typeof cmm.breakpoints[i-1]!=="undefined"&&typeof previous!=="undefined")settings.breakpoints[key]=previous};cmm.addListeners(settings,cohCheckDisplayResize);$this.on("click.coh.animation",function(e){e.preventDefault();var currentSettings=settings.breakpoints[cmm.getCurrentBreakpoint().key];currentSettings=currentSettings.linkAnimation||currentSettings.buttonAnimation;if(currentSettings)for(var i=0;i<currentSettings.length;i++){var currentSetting=currentSettings[i];if(currentSetting.animationType!=="none")runAnimation($this,currentSetting)}})}
function runAnimation($this,settings,removeDisplay){var $interaction_scope,$target,origin;$interaction_scope=getScope($this,settings.animationScope,settings.animationParent);$target=getTarget($this,settings.animationTarget,$interaction_scope,settings.animationScope);if($target.length){$this.data("clickedAnimation",!$this.data("clickedAnimation"));if(settings.animationOrigin)origin=settings.animationOrigin.split(",");$.each($($target),function(){var $that=$(this);$that.toggle({effect:settings.animationType,direction:settings.animationDirection,distance:settings.animationDistance,pieces:settings.animationPieces,percent:settings.animationScale,origin:origin,size:settings.animationFoldHeight,horizFirst:settings.animationHorizontalFirst,times:settings.animationIterations,easing:settings.animationEasing,duration:removeDisplay?0:settings.animationDuration,complete:function(){Drupal.attachBehaviors($(this)[0]);if(removeDisplay)$that.css("display","")}})})}}
function getScope($this,scope,parent){var $interaction_scope;switch(scope){case"this":$interaction_scope=$this;break;case"parent":$interaction_scope=$this.closest(parent);break;case"component":var componentClass=getComponentClass($this.closest(".coh-component"));if(componentClass){$interaction_scope=$("."+componentClass)}else $interaction_scope=$(document);break;default:$interaction_scope=$(document);break};return $interaction_scope}
function getTarget($this,interaction_target,$interaction_scope,interaction_scope){var $target=$();if(interaction_scope==="this"&&!interaction_target){$target=$this}else if(!interaction_target){console.warn('Element does not have a "Target (jQuery selector)" specified. You must specify a "Target (jQuery selector)" or set "Scope to" to "This element".');return $target};if(!$target.length)$target=$(interaction_target,$interaction_scope);if(!$target.length)$target=$interaction_scope.filter(interaction_target);if(!$target.length)$target=$interaction_scope.find($(interaction_target));if(interaction_target.indexOf(".")!==0){if(!$target.length)$target=$interaction_scope.filter("."+interaction_target);if(!$target.length)$target=$interaction_scope.find($("."+interaction_target))};if(!$target.length)console.warn('Element has "Target (jQuery selector)" set to "'+interaction_target+'", but no matching element was found on the page.');return $target}}}})(jQuery)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/link/link.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/windowscroll/coh-scroll.js. */
(function($,Drupal){Drupal.behaviors.CohesionScroll={attach:function(context){if(drupalSettings.cohesion.add_animation_classes==='ENABLED'){function getWindowOffset(){return window.pageYOffset||document.documentElement.scrollTop};var previous=getWindowOffset();$('body',context).once('cohWindowScroll').each(function(){var $body=$(this),timeout,flag=false;if(getWindowOffset()>0)$body.addClass('is-scrolled');$(window).scroll(function(){var current=getWindowOffset(),state=current>previous;if(!flag){flag=true;$body.addClass('is-scrolling')};if(current!==previous)$body.addClass('is-scrolled').toggleClass('is-scrolled-down',state).toggleClass('is-scrolled-up',!state);previous=current<=0?0:current;clearTimeout(timeout);timeout=setTimeout(function(){$body.removeClass('is-scrolling');flag=false},200);if(previous===0)$body.removeClass('is-scrolled')})})}}}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/windowscroll/coh-scroll.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/matchHeight/jquery.matchHeight.js. */
(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof module!=='undefined'&&module.exports){module.exports=factory(require('jquery'))}else factory(jQuery)})(function($){var _previousResizeWidth=-1,_updateTimeout=-1,_parse=function(value){return parseFloat(value)||0},_rows=function(elements){var tolerance=1,$elements=$(elements),lastTop=null,rows=[];$elements.each(function(){var $that=$(this),top=$that.offset().top-_parse($that.css('margin-top')),lastRow=rows.length>0?rows[rows.length-1]:null;if(lastRow===null){rows.push($that)}else if(Math.floor(Math.abs(lastTop-top))<=tolerance){rows[rows.length-1]=lastRow.add($that)}else rows.push($that);lastTop=top});return rows},_parseOptions=function(options){var opts={byRow:true,property:'height',target:null,remove:false};if(typeof options==='object')return $.extend(opts,options);if(typeof options==='boolean'){opts.byRow=options}else if(options==='remove')opts.remove=true;return opts},matchHeight=$.fn.matchHeight=function(options){var opts=_parseOptions(options);if(opts.remove){var that=this;this.css(opts.property,'');$.each(matchHeight._groups,function(key,group){group.elements=group.elements.not(that)});matchHeight._groups=matchHeight._groups.filter(function(group){return group.elements.length>0});return this};if(this.length<=1&&!opts.target)return this;matchHeight._groups.push({elements:this,options:opts});matchHeight._apply(this,opts);return this};matchHeight.version='0.7.2';matchHeight._groups=[];matchHeight._throttle=80;matchHeight._maintainScroll=false;matchHeight._beforeUpdate=null;matchHeight._afterUpdate=null;matchHeight._rows=_rows;matchHeight._parse=_parse;matchHeight._parseOptions=_parseOptions;matchHeight.$window=$(window);matchHeight.$html=$('html');matchHeight._apply=function(elements,options){var opts=_parseOptions(options),$elements=$(elements),rows=[$elements],scrollTop=matchHeight.$window.scrollTop(),htmlHeight=matchHeight.$html.outerHeight(true),$hiddenParents=$elements.parents().filter(':hidden');$hiddenParents.each(function(){var $that=$(this);$that.data('style-cache',$that.attr('style'))});$hiddenParents.css('display','block');if(opts.byRow&&!opts.target){$elements.each(function(){var $that=$(this),display=$that.css('display');if(display!=='inline-block'&&display!=='flex'&&display!=='inline-flex')display='block';$that.data('style-cache',$that.attr('style'));$that.css({display:display,'padding-top':'0','padding-bottom':'0','margin-top':'0','margin-bottom':'0','border-top-width':'0','border-bottom-width':'0',height:'100px',overflow:'hidden'})});rows=_rows($elements);$elements.each(function(){var $that=$(this);$that.attr('style',$that.data('style-cache')||'')})};$.each(rows,function(key,row){var $row=$(row),targetHeight=0;if(!opts.target){if(opts.byRow&&$row.length<=1){$row.css(opts.property,'');return};$row.each(function(){var $that=$(this),style=$that.attr('style'),display=$that.css('display');if(display!=='inline-block'&&display!=='flex'&&display!=='inline-flex')display='block';var css={display:display};css[opts.property]='';$that.css(css);if($that.outerHeight(false)>targetHeight)targetHeight=$that.outerHeight(false);if(style){$that.attr('style',style)}else $that.css('display','')})}else targetHeight=opts.target.outerHeight(false);$row.each(function(){var $that=$(this),verticalPadding=0;if(opts.target&&$that.is(opts.target))return;if($that.css('box-sizing')!=='border-box'){verticalPadding+=_parse($that.css('border-top-width'))+_parse($that.css('border-bottom-width'));verticalPadding+=_parse($that.css('padding-top'))+_parse($that.css('padding-bottom'))};$that.css(opts.property,(targetHeight-verticalPadding)+'px')})});$hiddenParents.each(function(){var $that=$(this);$that.attr('style',$that.data('style-cache')||null)});if(matchHeight._maintainScroll)matchHeight.$window.scrollTop((scrollTop/htmlHeight)*matchHeight.$html.outerHeight(true));return this};matchHeight._applyDataApi=function(){var groups={};$('[data-match-height], [data-mh]').each(function(){var $this=$(this),groupId=$this.attr('data-mh')||$this.attr('data-match-height');if(groupId in groups){groups[groupId]=groups[groupId].add($this)}else groups[groupId]=$this});$.each(groups,function(){this.matchHeight(true)})};var _update=function(event){if(matchHeight._beforeUpdate)matchHeight._beforeUpdate(event,matchHeight._groups);$.each(matchHeight._groups,function(){matchHeight._apply(this.elements,this.options)});if(matchHeight._afterUpdate)matchHeight._afterUpdate(event,matchHeight._groups)};matchHeight._update=function(event){if(matchHeight.updateCall)window.cancelAnimationFrame(matchHeight.updateCall);matchHeight.updateCall=window.requestAnimationFrame(function(){_update(event)})};$(matchHeight._applyDataApi);var on=$.fn.on?'on':'bind';matchHeight.$window[on]('load orientationchange',function(event){matchHeight._update(event)});matchHeight.$window[on]('resize',function(event){matchHeight._update(event)})})
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/matchHeight/jquery.matchHeight.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/responsiveJs/responsive-js.js. */
(function($,Drupal,drupalSettings){"use strict";Drupal.CohesionResponsiveBreakpoints=function(settings){this.constants={desktop:'desktop-first',mobile:'mobile-first',widthType:{fluid:'fluid',fixed:'fixed'},mediaQuery:{all:'all',max:'max-width',min:'min-width'}};this.settings=settings||drupalSettings.cohesion.responsive_grid_settings;this.breakpoints=[];this.listeners={};this.init=function(){this.sortBreakpoints()};this.getBreakpointMediaQuery=function(breakpoint){if(this.getGridType()===this.constants.mobile)if(breakpoint===this.getFirstBreakpoint()){return this.constants.mediaQuery.all}else if(typeof this.getBreakpoints()[breakpoint]!=='undefined'){return'(min-width: '+this.getBreakpointWidth(breakpoint)+'px)'}else return'(min-width: '+breakpoint+'px)';if(this.getGridType()===this.constants.desktop){var breakpointIndex=this.getBreakpointIndex(breakpoint),minWidth=0,breakpointMaxWidth=false;if(breakpoint!==this.getLastBreakpoint())minWidth=this.getBreakpointWidth(this.breakpoints[breakpointIndex].key);if(breakpoint!==this.getFirstBreakpoint())breakpointMaxWidth=this.getBreakpointWidth(this.breakpoints[breakpointIndex-1].key)-1;var mediaQuery='(min-width: '+minWidth+'px)';if(breakpointMaxWidth)mediaQuery=mediaQuery+' and (max-width: '+breakpointMaxWidth+'px)';return mediaQuery}};this.getFirstBreakpoint=function(){return this.breakpoints[0].key};this.getLastBreakpoint=function(){return this.breakpoints[this.breakpoints.length-1].key};this.getGridType=function(){return this.settings.gridType};this.isMobileFirst=function(){return this.settings.gridType===this.constants.mobile};this.isDesktopFirst=function(){return this.settings.gridType===this.constants.desktop};this.getBreakpointType=function(breakpoint){return this.settings.breakpoints[breakpoint].widthType};this.getBreakpointWidth=function(breakpoint){return this.settings.breakpoints[breakpoint].width};this.getBreakpointMediaWidth=function(breakpoint){if(this.getGridType()===this.constants.mobile)if(breakpoint===this.getFirstBreakpoint()){return 0}else if(typeof this.getBreakpoints()[breakpoint]!=='undefined'){return this.getBreakpointWidth(breakpoint)}else return breakpoint;if(this.getGridType()===this.constants.desktop){var breakpointIndex=this.getBreakpointIndex(breakpoint),minWidth=0,breakpointMaxWidth=false;if(typeof this.breakpoints[breakpointIndex-1]!=='undefined')minWidth=this.getBreakpointWidth(this.breakpoints[breakpointIndex].key);if(breakpoint!==this.getFirstBreakpoint())breakpointMaxWidth=this.getBreakpointWidth(this.breakpoints[breakpointIndex-1].key)-1;var mediaQuery='(min-width: '+minWidth+'px)';if(breakpointMaxWidth)mediaQuery=mediaQuery+' and (max-width: '+breakpointMaxWidth+'px)';return breakpointMaxWidth}};this.getBreakpointOuterGutter=function(breakpoint){return this.settings.breakpoints[breakpoint].outerGutter};this.getBreakpointIndex=function(breakpoint){for(var i=0;i<this.breakpoints.length;i++)if(this.breakpoints[i].key===breakpoint)return i};this.getBreakpoints=function(){return this.settings.breakpoints};this.getBreakpointSettings=function(breakpoint){return this.settings.breakpoints[breakpoint]};this.getCurrentBreakpoint=function(){var match=false;for(var i=0;i<this.breakpoints.length;i++){if(i===0)match=this.breakpoints[i];var m=window.matchMedia(this.getBreakpointMediaQuery(this.breakpoints[i].key));if(m.matches)match=this.breakpoints[i]};return match};this.getMediaQueryListEventObject=function(mql){return typeof mql.target!=='undefined'?mql.target:mql};this.getMql=function(mql){return this.getMediaQueryListEventObject(mql)};this.addListener=function(breakpoint,cb){};this.handleListener=function(mql,key,callback,callbackSettings){var _this=this;if(!mql.matches&&this.isDesktopFirst())return;if(!mql.matches&&this.isMobileFirst()){key=_this.getCurrentBreakpoint().key;mql=_this.listeners[key]};mql=_this.getMql(mql);mql.cohesion={key:key,settings:callbackSettings};return callback(mql)};this.addListeners=function(settings,callback){var _this=this,i,breakpointKey,mq,match;for(i=0;i<_this.breakpoints.length;i++){breakpointKey=_this.breakpoints[i].key;mq=_this.getBreakpointMediaQuery(breakpointKey);var listener;listener=window.matchMedia(mq);_this.listeners[breakpointKey]=listener;listener.addListener(this.handleListener.bind(this,listener,breakpointKey,callback,settings));if(listener.matches){match=listener;match.key=breakpointKey}};if(match)this.handleListener(match,match.key,callback,settings)};this.sortBreakpoints=function(){var _this=this,i=0;for(var k in _this.settings.breakpoints)if(_this.settings.breakpoints.hasOwnProperty(k)){_this.breakpoints.push(_this.settings.breakpoints[k]);_this.breakpoints[i].key=k;i++};if(_this.getGridType()===_this.constants.mobile){_this.breakpoints.sort(function(a,b){return a.width-b.width})}else if(_this.getGridType()===_this.constants.desktop){_this.breakpoints.sort(function(a,b){return b.width-a.width})}else throw'Mobile or Desktop first must be set in Website settings > Responsive grid settings'};this.init()}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/responsiveJs/responsive-js.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/cohMatchHeights/coh-match-heights.js. */
(function($,Drupal){"use strict";Drupal.behaviors.CohesionMatchHeights={attach:function(context){var cmm=new Drupal.CohesionResponsiveBreakpoints(),once='',loaders=['img','frame','iframe','input[type="image"]','link','script','style']
function cohInitMatchHeights(settings){var s=settings.cohesion.settings,$this=s.element,target=s.breakpoints[settings.cohesion.key].target.match(/^[.]/)?s.breakpoints[settings.cohesion.key].target:'.'+s.breakpoints[settings.cohesion.key].target,$el;if(typeof s.breakpoints[settings.cohesion.key].children!=='undefined'&&s.breakpoints[settings.cohesion.key].children===true){$el=$(target,$this)}else $el=s.element.add(target);if(typeof $this.data('currentMatchHeight')!=='undefined'){if($this.data('currentMatchHeight')===$el)return;cohUnsetMatchHeight($this.data('currentMatchHeight'));if(s.breakpoints[settings.cohesion.key].target==='none')return};$this.data('currentMatchHeight',$el);return $el.matchHeight({byRow:false})}
function cohUnsetMatchHeight($this){return $this.matchHeight({remove:true})};$.fn.matchHeight._update();$.each($('[data-coh-match-heights]',context).once('coh-js-matchheights-init'),function(){var $this=$(this),targets=$this.data('cohMatchHeights'),key,settings={};settings.element=$this;settings.breakpoints={};for(var i=0;i<cmm.breakpoints.length;i++){key=cmm.breakpoints[i].key;settings.breakpoints[key]={};if(typeof targets[key]!=='undefined'){settings.breakpoints[key]=targets[key];var previous=targets[key]}else if(typeof cmm.breakpoints[i-1]!=='undefined'&&typeof previous!=='undefined')settings.breakpoints[key]=previous};cmm.addListeners(settings,cohInitMatchHeights);$(context).ajaxComplete(function(event,xhr,settings){$.fn.matchHeight._update();$(loaders.toString(),context).on('load',function(){if($(this).length&&this.dataset.styled!=="active")$.fn.matchHeight._update()})})})}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/cohMatchHeights/coh-match-heights.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/drupal-menu/pep.js. */
/*!
 * PEP v0.4.3 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.PointerEventsPolyfill = factory());
}(this, function () { 'use strict';

  /**
   * This is the constructor for new PointerEvents.
   *
   * New Pointer Events must be given a type, and an optional dictionary of
   * initialization properties.
   *
   * Due to certain platform requirements, events returned from the constructor
   * identify as MouseEvents.
   *
   * @constructor
   * @param {String} inType The type of the event to create.
   * @param {Object} [inDict] An optional dictionary of initial event properties.
   * @return {Event} A new PointerEvent of type `inType`, initialized with properties from `inDict`.
   */
  var MOUSE_PROPS = [
    'bubbles',
    'cancelable',
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget',
    'pageX',
    'pageY'
  ];

  var MOUSE_DEFAULTS = [
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
    0,
    0
  ];

  function PointerEvent(inType, inDict) {
    inDict = inDict || Object.create(null);

    var e = document.createEvent('Event');
    e.initEvent(inType, inDict.bubbles || false, inDict.cancelable || false);

    // define inherited MouseEvent properties
    // skip bubbles and cancelable since they're set above in initEvent()
    for (var i = 2, p; i < MOUSE_PROPS.length; i++) {
      p = MOUSE_PROPS[i];
      e[p] = inDict[p] || MOUSE_DEFAULTS[i];
    }
    e.buttons = inDict.buttons || 0;

    // Spec requires that pointers without pressure specified use 0.5 for down
    // state and 0 for up state.
    var pressure = 0;

    if (inDict.pressure && e.buttons) {
      pressure = inDict.pressure;
    } else {
      pressure = e.buttons ? 0.5 : 0;
    }

    // add x/y properties aliased to clientX/Y
    e.x = e.clientX;
    e.y = e.clientY;

    // define the properties of the PointerEvent interface
    e.pointerId = inDict.pointerId || 0;
    e.width = inDict.width || 0;
    e.height = inDict.height || 0;
    e.pressure = pressure;
    e.tiltX = inDict.tiltX || 0;
    e.tiltY = inDict.tiltY || 0;
    e.twist = inDict.twist || 0;
    e.tangentialPressure = inDict.tangentialPressure || 0;
    e.pointerType = inDict.pointerType || '';
    e.hwTimestamp = inDict.hwTimestamp || 0;
    e.isPrimary = inDict.isPrimary || false;
    return e;
  }

  /**
   * This module implements a map of pointer states
   */
  var USE_MAP = window.Map && window.Map.prototype.forEach;
  var PointerMap = USE_MAP ? Map : SparseArrayMap;

  function SparseArrayMap() {
    this.array = [];
    this.size = 0;
  }

  SparseArrayMap.prototype = {
    set: function(k, v) {
      if (v === undefined) {
        return this.delete(k);
      }
      if (!this.has(k)) {
        this.size++;
      }
      this.array[k] = v;
    },
    has: function(k) {
      return this.array[k] !== undefined;
    },
    delete: function(k) {
      if (this.has(k)) {
        delete this.array[k];
        this.size--;
      }
    },
    get: function(k) {
      return this.array[k];
    },
    clear: function() {
      this.array.length = 0;
      this.size = 0;
    },

    // return value, key, map
    forEach: function(callback, thisArg) {
      return this.array.forEach(function(v, k) {
        callback.call(thisArg, v, k, this);
      }, this);
    }
  };

  var CLONE_PROPS = [

    // MouseEvent
    'bubbles',
    'cancelable',
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget',

    // DOM Level 3
    'buttons',

    // PointerEvent
    'pointerId',
    'width',
    'height',
    'pressure',
    'tiltX',
    'tiltY',
    'pointerType',
    'hwTimestamp',
    'isPrimary',

    // event instance
    'type',
    'target',
    'currentTarget',
    'which',
    'pageX',
    'pageY',
    'timeStamp'
  ];

  var CLONE_DEFAULTS = [

    // MouseEvent
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,

    // DOM Level 3
    0,

    // PointerEvent
    0,
    0,
    0,
    0,
    0,
    0,
    '',
    0,
    false,

    // event instance
    '',
    null,
    null,
    0,
    0,
    0,
    0
  ];

  var BOUNDARY_EVENTS = {
    'pointerover': 1,
    'pointerout': 1,
    'pointerenter': 1,
    'pointerleave': 1
  };

  var HAS_SVG_INSTANCE = (typeof SVGElementInstance !== 'undefined');

  /**
   * This module is for normalizing events. Mouse and Touch events will be
   * collected here, and fire PointerEvents that have the same semantics, no
   * matter the source.
   * Events fired:
   *   - pointerdown: a pointing is added
   *   - pointerup: a pointer is removed
   *   - pointermove: a pointer is moved
   *   - pointerover: a pointer crosses into an element
   *   - pointerout: a pointer leaves an element
   *   - pointercancel: a pointer will no longer generate events
   */
  var dispatcher = {
    pointermap: new PointerMap(),
    eventMap: Object.create(null),
    captureInfo: Object.create(null),

    // Scope objects for native events.
    // This exists for ease of testing.
    eventSources: Object.create(null),
    eventSourceList: [],
    /**
     * Add a new event source that will generate pointer events.
     *
     * `inSource` must contain an array of event names named `events`, and
     * functions with the names specified in the `events` array.
     * @param {string} name A name for the event source
     * @param {Object} source A new source of platform events.
     */
    registerSource: function(name, source) {
      var s = source;
      var newEvents = s.events;
      if (newEvents) {
        newEvents.forEach(function(e) {
          if (s[e]) {
            this.eventMap[e] = s[e].bind(s);
          }
        }, this);
        this.eventSources[name] = s;
        this.eventSourceList.push(s);
      }
    },
    register: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {

        // call eventsource register
        es.register.call(es, element);
      }
    },
    unregister: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {

        // call eventsource register
        es.unregister.call(es, element);
      }
    },
    contains: /*scope.external.contains || */function(container, contained) {
      try {
        return container.contains(contained);
      } catch (ex) {

        // most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
        return false;
      }
    },

    // EVENTS
    down: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerdown', inEvent);
    },
    move: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointermove', inEvent);
    },
    up: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerup', inEvent);
    },
    enter: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent('pointerenter', inEvent);
    },
    leave: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent('pointerleave', inEvent);
    },
    over: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerover', inEvent);
    },
    out: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerout', inEvent);
    },
    cancel: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointercancel', inEvent);
    },
    leaveOut: function(event) {
      this.out(event);
      this.propagate(event, this.leave, false);
    },
    enterOver: function(event) {
      this.over(event);
      this.propagate(event, this.enter, true);
    },

    // LISTENER LOGIC
    eventHandler: function(inEvent) {

      // This is used to prevent multiple dispatch of pointerevents from
      // platform events. This can happen when two elements in different scopes
      // are set up to create pointer events, which is relevant to Shadow DOM.
      if (inEvent._handledByPE) {
        return;
      }
      var type = inEvent.type;
      var fn = this.eventMap && this.eventMap[type];
      if (fn) {
        fn(inEvent);
      }
      inEvent._handledByPE = true;
    },

    // set up event listeners
    listen: function(target, events) {
      events.forEach(function(e) {
        this.addEvent(target, e);
      }, this);
    },

    // remove event listeners
    unlisten: function(target, events) {
      events.forEach(function(e) {
        this.removeEvent(target, e);
      }, this);
    },
    addEvent: /*scope.external.addEvent || */function(target, eventName) {
      target.addEventListener(eventName, this.boundHandler);
    },
    removeEvent: /*scope.external.removeEvent || */function(target, eventName) {
      target.removeEventListener(eventName, this.boundHandler);
    },

    // EVENT CREATION AND TRACKING
    /**
     * Creates a new Event of type `inType`, based on the information in
     * `inEvent`.
     *
     * @param {string} inType A string representing the type of event to create
     * @param {Event} inEvent A platform event with a target
     * @return {Event} A PointerEvent of type `inType`
     */
    makeEvent: function(inType, inEvent) {

      // relatedTarget must be null if pointer is captured
      if (this.captureInfo[inEvent.pointerId]) {
        inEvent.relatedTarget = null;
      }
      var e = new PointerEvent(inType, inEvent);
      if (inEvent.preventDefault) {
        e.preventDefault = inEvent.preventDefault;
      }
      e._target = e._target || inEvent.target;
      return e;
    },

    // make and dispatch an event in one call
    fireEvent: function(inType, inEvent) {
      var e = this.makeEvent(inType, inEvent);
      return this.dispatchEvent(e);
    },
    /**
     * Returns a snapshot of inEvent, with writable properties.
     *
     * @param {Event} inEvent An event that contains properties to copy.
     * @return {Object} An object containing shallow copies of `inEvent`'s
     *    properties.
     */
    cloneEvent: function(inEvent) {
      var eventCopy = Object.create(null);
      var p;
      for (var i = 0; i < CLONE_PROPS.length; i++) {
        p = CLONE_PROPS[i];
        eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];

        // Work around SVGInstanceElement shadow tree
        // Return the <use> element that is represented by the instance for Safari, Chrome, IE.
        // This is the behavior implemented by Firefox.
        if (HAS_SVG_INSTANCE && (p === 'target' || p === 'relatedTarget')) {
          if (eventCopy[p] instanceof SVGElementInstance) {
            eventCopy[p] = eventCopy[p].correspondingUseElement;
          }
        }
      }

      // keep the semantics of preventDefault
      if (inEvent.preventDefault) {
        eventCopy.preventDefault = function() {
          inEvent.preventDefault();
        };
      }
      return eventCopy;
    },
    getTarget: function(inEvent) {
      var capture = this.captureInfo[inEvent.pointerId];
      if (!capture) {
        return inEvent._target;
      }
      if (inEvent._target === capture || !(inEvent.type in BOUNDARY_EVENTS)) {
        return capture;
      }
    },
    propagate: function(event, fn, propagateDown) {
      var target = event.target;
      var targets = [];

      // Order of conditions due to document.contains() missing in IE.
      while (target !== document && !target.contains(event.relatedTarget)) {
        targets.push(target);
        target = target.parentNode;

        // Touch: Do not propagate if node is detached.
        if (!target) {
          return;
        }
      }
      if (propagateDown) {
        targets.reverse();
      }
      targets.forEach(function(target) {
        event.target = target;
        fn.call(this, event);
      }, this);
    },
    setCapture: function(inPointerId, inTarget, skipDispatch) {
      if (this.captureInfo[inPointerId]) {
        this.releaseCapture(inPointerId, skipDispatch);
      }

      this.captureInfo[inPointerId] = inTarget;
      this.implicitRelease = this.releaseCapture.bind(this, inPointerId, skipDispatch);
      document.addEventListener('pointerup', this.implicitRelease);
      document.addEventListener('pointercancel', this.implicitRelease);

      var e = new PointerEvent('gotpointercapture');
      e.pointerId = inPointerId;
      e._target = inTarget;

      if (!skipDispatch) {
        this.asyncDispatchEvent(e);
      }
    },
    releaseCapture: function(inPointerId, skipDispatch) {
      var t = this.captureInfo[inPointerId];
      if (!t) {
        return;
      }

      this.captureInfo[inPointerId] = undefined;
      document.removeEventListener('pointerup', this.implicitRelease);
      document.removeEventListener('pointercancel', this.implicitRelease);

      var e = new PointerEvent('lostpointercapture');
      e.pointerId = inPointerId;
      e._target = t;

      if (!skipDispatch) {
        this.asyncDispatchEvent(e);
      }
    },
    /**
     * Dispatches the event to its target.
     *
     * @param {Event} inEvent The event to be dispatched.
     * @return {Boolean} True if an event handler returns true, false otherwise.
     */
    dispatchEvent: /*scope.external.dispatchEvent || */function(inEvent) {
      var t = this.getTarget(inEvent);
      if (t) {
        return t.dispatchEvent(inEvent);
      }
    },
    asyncDispatchEvent: function(inEvent) {
      requestAnimationFrame(this.dispatchEvent.bind(this, inEvent));
    }
  };
  dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);

  var targeting = {
    shadow: function(inEl) {
      if (inEl) {
        return inEl.shadowRoot || inEl.webkitShadowRoot;
      }
    },
    canTarget: function(shadow) {
      return shadow && Boolean(shadow.elementFromPoint);
    },
    targetingShadow: function(inEl) {
      var s = this.shadow(inEl);
      if (this.canTarget(s)) {
        return s;
      }
    },
    olderShadow: function(shadow) {
      var os = shadow.olderShadowRoot;
      if (!os) {
        var se = shadow.querySelector('shadow');
        if (se) {
          os = se.olderShadowRoot;
        }
      }
      return os;
    },
    allShadows: function(element) {
      var shadows = [];
      var s = this.shadow(element);
      while (s) {
        shadows.push(s);
        s = this.olderShadow(s);
      }
      return shadows;
    },
    searchRoot: function(inRoot, x, y) {
      if (inRoot) {
        var t = inRoot.elementFromPoint(x, y);
        var st, sr;

        // is element a shadow host?
        sr = this.targetingShadow(t);
        while (sr) {

          // find the the element inside the shadow root
          st = sr.elementFromPoint(x, y);
          if (!st) {

            // check for older shadows
            sr = this.olderShadow(sr);
          } else {

            // shadowed element may contain a shadow root
            var ssr = this.targetingShadow(st);
            return this.searchRoot(ssr, x, y) || st;
          }
        }

        // light dom element is the target
        return t;
      }
    },
    owner: function(element) {
      var s = element;

      // walk up until you hit the shadow root or document
      while (s.parentNode) {
        s = s.parentNode;
      }

      // the owner element is expected to be a Document or ShadowRoot
      if (s.nodeType !== Node.DOCUMENT_NODE && s.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
        s = document;
      }
      return s;
    },
    findTarget: function(inEvent) {
      var x = inEvent.clientX;
      var y = inEvent.clientY;

      // if the listener is in the shadow root, it is much faster to start there
      var s = this.owner(inEvent.target);

      // if x, y is not in this root, fall back to document search
      if (!s.elementFromPoint(x, y)) {
        s = document;
      }
      return this.searchRoot(s, x, y);
    }
  };

  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  var map = Array.prototype.map.call.bind(Array.prototype.map);
  var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
  var filter = Array.prototype.filter.call.bind(Array.prototype.filter);
  var MO = window.MutationObserver || window.WebKitMutationObserver;
  var SELECTOR = '[touch-action]';
  var OBSERVER_INIT = {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['touch-action']
  };

  function Installer(add, remove, changed, binder) {
    this.addCallback = add.bind(binder);
    this.removeCallback = remove.bind(binder);
    this.changedCallback = changed.bind(binder);
    if (MO) {
      this.observer = new MO(this.mutationWatcher.bind(this));
    }
  }

  Installer.prototype = {
    watchSubtree: function(target) {

      // Only watch scopes that can target find, as these are top-level.
      // Otherwise we can see duplicate additions and removals that add noise.
      //
      // TODO(dfreedman): For some instances with ShadowDOMPolyfill, we can see
      // a removal without an insertion when a node is redistributed among
      // shadows. Since it all ends up correct in the document, watching only
      // the document will yield the correct mutations to watch.
      if (this.observer && targeting.canTarget(target)) {
        this.observer.observe(target, OBSERVER_INIT);
      }
    },
    enableOnSubtree: function(target) {
      this.watchSubtree(target);
      if (target === document && document.readyState !== 'complete') {
        this.installOnLoad();
      } else {
        this.installNewSubtree(target);
      }
    },
    installNewSubtree: function(target) {
      forEach(this.findElements(target), this.addElement, this);
    },
    findElements: function(target) {
      if (target.querySelectorAll) {
        return target.querySelectorAll(SELECTOR);
      }
      return [];
    },
    removeElement: function(el) {
      this.removeCallback(el);
    },
    addElement: function(el) {
      this.addCallback(el);
    },
    elementChanged: function(el, oldValue) {
      this.changedCallback(el, oldValue);
    },
    concatLists: function(accum, list) {
      return accum.concat(toArray(list));
    },

    // register all touch-action = none nodes on document load
    installOnLoad: function() {
      document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
          this.installNewSubtree(document);
        }
      }.bind(this));
    },
    isElement: function(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    },
    flattenMutationTree: function(inNodes) {

      // find children with touch-action
      var tree = map(inNodes, this.findElements, this);

      // make sure the added nodes are accounted for
      tree.push(filter(inNodes, this.isElement));

      // flatten the list
      return tree.reduce(this.concatLists, []);
    },
    mutationWatcher: function(mutations) {
      mutations.forEach(this.mutationHandler, this);
    },
    mutationHandler: function(m) {
      if (m.type === 'childList') {
        var added = this.flattenMutationTree(m.addedNodes);
        added.forEach(this.addElement, this);
        var removed = this.flattenMutationTree(m.removedNodes);
        removed.forEach(this.removeElement, this);
      } else if (m.type === 'attributes') {
        this.elementChanged(m.target, m.oldValue);
      }
    }
  };

  function shadowSelector(v) {
    return 'body /shadow-deep/ ' + selector(v);
  }
  function selector(v) {
    return '[touch-action="' + v + '"]';
  }
  function rule(v) {
    return '{ -ms-touch-action: ' + v + '; touch-action: ' + v + '; }';
  }
  var attrib2css = [
    'none',
    'auto',
    'pan-x',
    'pan-y',
    {
      rule: 'pan-x pan-y',
      selectors: [
        'pan-x pan-y',
        'pan-y pan-x'
      ]
    }
  ];
  var styles = '';

  // only install stylesheet if the browser has touch action support
  var hasNativePE = window.PointerEvent || window.MSPointerEvent;

  // only add shadow selectors if shadowdom is supported
  var hasShadowRoot = !window.ShadowDOMPolyfill && document.head.createShadowRoot;

  function applyAttributeStyles() {
    if (hasNativePE) {
      attrib2css.forEach(function(r) {
        if (String(r) === r) {
          styles += selector(r) + rule(r) + '\n';
          if (hasShadowRoot) {
            styles += shadowSelector(r) + rule(r) + '\n';
          }
        } else {
          styles += r.selectors.map(selector) + rule(r.rule) + '\n';
          if (hasShadowRoot) {
            styles += r.selectors.map(shadowSelector) + rule(r.rule) + '\n';
          }
        }
      });

      var el = document.createElement('style');
      el.textContent = styles;
      document.head.appendChild(el);
    }
  }

  var pointermap = dispatcher.pointermap;

  // radius around touchend that swallows mouse events
  var DEDUP_DIST = 25;

  // left, middle, right, back, forward
  var BUTTON_TO_BUTTONS = [1, 4, 2, 8, 16];

  var HAS_BUTTONS = false;
  try {
    HAS_BUTTONS = new MouseEvent('test', { buttons: 1 }).buttons === 1;
  } catch (e) {}

  // handler block for native mouse events
  var mouseEvents = {
    POINTER_ID: 1,
    POINTER_TYPE: 'mouse',
    events: [
      'mousedown',
      'mousemove',
      'mouseup',
      'mouseover',
      'mouseout'
    ],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    lastTouches: [],

    // collide with the global mouse listener
    isEventSimulatedFromTouch: function(inEvent) {
      var lts = this.lastTouches;
      var x = inEvent.clientX;
      var y = inEvent.clientY;
      for (var i = 0, l = lts.length, t; i < l && (t = lts[i]); i++) {

        // simulated mouse events will be swallowed near a primary touchend
        var dx = Math.abs(x - t.x);
        var dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DIST && dy <= DEDUP_DIST) {
          return true;
        }
      }
    },
    prepareEvent: function(inEvent) {
      var e = dispatcher.cloneEvent(inEvent);

      // forward mouse preventDefault
      var pd = e.preventDefault;
      e.preventDefault = function() {
        inEvent.preventDefault();
        pd();
      };
      e.pointerId = this.POINTER_ID;
      e.isPrimary = true;
      e.pointerType = this.POINTER_TYPE;
      return e;
    },
    prepareButtonsForMove: function(e, inEvent) {
      var p = pointermap.get(this.POINTER_ID);

      // Update buttons state after possible out-of-document mouseup.
      if (inEvent.which === 0 || !p) {
        e.buttons = 0;
      } else {
        e.buttons = p.buttons;
      }
      inEvent.buttons = e.buttons;
    },
    mousedown: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var p = pointermap.get(this.POINTER_ID);
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          e.buttons = BUTTON_TO_BUTTONS[e.button];
          if (p) { e.buttons |= p.buttons; }
          inEvent.buttons = e.buttons;
        }
        pointermap.set(this.POINTER_ID, inEvent);
        if (!p || p.buttons === 0) {
          dispatcher.down(e);
        } else {
          dispatcher.move(e);
        }
      }
    },
    mousemove: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        pointermap.set(this.POINTER_ID, inEvent);
        dispatcher.move(e);
      }
    },
    mouseup: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var p = pointermap.get(this.POINTER_ID);
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          var up = BUTTON_TO_BUTTONS[e.button];

          // Produces wrong state of buttons in Browsers without `buttons` support
          // when a mouse button that was pressed outside the document is released
          // inside and other buttons are still pressed down.
          e.buttons = p ? p.buttons & ~up : 0;
          inEvent.buttons = e.buttons;
        }
        pointermap.set(this.POINTER_ID, inEvent);

        // Support: Firefox <=44 only
        // FF Ubuntu includes the lifted button in the `buttons` property on
        // mouseup.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1223366
        e.buttons &= ~BUTTON_TO_BUTTONS[e.button];
        if (e.buttons === 0) {
          dispatcher.up(e);
        } else {
          dispatcher.move(e);
        }
      }
    },
    mouseover: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        pointermap.set(this.POINTER_ID, inEvent);
        dispatcher.enterOver(e);
      }
    },
    mouseout: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) { this.prepareButtonsForMove(e, inEvent); }
        e.button = -1;
        dispatcher.leaveOut(e);
      }
    },
    cancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.deactivateMouse();
    },
    deactivateMouse: function() {
      pointermap.delete(this.POINTER_ID);
    }
  };

  var captureInfo = dispatcher.captureInfo;
  var findTarget = targeting.findTarget.bind(targeting);
  var allShadows = targeting.allShadows.bind(targeting);
  var pointermap$1 = dispatcher.pointermap;

  // This should be long enough to ignore compat mouse events made by touch
  var DEDUP_TIMEOUT = 2500;
  var CLICK_COUNT_TIMEOUT = 200;
  var ATTRIB = 'touch-action';
  var INSTALLER;

  // handler block for native touch events
  var touchEvents = {
    events: [
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel'
    ],
    register: function(target) {
      INSTALLER.enableOnSubtree(target);
    },
    unregister: function() {

      // TODO(dfreedman): is it worth it to disconnect the MO?
    },
    elementAdded: function(el) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      if (st) {
        el._scrollType = st;
        dispatcher.listen(el, this.events);

        // set touch-action on shadows as well
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
          dispatcher.listen(s, this.events);
        }, this);
      }
    },
    elementRemoved: function(el) {
      el._scrollType = undefined;
      dispatcher.unlisten(el, this.events);

      // remove touch-action from shadow
      allShadows(el).forEach(function(s) {
        s._scrollType = undefined;
        dispatcher.unlisten(s, this.events);
      }, this);
    },
    elementChanged: function(el, oldValue) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      var oldSt = this.touchActionToScrollType(oldValue);

      // simply update scrollType if listeners are already established
      if (st && oldSt) {
        el._scrollType = st;
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
        }, this);
      } else if (oldSt) {
        this.elementRemoved(el);
      } else if (st) {
        this.elementAdded(el);
      }
    },
    scrollTypes: {
      EMITTER: 'none',
      XSCROLLER: 'pan-x',
      YSCROLLER: 'pan-y',
      SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/
    },
    touchActionToScrollType: function(touchAction) {
      var t = touchAction;
      var st = this.scrollTypes;
      if (t === 'none') {
        return 'none';
      } else if (t === st.XSCROLLER) {
        return 'X';
      } else if (t === st.YSCROLLER) {
        return 'Y';
      } else if (st.SCROLLER.exec(t)) {
        return 'XY';
      }
    },
    POINTER_TYPE: 'touch',
    firstTouch: null,
    isPrimaryTouch: function(inTouch) {
      return this.firstTouch === inTouch.identifier;
    },
    setPrimaryTouch: function(inTouch) {

      // set primary touch if there no pointers, or the only pointer is the mouse
      if (pointermap$1.size === 0 || (pointermap$1.size === 1 && pointermap$1.has(1))) {
        this.firstTouch = inTouch.identifier;
        this.firstXY = { X: inTouch.clientX, Y: inTouch.clientY };
        this.scrolling = false;
        this.cancelResetClickCount();
      }
    },
    removePrimaryPointer: function(inPointer) {
      if (inPointer.isPrimary) {
        this.firstTouch = null;
        this.firstXY = null;
        this.resetClickCount();
      }
    },
    clickCount: 0,
    resetId: null,
    resetClickCount: function() {
      var fn = function() {
        this.clickCount = 0;
        this.resetId = null;
      }.bind(this);
      this.resetId = setTimeout(fn, CLICK_COUNT_TIMEOUT);
    },
    cancelResetClickCount: function() {
      if (this.resetId) {
        clearTimeout(this.resetId);
      }
    },
    typeToButtons: function(type) {
      var ret = 0;
      if (type === 'touchstart' || type === 'touchmove') {
        ret = 1;
      }
      return ret;
    },
    touchToPointer: function(inTouch) {
      var cte = this.currentTouchEvent;
      var e = dispatcher.cloneEvent(inTouch);

      // We reserve pointerId 1 for Mouse.
      // Touch identifiers can start at 0.
      // Add 2 to the touch identifier for compatibility.
      var id = e.pointerId = inTouch.identifier + 2;
      e.target = captureInfo[id] || findTarget(e);
      e.bubbles = true;
      e.cancelable = true;
      e.detail = this.clickCount;
      e.button = 0;
      e.buttons = this.typeToButtons(cte.type);
      e.width = (inTouch.radiusX || inTouch.webkitRadiusX || 0) * 2;
      e.height = (inTouch.radiusY || inTouch.webkitRadiusY || 0) * 2;
      e.pressure = inTouch.force || inTouch.webkitForce || 0.5;
      e.isPrimary = this.isPrimaryTouch(inTouch);
      e.pointerType = this.POINTER_TYPE;

      // forward modifier keys
      e.altKey = cte.altKey;
      e.ctrlKey = cte.ctrlKey;
      e.metaKey = cte.metaKey;
      e.shiftKey = cte.shiftKey;

      // forward touch preventDefaults
      var self = this;
      e.preventDefault = function() {
        self.scrolling = false;
        self.firstXY = null;
        cte.preventDefault();
      };
      return e;
    },
    processTouches: function(inEvent, inFunction) {
      var tl = inEvent.changedTouches;
      this.currentTouchEvent = inEvent;
      for (var i = 0, t; i < tl.length; i++) {
        t = tl[i];
        inFunction.call(this, this.touchToPointer(t));
      }
    },

    // For single axis scrollers, determines whether the element should emit
    // pointer events or behave as a scroller
    shouldScroll: function(inEvent) {
      if (this.firstXY) {
        var ret;
        var scrollAxis = inEvent.currentTarget._scrollType;
        if (scrollAxis === 'none') {

          // this element is a touch-action: none, should never scroll
          ret = false;
        } else if (scrollAxis === 'XY') {

          // this element should always scroll
          ret = true;
        } else {
          var t = inEvent.changedTouches[0];

          // check the intended scroll axis, and other axis
          var a = scrollAxis;
          var oa = scrollAxis === 'Y' ? 'X' : 'Y';
          var da = Math.abs(t['client' + a] - this.firstXY[a]);
          var doa = Math.abs(t['client' + oa] - this.firstXY[oa]);

          // if delta in the scroll axis > delta other axis, scroll instead of
          // making events
          ret = da >= doa;
        }
        this.firstXY = null;
        return ret;
      }
    },
    findTouch: function(inTL, inId) {
      for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {
        if (t.identifier === inId) {
          return true;
        }
      }
    },

    // In some instances, a touchstart can happen without a touchend. This
    // leaves the pointermap in a broken state.
    // Therefore, on every touchstart, we remove the touches that did not fire a
    // touchend event.
    // To keep state globally consistent, we fire a
    // pointercancel for this "abandoned" touch
    vacuumTouches: function(inEvent) {
      var tl = inEvent.touches;

      // pointermap.size should be < tl.length here, as the touchstart has not
      // been processed yet.
      if (pointermap$1.size >= tl.length) {
        var d = [];
        pointermap$1.forEach(function(value, key) {

          // Never remove pointerId == 1, which is mouse.
          // Touch identifiers are 2 smaller than their pointerId, which is the
          // index in pointermap.
          if (key !== 1 && !this.findTouch(tl, key - 2)) {
            var p = value.out;
            d.push(p);
          }
        }, this);
        d.forEach(this.cancelOut, this);
      }
    },
    touchstart: function(inEvent) {
      this.vacuumTouches(inEvent);
      this.setPrimaryTouch(inEvent.changedTouches[0]);
      this.dedupSynthMouse(inEvent);
      if (!this.scrolling) {
        this.clickCount++;
        this.processTouches(inEvent, this.overDown);
      }
    },
    overDown: function(inPointer) {
      pointermap$1.set(inPointer.pointerId, {
        target: inPointer.target,
        out: inPointer,
        outTarget: inPointer.target
      });
      dispatcher.enterOver(inPointer);
      dispatcher.down(inPointer);
    },
    touchmove: function(inEvent) {
      if (!this.scrolling) {
        if (this.shouldScroll(inEvent)) {
          this.scrolling = true;
          this.touchcancel(inEvent);
        } else {
          inEvent.preventDefault();
          this.processTouches(inEvent, this.moveOverOut);
        }
      }
    },
    moveOverOut: function(inPointer) {
      var event = inPointer;
      var pointer = pointermap$1.get(event.pointerId);

      // a finger drifted off the screen, ignore it
      if (!pointer) {
        return;
      }
      var outEvent = pointer.out;
      var outTarget = pointer.outTarget;
      dispatcher.move(event);
      if (outEvent && outTarget !== event.target) {
        outEvent.relatedTarget = event.target;
        event.relatedTarget = outTarget;

        // recover from retargeting by shadow
        outEvent.target = outTarget;
        if (event.target) {
          dispatcher.leaveOut(outEvent);
          dispatcher.enterOver(event);
        } else {

          // clean up case when finger leaves the screen
          event.target = outTarget;
          event.relatedTarget = null;
          this.cancelOut(event);
        }
      }
      pointer.out = event;
      pointer.outTarget = event.target;
    },
    touchend: function(inEvent) {
      this.dedupSynthMouse(inEvent);
      this.processTouches(inEvent, this.upOut);
    },
    upOut: function(inPointer) {
      if (!this.scrolling) {
        dispatcher.up(inPointer);
        dispatcher.leaveOut(inPointer);
      }
      this.cleanUpPointer(inPointer);
    },
    touchcancel: function(inEvent) {
      this.processTouches(inEvent, this.cancelOut);
    },
    cancelOut: function(inPointer) {
      dispatcher.cancel(inPointer);
      dispatcher.leaveOut(inPointer);
      this.cleanUpPointer(inPointer);
    },
    cleanUpPointer: function(inPointer) {
      pointermap$1.delete(inPointer.pointerId);
      this.removePrimaryPointer(inPointer);
    },

    // prevent synth mouse events from creating pointer events
    dedupSynthMouse: function(inEvent) {
      var lts = mouseEvents.lastTouches;
      var t = inEvent.changedTouches[0];

      // only the primary finger will synth mouse events
      if (this.isPrimaryTouch(t)) {

        // remember x/y of last touch
        var lt = { x: t.clientX, y: t.clientY };
        lts.push(lt);
        var fn = (function(lts, lt) {
          var i = lts.indexOf(lt);
          if (i > -1) {
            lts.splice(i, 1);
          }
        }).bind(null, lts, lt);
        setTimeout(fn, DEDUP_TIMEOUT);
      }
    }
  };

  INSTALLER = new Installer(touchEvents.elementAdded, touchEvents.elementRemoved,
    touchEvents.elementChanged, touchEvents);

  var pointermap$2 = dispatcher.pointermap;
  var HAS_BITMAP_TYPE = window.MSPointerEvent &&
    typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === 'number';
  var msEvents = {
    events: [
      'MSPointerDown',
      'MSPointerMove',
      'MSPointerUp',
      'MSPointerOut',
      'MSPointerOver',
      'MSPointerCancel',
      'MSGotPointerCapture',
      'MSLostPointerCapture'
    ],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    POINTER_TYPES: [
      '',
      'unavailable',
      'touch',
      'pen',
      'mouse'
    ],
    prepareEvent: function(inEvent) {
      var e = inEvent;
      if (HAS_BITMAP_TYPE) {
        e = dispatcher.cloneEvent(inEvent);
        e.pointerType = this.POINTER_TYPES[inEvent.pointerType];
      }
      return e;
    },
    cleanup: function(id) {
      pointermap$2.delete(id);
    },
    MSPointerDown: function(inEvent) {
      pointermap$2.set(inEvent.pointerId, inEvent);
      var e = this.prepareEvent(inEvent);
      dispatcher.down(e);
    },
    MSPointerMove: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.move(e);
    },
    MSPointerUp: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.up(e);
      this.cleanup(inEvent.pointerId);
    },
    MSPointerOut: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.leaveOut(e);
    },
    MSPointerOver: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.enterOver(e);
    },
    MSPointerCancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.cleanup(inEvent.pointerId);
    },
    MSLostPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent('lostpointercapture', inEvent);
      dispatcher.dispatchEvent(e);
    },
    MSGotPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent('gotpointercapture', inEvent);
      dispatcher.dispatchEvent(e);
    }
  };

  function applyPolyfill() {

    // only activate if this platform does not have pointer events
    if (!window.PointerEvent) {
      window.PointerEvent = PointerEvent;

      if (window.navigator.msPointerEnabled) {
        var tp = window.navigator.msMaxTouchPoints;
        Object.defineProperty(window.navigator, 'maxTouchPoints', {
          value: tp,
          enumerable: true
        });
        dispatcher.registerSource('ms', msEvents);
      } else {
        Object.defineProperty(window.navigator, 'maxTouchPoints', {
          value: 0,
          enumerable: true
        });
        dispatcher.registerSource('mouse', mouseEvents);
        if (window.ontouchstart !== undefined) {
          dispatcher.registerSource('touch', touchEvents);
        }
      }

      dispatcher.register(document);
    }
  }

  var n = window.navigator;
  var s;
  var r;
  var h;
  function assertActive(id) {
    if (!dispatcher.pointermap.has(id)) {
      var error = new Error('InvalidPointerId');
      error.name = 'InvalidPointerId';
      throw error;
    }
  }
  function assertConnected(elem) {
    var parent = elem.parentNode;
    while (parent && parent !== elem.ownerDocument) {
      parent = parent.parentNode;
    }
    if (!parent) {
      var error = new Error('InvalidStateError');
      error.name = 'InvalidStateError';
      throw error;
    }
  }
  function inActiveButtonState(id) {
    var p = dispatcher.pointermap.get(id);
    return p.buttons !== 0;
  }
  if (n.msPointerEnabled) {
    s = function(pointerId) {
      assertActive(pointerId);
      assertConnected(this);
      if (inActiveButtonState(pointerId)) {
        dispatcher.setCapture(pointerId, this, true);
        this.msSetPointerCapture(pointerId);
      }
    };
    r = function(pointerId) {
      assertActive(pointerId);
      dispatcher.releaseCapture(pointerId, true);
      this.msReleasePointerCapture(pointerId);
    };
  } else {
    s = function setPointerCapture(pointerId) {
      assertActive(pointerId);
      assertConnected(this);
      if (inActiveButtonState(pointerId)) {
        dispatcher.setCapture(pointerId, this);
      }
    };
    r = function releasePointerCapture(pointerId) {
      assertActive(pointerId);
      dispatcher.releaseCapture(pointerId);
    };
  }
  h = function hasPointerCapture(pointerId) {
    return !!dispatcher.captureInfo[pointerId];
  };

  function applyPolyfill$1() {
    if (window.Element && !Element.prototype.setPointerCapture) {
      Object.defineProperties(Element.prototype, {
        'setPointerCapture': {
          value: s
        },
        'releasePointerCapture': {
          value: r
        },
        'hasPointerCapture': {
          value: h
        }
      });
    }
  }

  applyAttributeStyles();
  applyPolyfill();
  applyPolyfill$1();

  var pointerevents = {
    dispatcher: dispatcher,
    Installer: Installer,
    PointerEvent: PointerEvent,
    PointerMap: PointerMap,
    targetFinding: targeting
  };

  return pointerevents;

}));
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/drupal-menu/pep.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/drupal-menu/drupal-menu.js. */
(function($,Drupal){'use strict';Drupal.behaviors.DX8Menus={attach:function(context,settings){var menuItemLinks=[],menuItemLinkCounter,cmm=new Drupal.CohesionResponsiveBreakpoints(),over=false,$lastAnimatedSubmenu=$(),hasEntered=false,onceMenuItem='js-coh-menu-item-init',onceMenuItemLink='js-coh-menu-item-link-init',nameSpace='.coh-menu-item-link',cls={isCollapsed:'is-collapsed',isExpanded:'is-expanded',both:'is-collapsed is-expanded',hasChildren:'has-children',menuListContainer:'coh-menu-list-container',menuListItem:'coh-menu-list-item',menuListLink:'js-coh-menu-item-link'},aria={expanded:'aria-expanded',popup:'aria-haspopup'},onEnter=['pointerenter'],onLeave=['mouseleave'],onClick=['click'],onFocus=['focus'],onFocusOut=['focusout'],onKeyDown=['keydown']
function initDrupalMenuItemLink(settings){var bOnClick=true;settings=settings.cohesion;var $a=settings.settings.$a,$li=settings.settings.$li,isParent=settings.settings.isParent,thisNameSpace=nameSpace+$a[0].nodeName;$li.off(thisNameSpace);$a.off(thisNameSpace);var setting=settings.settings.breakpoints[settings.key];if(typeof setting.animationTarget!=='undefined')$a.data('currentAnimationTarget',$(setting.animationTarget,$li));if($a.data('currentAnimationTarget'))$($a.data('currentAnimationTarget')).css('display','');var toggleSiblings=setting.link_interaction==='toggle-on-click-hide-siblings'||setting.button_interaction==='toggle-on-click-hide-siblings';if((setting.link_interaction==='toggle-on-hover'||toggleSiblings||setting.link_interaction==='toggle-on-click'||setting.button_interaction==='toggle-on-click'||settings.button_interaction==='toggle-parent-on-click')&&$li.hasClass(cls.hasChildren)){$a.attr(aria.popup,true)}else{$a.removeAttr(aria.popup);$a.removeAttr(aria.expanded)};if(setting.link_interaction==='toggle-on-hover'){over=false;if($li.hasClass(cls.hasChildren)){$li.on(onLeave.join(thisNameSpace+' ')+thisNameSpace,function(event){if(!hasEntered)return;window.setTimeout(function(){over=false},200);event.preventDefault();if($li.hasClass(cls.isCollapsed))return;toggleSubMenu($li,$a,setting,true,event)});$li.on(onEnter.join(thisNameSpace+' ')+thisNameSpace,function(event){window.setTimeout(function(){over=true},200);event.preventDefault();setTimeout(function(){toggleSubMenu($li,$a,setting);hasEntered=true},1)});$a.on(onClick.join(thisNameSpace+' ')+thisNameSpace,function(event){if(!over)event.preventDefault()})};bOnClick=false};if(bOnClick)$a.on(onClick.join(thisNameSpace+' ')+thisNameSpace,function(e){if(setting.link_interaction==='click-through-to-link')return;if(setting.link_interaction==='no-interaction'){e.preventDefault();return};if($li.hasClass(cls.hasChildren)){e.preventDefault();toggleSubMenu($li,$(this),setting,toggleSiblings);if(setting.link_interaction==='toggle-parent-on-click')return}});$a.on(onFocus.join(thisNameSpace+' ')+thisNameSpace,function(e){over=true;for(var i=0;i<menuItemLinks.length;i++)if($(this).is(menuItemLinks[i]['$a'])){menuItemLinkCounter=i;break};$a.on(onKeyDown.join(thisNameSpace+' ')+thisNameSpace,function(e){switch(e.key){case' ':case'Spacebar':e.preventDefault();e.stopPropagation();if(!$li.hasClass(cls.hasChildren))window.location=$a.attr('href');if($li.hasClass(cls.hasChildren))toggleSubMenu($li,$a,setting,toggleSiblings);break;case'ArrowDown':case'ArrowRight':case'Down':case'Right':e.preventDefault();e.stopPropagation();if(isParent&&(e.key==='ArrowRight'||e.key==='Right')&&$li.next('.'+cls.menuListItem)&&!$li.hasClass(cls.isExpanded)){$('.'+cls.menuListLink,$li.next('.'+cls.menuListItem)).eq(0).focus();break};if($li.hasClass(cls.isExpanded)&&$li.hasClass(cls.hasChildren))focusNextMenuItem($li);if(!$li.hasClass(cls.isExpanded)&&$li.hasClass(cls.hasChildren))toggleSubMenu($li,$a,setting,toggleSiblings);if(!$li.hasClass(cls.hasChildren))focusNextMenuItem($li);break;case'Escape':case'Esc':e.preventDefault();e.stopPropagation();if($li.parent().closest('.'+cls.menuListItem)){toggleSubMenu($li.parent().closest('.'+cls.menuListItem),$li.parent().closest('.'+cls.menuListItem).children('.'+cls.menuListLink),setting,toggleSiblings);$li.parent().closest('.'+cls.menuListItem).children('.'+cls.menuListLink).focus()};break;case'ArrowUp':case'ArrowLeft':case'Up':case'Left':e.preventDefault();e.stopPropagation();if(isParent&&(e.key==='ArrowLeft'||e.key==='Left')&&$li.prev('.'+cls.menuListItem)&&!$li.hasClass(cls.isExpanded)){$('.'+cls.menuListLink,$li.prev('.'+cls.menuListItem)).eq(0).focus();break};if(!$li.hasClass(cls.hasChildren)||$li.hasClass(cls.isCollapsed))focusPreviousMenuItem();if(!$li.hasClass(cls.isCollapsed)&&$li.hasClass(cls.hasChildren))toggleSubMenu($li,$a,setting,toggleSiblings);break;case'Enter':e.preventDefault();e.stopPropagation();window.location=$a.attr('href');break;default:return}})});$a.on(onFocusOut.join(thisNameSpace+' ')+thisNameSpace,function(e){$a.off(onKeyDown.join(thisNameSpace+' ')+thisNameSpace);over=false})}
function initDrupalMenuItem(settings){settings=settings.cohesion;var $a=settings.settings.$a,$li=settings.settings.$li,bInteracted=false,$interactees=$a.add($a.siblings('a, button, span')),setting=settings.settings.breakpoints[settings.key];if(typeof $li.data('interacted')!=='undefined'&&$li.data('interacted')===true)bInteracted=true;if(!bInteracted){$li.toggleClass(cls.isCollapsed,setting==='hidden'||(setting==='trail'&&!$li.hasClass('in-active-trail')));$li.toggleClass(cls.isExpanded,setting==='visible'||(setting==='trail'&&$li.hasClass('in-active-trail')));if($li.hasClass(cls.hasChildren))$interactees.each(function(){var $interactee=$(this);if($interactee.attr(aria.popup)==="true"){if($li.hasClass(cls.isCollapsed))$interactee.attr(aria.expanded,false);if($li.hasClass(cls.isExpanded))$interactee.attr(aria.expanded,true)}})}}
function toggleSiblingsFn($li,$a,setting){var $siblings=$li.siblings('li.has-children');$siblings.children('a, button, span').each(function(){var $this=$(this);if($this.attr(aria.expanded)==="true")toggleSubMenu($this.parent('li'),$this,setting,false)})}
function toggleSubMenu($li,$a,setting,toggleSiblings){var $interactees=$a.add($a.siblings('a, button, span')),$submenu;if(setting.animationTarget&&setting.animationType){$submenu=$('~'+setting.animationTarget,$a);if(setting.button_interaction==='toggle-parent-on-click'){$submenu=$('> '+setting.animationTarget,$li);$interactees=$interactees.add($('> a, > button, > span',$li))};var animationOriginArray;if(setting.animationOrigin)animationOriginArray=setting.animationOrigin.split(',');if((setting.link_interaction!=='toggle-on-click-hide-siblings'||setting.button_interaction!=='toggle-on-click-hide-siblings')&&$lastAnimatedSubmenu.length&&!$lastAnimatedSubmenu.is($submenu))$lastAnimatedSubmenu.stop(true,true);$submenu.stop(true,true).toggle({effect:setting.animationType,direction:setting.animationDirection,distance:setting.animationDistance,percent:setting.animationScale,origin:animationOriginArray,size:setting.animationFoldHeight,horizFirst:setting.animationHorizontalFirst,times:setting.animationIterations,easing:setting.animationEasing,duration:setting.animationDuration});$lastAnimatedSubmenu=$submenu};$li.toggleClass(cls.both);$interactees.each(function(){var $interactee=$(this);if($interactee.attr(aria.popup)==="true"){if($li.hasClass(cls.isCollapsed))$interactee.attr(aria.expanded,false);if($li.hasClass(cls.isExpanded))$interactee.attr(aria.expanded,true)}});$li.data('interacted',true);if(toggleSiblings)toggleSiblingsFn($li,$a,setting)}
function focusPreviousMenuItem(){if(menuItemLinkCounter>0){menuItemLinkCounter--;menuItemLinks[menuItemLinkCounter]['$a'].focus()}}
function focusNextMenuItem(){if(menuItemLinkCounter+1<menuItemLinks.length){menuItemLinkCounter++;menuItemLinks[menuItemLinkCounter]['$a'].focus()}}
function focusMenuItem(){menuItemLinks[menuItemLinkCounter]['$a'].focus()};var menuItems=$('.js-coh-menu-item-link, .js-coh-menu-item-button');$.each(menuItems.once(onceMenuItemLink),function(i,e){var $this=$(this),$li=$(this).closest('.coh-menu-list-item'),responsiveSettings=$this.data('cohSettings'),key,settings={$a:$this,$li:$li,isParent:!$li.parent().closest('.'+cls.menuListItem).length,breakpoints:{}};menuItemLinks.push({$a:$this,$li:$li,tabindex:$this.attr('tabindex')||i});if(i+1===menuItems.length)menuItemLinks.sort(function(a,b){return a.tabindex-b.tabindex});for(var i=0;i<cmm.breakpoints.length;i++){key=cmm.breakpoints[i].key;settings.breakpoints[key]={};if(responsiveSettings&&typeof responsiveSettings[key]!=='undefined'){settings.breakpoints[key]=responsiveSettings[key];var previous=responsiveSettings[key]}else if(typeof cmm.breakpoints[i-1]!=='undefined'&&typeof previous!=='undefined')settings.breakpoints[key]=previous};cmm.addListeners(settings,initDrupalMenuItemLink)});$.each($('.js-coh-menu-item').once(onceMenuItem),function(){var $this=$(this),responsiveSettings=$this.data('cohSettings'),key,settings={$li:$this,$a:$('> a, > button, > span',$this),breakpoints:{}};if($this.hasClass(cls.hasChildren)){for(var i=0;i<cmm.breakpoints.length;i++){key=cmm.breakpoints[i].key;settings.breakpoints[key]={};if(typeof responsiveSettings[key]!=='undefined'){settings.breakpoints[key]=responsiveSettings[key];var previous=responsiveSettings[key]}else if(typeof cmm.breakpoints[i-1]!=='undefined'&&typeof previous!=='undefined')settings.breakpoints[key]=previous};cmm.addListeners(settings,initDrupalMenuItem)}})}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/drupal-menu/drupal-menu.js. */;
