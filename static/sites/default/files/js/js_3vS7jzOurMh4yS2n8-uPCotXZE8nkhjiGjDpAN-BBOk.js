/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/modules/custom/calculator_module/js/calculator.js. */
const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
let affordableDestination;
let increment;
let prevScreenSize;

const frequencies = {
  Weekly: 4,
  'Bi-weekly': 2,
  Monthly: 1
};

// const milesArr = [];

const calculator = document.querySelector('.calculator');

const format = function(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const setInitialValues = function() {
  const inputs = document.querySelectorAll('.slider-input');
  inputs[0].value = 50000;
  inputs[1].value = 1000;

  // bugfix: default mileage was incorrect
  const initDeposit = document.querySelector('input[name="initial-deposit"]');
  const reccDeposit = document.querySelector('input[name="recurring-deposit"]');

  updateMiles(initDeposit, reccDeposit);
};

const moveLabel = function(label, arrow, calc) {
  if (calc > 11.75 && calc <= 89) {
    arrow.style.transition = '';
    label.style.transition = '';
    label.style.left = 'calc(' + calc + '% - 67px)';
    arrow.style.left = '' + (calc - 0.5) + '%';
  } else if (calc > 92.75 && calc <= 99) {
    label.style.transition = 'all 0.5s ease';
    label.style.left = 'calc(100% - 130px)';

    arrow.style.transition = 'all 0.3s ease;';
    arrow.style.left = 'calc(' + calc + '%' + ' - 20px)';
  } else if (calc == 100) {
    label.style.left = 'calc(100% - 130px)';
    // label.style.transition = 'all 0.5s ease';
    arrow.style.left = 'calc(' + (calc - 0.5) + '%' + ' - 20px)';
  } else if (calc == 0) {
    label.style.left = 0;
    // arrow.style.transition = 'all 0.3s ease;';
    arrow.style.left = 'calc(' + (calc + 1.8) + '%)';
  }

  if (calc <= 10 && calc > 1) {
    // label.style.transition = 'all 0.5s ease';
    label.style.left = 0;
    arrow.style.transition = 'all 0.3s ease;';
    arrow.style.left = 'calc(' + (calc + 1.2) + '%)';
  }
};

const setSliderStyles = function(slider) {
  const name = slider.name;
  const label = document.querySelectorAll('.slider-label-wrapper');
  const arrow = document.querySelectorAll('.label-arrow');
  const calc = slider.value / 1000 / 2;
  const onDesktop = window.innerWidth > 650;
  if (name == 'initial-deposit') {
    if (!isIE11)
      slider.style.background =
        'linear-gradient(to right, #f36a20 0%, #f36a20 ' +
        calc +
        '%, #D5D5D5 ' +
        calc +
        '%, #D5D5D5 100%)';

    if (onDesktop) {
      moveLabel(label[0], arrow[0], calc);
    }
  } else {
    if (!isIE11)
      slider.style.background =
        'linear-gradient(to right, #f36a20 0%, #f36a20 ' +
        slider.value / 50 / 2 +
        '%, #D5D5D5 ' +
        slider.value / 50 / 2 +
        '%, #D5D5D5 100%)';

    if (onDesktop) {
      moveLabel(label[1], arrow[1], slider.value / 100);
    }
  }
};

const getMiles = function(id, rd) {
  const freq = document.querySelector('.dropdown-list').value;
  const initialDeposit = Number(id.value);
  const recurringDeposit = Number(rd.value);
  const milesArr = [];
  const rate = drupalSettings.mileagerate ? drupalSettings.mileagerate : 1.5;
  for (let i = 0; i <= 12; i++) {
    if (i == 0) {
      milesArr.push(0);
    } else {
      const calc2 =
        milesArr[i - 1] +
        ((initialDeposit*rate) + ((recurringDeposit * frequencies[freq] * (i - 1)) * rate)) / 12;
      milesArr.push(calc2);
    }
  }
  return Math.floor(milesArr[12]);
  // return initialDeposit + recurringDeposit * frequencies[freq];
};

const updateSliderLabel = function(slider) {
  const name = slider.name;
  const value = format(slider.value);
  const label = document.querySelector('label[for="' + name + '"]');
  label.innerText = '$' + value + '';
};

const updateMiles = function(id, rd) {
  const el = document.querySelector('.miles');
  const miles = getMiles(id, rd);
  el.innerHTML = '<span>' + format(miles) + '</span>';
};

const setDestination = function(destination) {
  const el = document.querySelector('.destination');
  if (destination != affordableDestination) {
    affordableDestination = destination;
    el.innerHTML =
      '<span class="animated fadeInLeft">' + destination + '</span>';
  }
};

// calc destination
const cd = function(nums) {
  const min = nums[0];
  const miles = nums[1];
  const max = nums[2];
  return min < miles && miles <= max;
};

const attachSliderEvents = function() {
  const inputs = document.querySelectorAll('.slider-input');
  const initDeposit = document.querySelector('input[name="initial-deposit"]');
  const reccDeposit = document.querySelector('input[name="recurring-deposit"]');

  inputs.forEach(function(slider) {
    updateSliderLabel(slider);
    slider.addEventListener(isIE11 ? 'change' : 'input', function() {
      setSliderStyles(slider);
      updateSliderLabel(slider);
      updateMiles(initDeposit, reccDeposit);
    });

    slider.addEventListener('focus', function() {
      const dropdownOpen = document.querySelector('.dropdown-open');

      if (dropdownOpen) closeDropdown();
    });
  });
};

// dropdown
const closeDropdown = function() {
  const dropdown = document.querySelector('.dropdown');
  dropdown.className = 'dropdown dropdown-closed';

  return dropdown;
};

const openDropdown = function() {
  const dropdown = document.querySelector('.dropdown');
  dropdown.className = 'dropdown dropdown-open';

  // const choices = document.querySelector('.dropdown-list');
  // choices.click();

  return dropdown;
};

const toggleDropdown = function() {
  const dropdownClosed = document.querySelector('.dropdown-closed');
  const dropdown = document.querySelector('.dropdown');

  if (dropdownClosed) {
    dropdown.className = 'dropdown dropdown-open';
  } else {
    dropdown.className = 'dropdown dropdown-closed';
  }
};

const handleArrowKeyInput = function(e, items) {
  const left = e.keyCode === 37;
  const up = e.keyCode === 38;
  const right = e.keyCode === 39;
  const down = e.keyCode === 40;
  const arrowInput = up || down || left || right;
  if (arrowInput) {
    e.preventDefault();
    e.target.classList.remove('focused');
    if ((up || left) && e.target.previousElementSibling === null) {
      items[items.length - 1].focus();
      items[items.length - 1].classList.add('focused');
      return;
    }
    if ((down || right) && e.target.nextElementSibling === null) {
      items[0].focus();
      items[0].classList.add('focused');
      return;
    }
    if (down || right) {
      e.target.nextElementSibling.focus();
      e.target.nextElementSibling.classList.add('focused');
    } else if (up || left) {
      e.target.previousElementSibling.focus();
      e.target.previousElementSibling.classList.add('focused');
    }
  }
};

const attachDropdownEvents = function() {
  const dropdown = document.querySelector('.dropdown-list');

  dropdown.addEventListener('click', function(e) {
    toggleDropdown();
  });

  dropdown.addEventListener('change', function(e) {
    const initDeposit = document.querySelector('input[name="initial-deposit"]');
    const reccDeposit = document.querySelector('input[name="recurring-deposit"]');

    updateMiles(initDeposit, reccDeposit);
    toggleDropdown();
  });
};

const fixLabelPosition = function() {
  const screenSize = window.innerWidth;
  const idLabel = document.querySelector(
    '.calculator .initial-deposit-label .slider-label-wrapper'
  );
  const rdLabel = document.querySelector(
    '.calculator .recurring-deposit-label .slider-label-wrapper'
  );
  const initDeposit = document.querySelector('input[name="initial-deposit"]');
  const reccDeposit = document.querySelector('input[name="recurring-deposit"]');

  if (screenSize < 650 && idLabel.style.left != '107px') {
    idLabel.style.left = '107px';
    rdLabel.style.left = '136px';
  }

  setSliderStyles(initDeposit);
  setSliderStyles(reccDeposit);
};

window.onload = function() {
  window.onresize = fixLabelPosition;
  setInitialValues();
  attachSliderEvents();
  attachDropdownEvents();
};

/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/modules/custom/calculator_module/js/calculator.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/modules/custom/calculator_module/js/polyfills.js. */
if("NodeList"in window&&!NodeList.prototype.forEach)NodeList.prototype.forEach=function(callback,thisArg){thisArg=thisArg||window;for(var i=0;i<this.length;i++)callback.call(thisArg,this[i],i,this)};if(typeof Element.prototype.addEventListener==="undefined")Element.prototype.addEventListener=function(e,callback){e="on"+e;return this.attachEvent(e,callback)}
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/modules/custom/calculator_module/js/polyfills.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/cohContainerMatchHeights/coh-container-match-heights.js. */
(function($,Drupal){'use strict';var cmm=new Drupal.CohesionResponsiveBreakpoints(),pluginName='cohesionContainerMatchHeights',defaults={current:false,excludeElements:['column'],expressionPrefixes:['>','> .coh-column'],loadersPrefix:'.coh-row > .coh-row-inner',elements:{none:{parent:'none',child:false},h1:{parent:'h1',child:false},h2:{parent:'h2',child:false},h3:{parent:'h3',child:false},h4:{parent:'h4',child:false},h5:{parent:'h5',child:false},h6:{parent:'h6',child:false},p:{parent:'p',child:false},'list-container':{parent:'.coh-list-container',child:false},container:{parent:'.coh-container',child:false},wysiwyg:{parent:'.coh-wysiwyg',child:false},hyperlink:{parent:'a',child:false},blockquote:{parent:'blockquote',child:false},slide:{parent:'.slick-list > .slick-track > .coh-slider-item',child:false},iframe:{parent:'.coh-iframe',child:false},'youtube-video-background':{parent:'.coh-youtube-video-background',child:false}},loaders:['.coh-row > .coh-row-inner frame','.coh-row > .coh-row-inner iframe','.coh-row > .coh-row-inner img','.coh-row > .coh-row-inner input[type="image"]','.coh-row > .coh-row-inner link','.coh-row > .coh-row-inner script','.coh-row > .coh-row-inner style']}
function ccmh(element,options){this.element=element;this.$element=$(element);this.options=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this._current=false;this.init()};ccmh.prototype.init=function(){var _self=this,key='',previous={target:'none'},settings={};settings._self=_self;settings.breakpoints={};for(var i=0;i<cmm.breakpoints.length;i++){key=cmm.breakpoints[i].key;settings.breakpoints[key]=previous;if(typeof _self.options.targets[key]!=='undefined'){settings.breakpoints[key]=_self.options.targets[key];previous=_self.options.targets[key]}else if(typeof cmm.breakpoints[i-1]!=='undefined'&&typeof previous!==false){settings.breakpoints[key]=previous;_self.options.targets[key]={};_self.options.targets[key]=previous}};cmm.addListeners(settings,_self.setMatchHeightsCallback);$(_self.options.context).ajaxComplete(function(event,xhr,settings){$.fn.matchHeight._update();$(_self.options.loaders.toString(),_self.options.context).on('load',function(){if($(this).length)$.fn.matchHeight._update()})})};ccmh.prototype.getElement=function(elementKey){var element;if(this.options.elements.hasOwnProperty(elementKey)){element=this.options.elements[elementKey]}else element=elementKey.match(/^[.]/)?elementKey:'.'+elementKey;return element};ccmh.prototype.getElementExpression=function(element,targetLevel){var expression=[],prefixes=[''],el=this.getElement(element),elementIsClass=typeof el==='string',depth=typeof targetLevel!=='undefined'?targetLevel:false;if(this.options.excludeElements.indexOf(element)<0)prefixes=this.options.expressionPrefixes;for(var i=0;i<prefixes.length;i++){if(!elementIsClass){expression[i]=prefixes[i]+' > '+el.parent}else expression[i]=prefixes[i]+' '+el;if(depth!==false)expression[i]=expression[i]+':nth-of-type('+depth+')';if(!elementIsClass&&el.child)expression[i]=expression[i]+' > '+el.child};return expression.join(', ')};ccmh.prototype.setMatchHeights=function(settings){var _self=this,target=settings.cohesion.settings.breakpoints[settings.cohesion.key];if(typeof target==='undefined'||target===false)return;var el=_self.getElement(target.target);_self.destroyMatchHeights();if(el!=='none'){var expression=_self.getElementExpression(target.target,target.targetLevel);_self._current=$(expression,_self.$element);return _self._current.matchHeight({byRow:false})}};ccmh.prototype.setMatchHeightsCallback=function(settings){var _self=settings.cohesion.settings._self||this;return _self.setMatchHeights(settings)};ccmh.prototype.destroyMatchHeights=function(){return $(this._current).matchHeight({remove:true})};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,'plugin_'+pluginName))$.data(this,'plugin_'+pluginName,new ccmh(this,options))})}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/cohContainerMatchHeights/coh-container-match-heights.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/row-for-columns/row-for-columns.js. */
(function($,Drupal,drupalSettings){'use strict';Drupal.behaviors.CohesionRowForColumns={attach:function(context,settings){$.each($('[data-coh-row-match-heights]',context).once('coh-row-match-heights-init'),function(){var targets=$(this).data('cohRowMatchHeights');$('> .coh-row-inner',this).cohesionContainerMatchHeights({targets:targets,context:context})})}}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/row-for-columns/row-for-columns.js. */;
