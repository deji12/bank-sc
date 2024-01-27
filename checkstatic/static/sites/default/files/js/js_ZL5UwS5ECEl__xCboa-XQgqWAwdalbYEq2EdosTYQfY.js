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
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/accordion-tabs-container/jquery.responsiveTabs.js. */
(function($,window,undefined){var defaults={active:null,event:'click',disabled:[],collapsible:'accordion',startCollapsed:false,rotate:false,setHash:false,animation:'default',animationQueue:false,duration:500,fluidHeight:true,scrollToAccordion:false,scrollToAccordionOnLoad:false,scrollToAccordionOffset:0,accordionTabElement:'<div></div>',click:function(){},activate:function(){},activateStart:function(){},activateFinished:function(){},deactivate:function(){},load:function(){},activateState:function(){},classes:{stateDefault:'r-tabs-state-default',stateActive:'r-tabs-state-active',stateDisabled:'r-tabs-state-disabled',stateExcluded:'r-tabs-state-excluded',stateTypePrefix:'r-tabs-state',container:'r-tabs',ul:'r-tabs-nav',tab:'r-tabs-tab',anchor:'r-tabs-anchor',panel:'r-tabs-panel',accordionTitle:'r-tabs-accordion-title'}},events=['tabs-click','tabs-activate','tabs-active-start','tabs-activate-finished','tabs-deactivate','tabs-activate-state','tabs-load','tabs-refresh']
function ResponsiveTabs(element,options){this.element=element;this.$element=$(element);this.tabs=[];this.panels=[];this.tabItems=[];this.tabItemAnchors=[];this.accordionItems=[];this.accordionItemAnchors=[];this.state='';this.rotateInterval=0;this.$queue=$({});this.options=$.extend({},defaults,options);this.init()};ResponsiveTabs.prototype.init=function(){var _this=this;this.tabs=this._loadElements();this._loadClasses();this._loadEvents();this._loadAria();$(window).on('resize',function(e){_this._setState(e);if(_this.options.fluidHeight!==true)_this._equaliseHeights()});$(window).on('hashchange',function(e){var tabRef=_this._getTabRefBySelector(window.location.hash),oTab=_this._getTab(tabRef);if(tabRef>=0&&!oTab._ignoreHashChange&&!oTab.disabled)_this._openTab(e,_this._getTab(tabRef),true)});if(this.options.rotate!==false)this.startRotation();if(this.options.fluidHeight!==true)_this._equaliseHeights();this.$element.bind('tabs-click',function(e,oTab){_this.options.click.call(this,e,oTab)});this.$element.bind('tabs-activate',function(e,oTab){_this.options.activate.call(this,e,oTab)});this.$element.bind('tabs-activate-start',function(e,oTab){_this.options.activateFinished.call(this,e,oTab)});this.$element.bind('tabs-activate-finished',function(e,oTab){_this.options.activateFinished.call(this,e,oTab)});this.$element.bind('tabs-deactivate',function(e,oTab){_this.options.deactivate.call(this,e,oTab)});this.$element.bind('tabs-activate-state',function(e,state){_this.options.activateState.call(this,e,state)});this.$element.bind('tabs-load',function(e){e.stopPropagation();var startTab;_this._setState(e);if(_this.options.startCollapsed!==true&&!(_this.options.startCollapsed==='accordion'&&_this.state==='accordion')){startTab=_this._getStartTab();var cacheAnimationType=_this.options.animation;_this.options.animation='default';_this._openTab(e,startTab);_this.options.animation=cacheAnimationType;_this.options.load.call(this,e,startTab)}});this.$element.trigger('tabs-load',_this)};ResponsiveTabs.prototype._loadElements=function(){var _this=this,$ul=this.$element.children('ul:first'),tabs=[],id=0;this.$element.addClass(_this.options.classes.container);$ul.addClass(_this.options.classes.ul);var wrapper=$('.coh-accordion-tabs-content-wrapper:first',this.$element);wrapper.find('.'+_this.options.classes.accordionTitle).not($('.coh-accordion-tabs-content-wrapper .coh-accordion-tabs .coh-accordion-title',this.$element)).once('tab-init').each(function(){var $accordionTab=$(this),$anchor=$('a',$accordionTab),isExcluded=$accordionTab.hasClass(_this.options.classes.stateExcluded),$panel,panelSelector,$tab,$tabAnchor,tabSettings;if(!isExcluded){panelSelector=$anchor.attr('href');$panel=$(panelSelector);$panel.hide();tabSettings=$accordionTab.data('cohTabSettings');$tab=$('<li />').appendTo($ul);$tab.addClass(tabSettings.customStyle);$tabAnchor=$('<a />',{href:panelSelector}).html($anchor.html()).appendTo($tab);var oTab={_ignoreHashChange:false,id:id,disabled:typeof tabSettings.disabled!=='undefined'?tabSettings.disabled:false,tab:$tab,anchor:$tabAnchor,panel:$panel,selector:panelSelector,accordionTab:$accordionTab,accordionAnchor:$anchor,active:false,linkUrl:typeof tabSettings.linkUrl!=='undefined'?tabSettings.linkUrl:false,linkTarget:typeof tabSettings.linkTarget!=='undefined'?tabSettings.linkTarget:false,hide:typeof tabSettings.hide!=='undefined'?tabSettings.hide:false};id++;tabs.push(oTab);_this.panels.push(oTab.panel);_this.tabItems.push(oTab.tab);_this.tabItemAnchors.push(oTab.anchor);_this.accordionItems.push(oTab.accordionTab);_this.accordionItemAnchors.push(oTab.accordionAnchor)}});return tabs};ResponsiveTabs.prototype._loadAria=function(){for(var i=0;i<this.tabs.length;i++){this.tabs[i].accordionAnchor.attr('aria-expanded',this.tabs[i].active);if(this.tabs[i].disabled)this.tabs[i].accordionAnchor.attr('aria-disabled',this.tabs[i].disabled)}};ResponsiveTabs.prototype._updateAria=function(tab){tab.accordionAnchor.attr('aria-expanded',tab.active);tab.accordionAnchor.removeAttr('aria-disabled');if(tab.disabled||(!this.options.collapsible&&tab.active))tab.accordionAnchor.attr('aria-disabled',true)};ResponsiveTabs.prototype._loadClasses=function(){for(var i=0;i<this.tabs.length;i++){this.tabs[i].tab.addClass(this.options.classes.stateDefault).addClass(this.options.classes.tab);this.tabs[i].anchor.addClass(this.options.classes.anchor);this.tabs[i].panel.addClass(this.options.classes.stateDefault).addClass(this.options.classes.panel);this.tabs[i].accordionTab.addClass(this.options.classes.accordionTitle);this.tabs[i].accordionAnchor.addClass(this.options.classes.anchor);if(this.tabs[i].disabled){this.tabs[i].tab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateDisabled);this.tabs[i].accordionTab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateDisabled)}}};ResponsiveTabs.prototype._loadEvents=function(){var _this=this,fActivate=function(e){var current=_this._getCurrentTab(),activatedTab=e.data.tab;e.preventDefault();if(activatedTab.linkUrl!==false){window.open(activatedTab.linkUrl,activatedTab.linkTarget);return};activatedTab.tab.trigger('tabs-click',activatedTab);if(!(activatedTab.disabled||activatedTab.linkUrl)){if(_this.options.setHash)if(history.pushState){if(!window.location.origin)window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?':'+window.location.port:'');history.pushState(null,null,window.location.origin+window.location.pathname+window.location.search+activatedTab.selector)}else window.location.hash=activatedTab.selector;e.data.tab._ignoreHashChange=true;if(current!==activatedTab||_this._isCollapisble()){_this._closeTab(e,current);if(current!==activatedTab||!_this._isCollapisble())_this._openTab(e,activatedTab,false,true)}}};for(var i=0;i<this.tabs.length;i++){this.tabs[i].anchor.once('loadEvent').on(_this.options.event,{tab:_this.tabs[i]},fActivate);this.tabs[i].accordionAnchor.once('loadEvent').on(_this.options.event,{tab:_this.tabs[i]},fActivate)}};ResponsiveTabs.prototype._getStartTab=function(){var tabRef=this._getTabRefBySelector(window.location.hash),startTab;if(tabRef>=0&&!this._getTab(tabRef).disabled){startTab=this._getTab(tabRef)}else if(this.options.active>0&&!this._getTab(this.options.active).disabled){startTab=this._getTab(this.options.active)}else startTab=this._getTab(0);return startTab};ResponsiveTabs.prototype._setState=function(e){var $ul=$('ul:first',this.$element),oldState=this.state,startCollapsedIsState=(typeof this.options.startCollapsed==='string'),startTab,visible=$ul.is(':visible');if(visible){this.state='tabs'}else this.state='accordion';if(this.state!==oldState){this.$element.toggleClass(this.options.classes.stateTypePrefix+'-tabs',visible);this.$element.toggleClass(this.options.classes.stateTypePrefix+'-accordion',!visible);this.$element.trigger('tabs-activate-state',{oldState:oldState,newState:this.state,tabs:this});if(oldState&&startCollapsedIsState&&this.options.startCollapsed!==this.state&&this._getCurrentTab()===undefined){startTab=this._getStartTab(e);this._openTab(e,startTab)}}};ResponsiveTabs.prototype._openTab=function(e,oTab,closeCurrent,stopRotation){var _this=this,scrollOffset;if(typeof oTab==='undefined')return;if(closeCurrent)this._closeTab(e,this._getCurrentTab());if(stopRotation&&this.rotateInterval>0)this.stopRotation();oTab.active=true;oTab.tab.removeClass(_this.options.classes.stateDefault).addClass(_this.options.classes.stateActive);oTab.accordionTab.removeClass(_this.options.classes.stateDefault).addClass(_this.options.classes.stateActive);_this._doTransition(oTab,_this.options.animation,'open',function(){var scrollOnLoad=(e.type!=='tabs-load'||_this.options.scrollToAccordionOnLoad);oTab.panel.removeClass(_this.options.classes.stateDefault).addClass(_this.options.classes.stateActive);_this._updateAria(oTab);if(_this.getState()==='accordion'&&_this.options.scrollToAccordion&&(!_this._isInView(oTab.accordionTab)||_this.options.animation!=='default')&&scrollOnLoad){scrollOffset=oTab.accordionTab.offset().top-_this.options.scrollToAccordionOffset;if(_this.options.animation!=='default'&&_this.options.duration>0){$('html, body').animate({scrollTop:scrollOffset},_this.options.duration)}else $('html, body').animate({scrollTop:scrollOffset},1)}});this.$element.trigger('tabs-activate',oTab)};ResponsiveTabs.prototype._closeTab=function(e,oTab){var _this=this,doQueueOnState=typeof _this.options.animationQueue==='string',doQueue;if(oTab!==undefined){if(doQueueOnState&&_this.getState()===_this.options.animationQueue){doQueue=true}else if(doQueueOnState){doQueue=false}else doQueue=_this.options.animationQueue;oTab.active=false;oTab.tab.removeClass(_this.options.classes.stateActive).addClass(_this.options.classes.stateDefault);_this._updateAria(oTab);_this._doTransition(oTab,_this.options.animation,'close',function(){oTab.accordionTab.removeClass(_this.options.classes.stateActive).addClass(_this.options.classes.stateDefault);oTab.panel.removeClass(_this.options.classes.stateActive).addClass(_this.options.classes.stateDefault)},!doQueue);this.$element.trigger('tabs-deactivate',oTab)}};ResponsiveTabs.prototype._doTransition=function(oTab,method,state,callback,dequeue){var effect,_this=this,duration=_this.options.duration;switch(method){case'slide':effect=(state==='open')?'slideDown':'slideUp';duration=_this.options.duration;break;case'fade':effect=(state==='open')?'fadeIn':'fadeOut';duration=_this.options.duration;break;default:effect=(state==='open')?'show':'hide';duration=0;break};if(_this.options.animation==='fade'&&_this.state==='tabs'){effect=state==='open'?effect:'hide';duration=state==='open'?duration:0;oTab.panel.css('opacity','')};oTab.panel[effect]({duration:duration,queue:'responsive-tabs-'+state,complete:function(){callback.call(oTab.panel,method,state);_this.$element.trigger('tabs-activate-finished',oTab)}}).dequeue('responsive-tabs-'+state)};ResponsiveTabs.prototype._isCollapisble=function(){return(typeof this.options.collapsible==='boolean'&&this.options.collapsible)||(typeof this.options.collapsible==='string'&&this.options.collapsible===this.getState())};ResponsiveTabs.prototype._getTab=function(numRef){return this.tabs[numRef]};ResponsiveTabs.prototype._getTabRefBySelector=function(selector){for(var i=0;i<this.tabs.length;i++)if(this.tabs[i].selector===selector)return i;return-1};ResponsiveTabs.prototype._getCurrentTab=function(){return this._getTab(this._getCurrentTabRef())};ResponsiveTabs.prototype._getNextTabRef=function(currentTabRef){var tabRef=(currentTabRef||this._getCurrentTabRef()),nextTabRef=(tabRef===this.tabs.length-1)?0:tabRef+1;return(this._getTab(nextTabRef).disabled)?this._getNextTabRef(nextTabRef):nextTabRef};ResponsiveTabs.prototype._getPreviousTabRef=function(){return(this._getCurrentTabRef()===0)?this.tabs.length-1:this._getCurrentTabRef()-1};ResponsiveTabs.prototype._getCurrentTabRef=function(){for(var i=0;i<this.tabs.length;i++)if(this.tabs[i].active)return i;return-1};ResponsiveTabs.prototype._equaliseHeights=function(){var maxHeight=0;$.each($.map(this.tabs,function(tab){maxHeight=Math.max(maxHeight,tab.panel.css('minHeight','').height());return tab.panel}),function(){this.css('minHeight',maxHeight)})};ResponsiveTabs.prototype._isInView=function($element){var docViewTop=$(window).scrollTop(),docViewBottom=docViewTop+$(window).height(),elemTop=$element.offset().top,elemBottom=elemTop+$element.height();return((elemBottom<=docViewBottom)&&(elemTop>=docViewTop))};ResponsiveTabs.prototype.getCurrentTab=function(){return this._getCurrentTabRef()};ResponsiveTabs.prototype.getPreviousTab=function(){return this._getPreviousTabRef()};ResponsiveTabs.prototype.activate=function(tabRef,stopRotation){var e=jQuery.Event('tabs-activate'),oTab=this._getTab(tabRef);if(!oTab.disabled)this._openTab(e,oTab,true,stopRotation||true)};ResponsiveTabs.prototype.deactivate=function(tabRef){var e=jQuery.Event('tabs-dectivate'),oTab=this._getTab(tabRef);if(!oTab.disabled)this._closeTab(e,oTab)};ResponsiveTabs.prototype.enable=function(tabRef){var oTab=this._getTab(tabRef);if(oTab){oTab.disabled=false;oTab.tab.addClass(this.options.classes.stateDefault).removeClass(this.options.classes.stateDisabled);oTab.accordionTab.addClass(this.options.classes.stateDefault).removeClass(this.options.classes.stateDisabled)}};ResponsiveTabs.prototype.disable=function(tabRef){var oTab=this._getTab(tabRef);if(oTab){oTab.disabled=true;oTab.tab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateDisabled);oTab.accordionTab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateDisabled)}};ResponsiveTabs.prototype.getState=function(){return this.state};ResponsiveTabs.prototype.startRotation=function(speed){var _this=this;if(this.tabs.length>this.options.disabled.length){this.rotateInterval=setInterval(function(){var e=jQuery.Event('rotate');_this._openTab(e,_this._getTab(_this._getNextTabRef()),true)},speed||(($.isNumeric(_this.options.rotate))?_this.options.rotate:4e3))}else throw new Error("Rotation is not possible if all tabs are disabled")};ResponsiveTabs.prototype.stopRotation=function(){window.clearInterval(this.rotateInterval);this.rotateInterval=0};ResponsiveTabs.prototype.option=function(key,value){if(typeof value!=='undefined')this.options[key]=value;return this.options[key]};ResponsiveTabs.prototype.refresh=function(){this.tabs=this.tabs.concat(this._loadElements());this._loadClasses();this._loadEvents();if(this.options.fluidHeight!==true)this._equaliseHeights();this.$element.trigger('tabs-refresh',this);this._setState();return this};$.fn.responsiveTabs=function(options){var args=arguments,instance,classes=['stateActive','stateDisabled','stateExcluded'];if(options===undefined||typeof options==='object'){return this.each(function(){if(!$.data(this,'responsivetabs')){$.data(this,'responsivetabs',new ResponsiveTabs(this,options))}else $.extend($.data(this,'responsivetabs').options,options)})}else if(typeof options==='string'&&options[0]!=='_'&&options!=='init'){instance=$.data(this[0],'responsivetabs');if(options==='destroy')if(typeof instance!=='undefined'){for(var i=0;i<instance.tabs.length;i++)$.each($([instance.tabs[i].accordionTab,instance.tabs[i].panel,instance.tabs[i].tab]),function(){var $this=$(this);$this.removeAttr('style');$this.removeClass(instance.options.classes.stateActive);$this.removeClass(instance.options.classes.stateDisabled);$this.removeClass(instance.options.classes.stateExcluded)});for(var i=0;i<events.length;i++)instance.$element.unbind(events[i]);for(var i=0;i<instance.tabs.length;i++){instance.tabs[i].anchor.off(instance.options.event);instance.tabs[i].accordionAnchor.off(instance.options.event)};$.removeData(this[0],'responsivetabs')};if(instance instanceof ResponsiveTabs&&typeof instance[options]==='function'){return instance[options].apply(instance,Array.prototype.slice.call(args,1))}else return this}}}(jQuery,window))
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/accordion-tabs-container/jquery.responsiveTabs.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/accordion-tabs-container/init.responsiveTabs.js. */
(function($,Drupal,drupalSettings){"use strict";Drupal.behaviors.CohesionAccordionTabs={attach:function(context){var once='cohAccordionTabs',cmm=new Drupal.CohesionResponsiveBreakpoints(drupalSettings.cohesion.responsive_grid_settings),$at=$('.coh-accordion-tabs > .coh-accordion-tabs-inner',context)
function matchHeights(elements,remove){return $(elements).matchHeight({byRow:false,remove:remove})}
function tabsLoad(e,tabs){getTabSettings(tabs)}
function tabsRefresh(e,tabs){var opts=tabs.options;if(typeof opts.contentMatchHeight!=='undefined')matchHeights(tabs.tabs.panels,opts.contentMatchHeight===true?false:true);if(typeof opts.tabsMatchHeight!=='undefined')matchHeights(tabs.tabs.tabItemAnchors,opts.tabsMatchHeight===true?false:true);getTabSettings(tabs)}
function tabsStateChange(e,tabs){var opts=tabs.tabs.options;if(typeof opts.contentMatchHeight!=='undefined')matchHeights(tabs.tabs.panels,opts.contentMatchHeight===true?false:true);if(typeof opts.tabsMatchHeight!=='undefined')matchHeights(tabs.tabs.tabItemAnchors,opts.tabsMatchHeight===true?false:true)}
function tabsActivate(e,tab){for(var i=0;i<tab.panel.length;i++)Drupal.attachBehaviors(tab.panel[i])}
function updateSettings(settings){var key=settings.cohesion.key;settings=settings.cohesion.settings;settings.$element.responsiveTabs(settings.breakpoints[key]);for(var i=0;i<settings.act.tabs.length;i++)if(settings.act.tabs[i].hide!==false){$(settings.act.tabs[i].accordionTab).toggleClass('is-hidden',settings.act.tabs[i].hide[key]);$(settings.act.tabs[i].tab).toggleClass('is-hidden',settings.act.tabs[i].hide[key])}}
function manageSettings(settings,key){if(typeof settings.setHash!=='undefined'){settings.styles[key].setHash=settings.setHash;if(settings.styles[key].accordionOrTab==='accordion')settings.styles[key].scrollToAccordionOnLoad=true};if(typeof settings.scrollToAccordion!=='undefined')settings.styles[key].scrollToAccordion=settings.scrollToAccordion;if(typeof settings.scrollToAccordionOffsetClass!=='undefined'&&typeof settings.offsetPositionAgainst!=='undefined'&&settings.offsetPositionAgainst==='class'){var offsetClass=settings.scrollToAccordionOffsetClass.match(/^[.]/)?settings.scrollToAccordionOffsetClass:'.'+settings.scrollToAccordionOffsetClass;settings.styles[key].scrollToAccordionOffset=$(offsetClass).outerHeight(true)};var breakpoint=settings.styles[key];if(typeof breakpoint.active!=='undefined')settings.styles[key].active=(parseInt(breakpoint.active)-1).toString();if(typeof breakpoint.duration!=='undefined'&&typeof breakpoint.durationMs!=='undefined'&&breakpoint.duration==='custom'){settings.styles[key].duration=parseInt(breakpoint.durationMs)}else if(typeof breakpoint.duration!=='undefined'&&breakpoint.duration!=='custom')settings.styles[key].duration=parseInt(breakpoint.duration);return settings}
function getSettings($el,settings){var defaults={classes:{stateDefault:'',stateActive:'is-active',stateDisabled:'is-disabled',stateExcluded:'is-excluded',container:'',ul:'',tab:'',anchor:'',panel:'',accordionTitle:'coh-accordion-title',stateTypePrefix:'coh-accordion-tabs-display'}};settings.breakpoints={};settings.$element=$el;for(var i=0;i<cmm.breakpoints.length;i++){var key=cmm.breakpoints[i].key;settings.breakpoints[key]={};$.extend(settings.breakpoints[key],defaults);if(typeof settings.styles[key]==='object'){settings=manageSettings(settings,key);$.extend(settings.breakpoints[key],settings.styles[key]);$.extend(defaults,settings.styles[key])};if(typeof settings.breakpoints[key].animation!=='undefined')switch(settings.breakpoints[key].animation){case'slide':settings.breakpoints[key].animationQueue=false;break;case'fade':settings.breakpoints[key].animationQueue=true;break;default:settings.breakpoints[key].animationQueue=true;break}};return settings}
function getTabSettings(tabs){for(var i=0;i<tabs.tabs.length;i++){var previous,key;if(tabs.tabs[i].hide!==false&&typeof tabs.tabs[i].hide==='object')for(var c=0;c<cmm.breakpoints.length;c++){key=cmm.breakpoints[c].key;if(typeof tabs.tabs[i].hide[key]==='undefined')tabs.tabs[i].hide[key]=previous;previous=tabs.tabs[i].hide[key]}}};$.each($at,function(){var $this=$(this);$this.findOnce(once).each(function(){$this.responsiveTabs('refresh')});$this.once(once).each(function(){var settings=getSettings($this,$this.data('cohAccordion'));$this.on('tabs-load',tabsLoad);$this.on('tabs-refresh',tabsRefresh);$this.on('tabs-activate-state',tabsStateChange);$this.on('tabs-activate',tabsActivate);$this.responsiveTabs(settings.breakpoints[cmm.getCurrentBreakpoint().key]);settings.act=$.data(this,'responsivetabs');cmm.addListeners(settings,updateSettings)})})}}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/accordion-tabs-container/init.responsiveTabs.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/cohContainerMatchHeights/coh-container-match-heights.js. */
(function($,Drupal){'use strict';var cmm=new Drupal.CohesionResponsiveBreakpoints(),pluginName='cohesionContainerMatchHeights',defaults={current:false,excludeElements:['column'],expressionPrefixes:['>','> .coh-column'],loadersPrefix:'.coh-row > .coh-row-inner',elements:{none:{parent:'none',child:false},h1:{parent:'h1',child:false},h2:{parent:'h2',child:false},h3:{parent:'h3',child:false},h4:{parent:'h4',child:false},h5:{parent:'h5',child:false},h6:{parent:'h6',child:false},p:{parent:'p',child:false},'list-container':{parent:'.coh-list-container',child:false},container:{parent:'.coh-container',child:false},wysiwyg:{parent:'.coh-wysiwyg',child:false},hyperlink:{parent:'a',child:false},blockquote:{parent:'blockquote',child:false},slide:{parent:'.slick-list > .slick-track > .coh-slider-item',child:false},iframe:{parent:'.coh-iframe',child:false},'youtube-video-background':{parent:'.coh-youtube-video-background',child:false}},loaders:['.coh-row > .coh-row-inner frame','.coh-row > .coh-row-inner iframe','.coh-row > .coh-row-inner img','.coh-row > .coh-row-inner input[type="image"]','.coh-row > .coh-row-inner link','.coh-row > .coh-row-inner script','.coh-row > .coh-row-inner style']}
function ccmh(element,options){this.element=element;this.$element=$(element);this.options=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this._current=false;this.init()};ccmh.prototype.init=function(){var _self=this,key='',previous={target:'none'},settings={};settings._self=_self;settings.breakpoints={};for(var i=0;i<cmm.breakpoints.length;i++){key=cmm.breakpoints[i].key;settings.breakpoints[key]=previous;if(typeof _self.options.targets[key]!=='undefined'){settings.breakpoints[key]=_self.options.targets[key];previous=_self.options.targets[key]}else if(typeof cmm.breakpoints[i-1]!=='undefined'&&typeof previous!==false){settings.breakpoints[key]=previous;_self.options.targets[key]={};_self.options.targets[key]=previous}};cmm.addListeners(settings,_self.setMatchHeightsCallback);$(_self.options.context).ajaxComplete(function(event,xhr,settings){$.fn.matchHeight._update();$(_self.options.loaders.toString(),_self.options.context).on('load',function(){if($(this).length)$.fn.matchHeight._update()})})};ccmh.prototype.getElement=function(elementKey){var element;if(this.options.elements.hasOwnProperty(elementKey)){element=this.options.elements[elementKey]}else element=elementKey.match(/^[.]/)?elementKey:'.'+elementKey;return element};ccmh.prototype.getElementExpression=function(element,targetLevel){var expression=[],prefixes=[''],el=this.getElement(element),elementIsClass=typeof el==='string',depth=typeof targetLevel!=='undefined'?targetLevel:false;if(this.options.excludeElements.indexOf(element)<0)prefixes=this.options.expressionPrefixes;for(var i=0;i<prefixes.length;i++){if(!elementIsClass){expression[i]=prefixes[i]+' > '+el.parent}else expression[i]=prefixes[i]+' '+el;if(depth!==false)expression[i]=expression[i]+':nth-of-type('+depth+')';if(!elementIsClass&&el.child)expression[i]=expression[i]+' > '+el.child};return expression.join(', ')};ccmh.prototype.setMatchHeights=function(settings){var _self=this,target=settings.cohesion.settings.breakpoints[settings.cohesion.key];if(typeof target==='undefined'||target===false)return;var el=_self.getElement(target.target);_self.destroyMatchHeights();if(el!=='none'){var expression=_self.getElementExpression(target.target,target.targetLevel);_self._current=$(expression,_self.$element);return _self._current.matchHeight({byRow:false})}};ccmh.prototype.setMatchHeightsCallback=function(settings){var _self=settings.cohesion.settings._self||this;return _self.setMatchHeights(settings)};ccmh.prototype.destroyMatchHeights=function(){return $(this._current).matchHeight({remove:true})};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,'plugin_'+pluginName))$.data(this,'plugin_'+pluginName,new ccmh(this,options))})}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/cohContainerMatchHeights/coh-container-match-heights.js. */;
