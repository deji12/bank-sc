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
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/cohContainerMatchHeights/coh-container-match-heights.js. */
(function($,Drupal){'use strict';var cmm=new Drupal.CohesionResponsiveBreakpoints(),pluginName='cohesionContainerMatchHeights',defaults={current:false,excludeElements:['column'],expressionPrefixes:['>','> .coh-column'],loadersPrefix:'.coh-row > .coh-row-inner',elements:{none:{parent:'none',child:false},h1:{parent:'h1',child:false},h2:{parent:'h2',child:false},h3:{parent:'h3',child:false},h4:{parent:'h4',child:false},h5:{parent:'h5',child:false},h6:{parent:'h6',child:false},p:{parent:'p',child:false},'list-container':{parent:'.coh-list-container',child:false},container:{parent:'.coh-container',child:false},wysiwyg:{parent:'.coh-wysiwyg',child:false},hyperlink:{parent:'a',child:false},blockquote:{parent:'blockquote',child:false},slide:{parent:'.slick-list > .slick-track > .coh-slider-item',child:false},iframe:{parent:'.coh-iframe',child:false},'youtube-video-background':{parent:'.coh-youtube-video-background',child:false}},loaders:['.coh-row > .coh-row-inner frame','.coh-row > .coh-row-inner iframe','.coh-row > .coh-row-inner img','.coh-row > .coh-row-inner input[type="image"]','.coh-row > .coh-row-inner link','.coh-row > .coh-row-inner script','.coh-row > .coh-row-inner style']}
function ccmh(element,options){this.element=element;this.$element=$(element);this.options=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this._current=false;this.init()};ccmh.prototype.init=function(){var _self=this,key='',previous={target:'none'},settings={};settings._self=_self;settings.breakpoints={};for(var i=0;i<cmm.breakpoints.length;i++){key=cmm.breakpoints[i].key;settings.breakpoints[key]=previous;if(typeof _self.options.targets[key]!=='undefined'){settings.breakpoints[key]=_self.options.targets[key];previous=_self.options.targets[key]}else if(typeof cmm.breakpoints[i-1]!=='undefined'&&typeof previous!==false){settings.breakpoints[key]=previous;_self.options.targets[key]={};_self.options.targets[key]=previous}};cmm.addListeners(settings,_self.setMatchHeightsCallback);$(_self.options.context).ajaxComplete(function(event,xhr,settings){$.fn.matchHeight._update();$(_self.options.loaders.toString(),_self.options.context).on('load',function(){if($(this).length)$.fn.matchHeight._update()})})};ccmh.prototype.getElement=function(elementKey){var element;if(this.options.elements.hasOwnProperty(elementKey)){element=this.options.elements[elementKey]}else element=elementKey.match(/^[.]/)?elementKey:'.'+elementKey;return element};ccmh.prototype.getElementExpression=function(element,targetLevel){var expression=[],prefixes=[''],el=this.getElement(element),elementIsClass=typeof el==='string',depth=typeof targetLevel!=='undefined'?targetLevel:false;if(this.options.excludeElements.indexOf(element)<0)prefixes=this.options.expressionPrefixes;for(var i=0;i<prefixes.length;i++){if(!elementIsClass){expression[i]=prefixes[i]+' > '+el.parent}else expression[i]=prefixes[i]+' '+el;if(depth!==false)expression[i]=expression[i]+':nth-of-type('+depth+')';if(!elementIsClass&&el.child)expression[i]=expression[i]+' > '+el.child};return expression.join(', ')};ccmh.prototype.setMatchHeights=function(settings){var _self=this,target=settings.cohesion.settings.breakpoints[settings.cohesion.key];if(typeof target==='undefined'||target===false)return;var el=_self.getElement(target.target);_self.destroyMatchHeights();if(el!=='none'){var expression=_self.getElementExpression(target.target,target.targetLevel);_self._current=$(expression,_self.$element);return _self._current.matchHeight({byRow:false})}};ccmh.prototype.setMatchHeightsCallback=function(settings){var _self=settings.cohesion.settings._self||this;return _self.setMatchHeights(settings)};ccmh.prototype.destroyMatchHeights=function(){return $(this._current).matchHeight({remove:true})};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,'plugin_'+pluginName))$.data(this,'plugin_'+pluginName,new ccmh(this,options))})}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/cohContainerMatchHeights/coh-container-match-heights.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/slider-container/slick.js. */
(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports!=='undefined'){module.exports=factory(require('jquery'))}else factory(jQuery)}(function($){'use strict';var Slick=window.Slick||{};Slick=(function(){var instanceUid=0
function Slick(element,settings){var _=this,dataSettings;_.defaults={accessibility:true,adaptiveHeight:false,appendArrows:$(element),appendDots:$(element),arrows:true,asNavFor:null,playpauseButton:'',prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:false,autoplaySpeed:3e3,centerMode:false,centerPadding:'50px',cssEase:'ease',customPaging:function(slider,i){return $('<button type="button" />').text(i+1)},dots:false,dotsClass:'slick-dots',draggable:true,easing:'linear',edgeFriction:0.35,fade:false,focusOnSelect:false,focusOnChange:false,infinite:true,initialSlide:0,keyboardNavigation:true,lazyLoad:'ondemand',mobileFirst:false,pauseOnHover:true,pauseOnFocus:true,pauseOnDotsHover:false,respondTo:'window',responsive:null,rows:1,rtl:false,slide:'',slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:true,swipeToSlide:false,touchMove:true,touchThreshold:5,useCSS:true,useTransform:true,variableWidth:false,vertical:false,verticalSwiping:false,waitForAnimate:true,zIndex:1e3};_.initials={animating:false,dragging:false,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:false,slideCount:null,slideWidth:null,$slideTrack:null,$playpauseButton:null,$playpausePlayIcon:null,$playpausePauseIcon:null,$playpausePlayLabel:null,$playpausePauseLabel:null,$slides:null,sliding:false,slideOffset:0,swipeLeft:null,swiping:false,$list:null,touchObject:{},transformsEnabled:false,unslicked:false};$.extend(_,_.initials);_.activeBreakpoint=null;_.animType=null;_.animProp=null;_.breakpoints=[];_.breakpointSettings=[];_.cssTransitions=false;_.focussed=false;_.interrupted=false;_.hidden='hidden';_.paused=false;_.pausedByUser=false;_.positionProp=null;_.respondTo=null;_.rowCount=1;_.shouldClick=true;_.$slider=$(element);_.$slidesCache=null;_.transformType=null;_.transitionType=null;_.visibilityChange='visibilitychange';_.windowWidth=0;_.windowTimer=null;dataSettings=$(element).data('slick')||{};_.options=$.extend({},_.defaults,settings,dataSettings);_.currentSlide=_.options.initialSlide;_.originalSettings=_.options;if(typeof document.mozHidden!=='undefined'){_.hidden='mozHidden';_.visibilityChange='mozvisibilitychange'}else if(typeof document.webkitHidden!=='undefined'){_.hidden='webkitHidden';_.visibilityChange='webkitvisibilitychange'};_.autoPlay=$.proxy(_.autoPlay,_);_.autoPlayClear=$.proxy(_.autoPlayClear,_);_.autoPlayIterator=$.proxy(_.autoPlayIterator,_);_.changeSlide=$.proxy(_.changeSlide,_);_.clickHandler=$.proxy(_.clickHandler,_);_.selectHandler=$.proxy(_.selectHandler,_);_.setPosition=$.proxy(_.setPosition,_);_.swipeHandler=$.proxy(_.swipeHandler,_);_.dragHandler=$.proxy(_.dragHandler,_);_.keyHandler=$.proxy(_.keyHandler,_);_.playpauseToggleHandler=$.proxy(_.playpauseToggleHandler,_);_.instanceUid=instanceUid++;_.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/;_.registerBreakpoints();_.init(true)};return Slick}());Slick.prototype.activateADA=function(){var _=this;_.$slideTrack.find('.slick-active').attr({'aria-hidden':'false',tabindex:0}).find('a, input, button, select').attr({tabindex:'0'})};Slick.prototype.addSlide=Slick.prototype.slickAdd=function(markup,index,addBefore){var _=this;if(typeof index==='boolean'){addBefore=index;index=null}else if(index<0||(index>=_.slideCount))return false;_.unload();if(typeof index==='number'){if(index===0&&_.$slides.length===0){$(markup).appendTo(_.$slideTrack)}else if(addBefore){$(markup).insertBefore(_.$slides.eq(index))}else $(markup).insertAfter(_.$slides.eq(index))}else if(addBefore===true){$(markup).prependTo(_.$slideTrack)}else $(markup).appendTo(_.$slideTrack);_.$slides=_.$slideTrack.children(this.options.slide);_.$slideTrack.children(this.options.slide).detach();_.$slideTrack.append(_.$slides);_.$slides.each(function(index,element){$(element).attr('data-slick-index',index)});_.$slidesCache=_.$slides;_.reinit()};Slick.prototype.animateHeight=function(){var _=this;if(_.options.slidesToShow===1&&_.options.adaptiveHeight===true&&_.options.vertical===false){var targetHeight=_.$slides.eq(_.currentSlide).outerHeight(true);_.$list.animate({height:targetHeight},_.options.speed)}};Slick.prototype.animateSlide=function(targetLeft,callback){var animProps={},_=this;_.animateHeight();if(_.options.rtl===true&&_.options.vertical===false)targetLeft=-targetLeft;if(_.transformsEnabled===false){if(_.options.vertical===false){_.$slideTrack.animate({left:targetLeft},_.options.speed,_.options.easing,callback)}else _.$slideTrack.animate({top:targetLeft},_.options.speed,_.options.easing,callback)}else if(_.cssTransitions===false){if(_.options.rtl===true)_.currentLeft=-(_.currentLeft);$({animStart:_.currentLeft}).animate({animStart:targetLeft},{duration:_.options.speed,easing:_.options.easing,step:function(now){now=Math.ceil(now);if(_.options.vertical===false){animProps[_.animType]='translate('+now+'px, 0px)';_.$slideTrack.css(animProps)}else{animProps[_.animType]='translate(0px,'+now+'px)';_.$slideTrack.css(animProps)}},complete:function(){if(callback)callback.call()}})}else{_.applyTransition();targetLeft=Math.ceil(targetLeft);if(_.options.vertical===false){animProps[_.animType]='translate3d('+targetLeft+'px, 0px, 0px)'}else animProps[_.animType]='translate3d(0px,'+targetLeft+'px, 0px)';_.$slideTrack.css(animProps);if(callback)setTimeout(function(){_.disableTransition();callback.call()},_.options.speed)}};Slick.prototype.getNavTarget=function(){var _=this,asNavFor=_.options.asNavFor;if(asNavFor&&asNavFor!==null)asNavFor=$(asNavFor).not(_.$slider);return asNavFor};Slick.prototype.asNavFor=function(index){var _=this,asNavFor=_.getNavTarget();if(asNavFor!==null&&typeof asNavFor==='object')asNavFor.each(function(){var target=$(this).slick('getSlick');if(!target.unslicked)target.slideHandler(index,true)})};Slick.prototype.applyTransition=function(slide){var _=this,transition={};if(_.options.fade===false){transition[_.transitionType]=_.transformType+' '+_.options.speed+'ms '+_.options.cssEase}else transition[_.transitionType]='opacity '+_.options.speed+'ms '+_.options.cssEase;if(_.options.fade===false){_.$slideTrack.css(transition)}else _.$slides.eq(slide).css(transition)};Slick.prototype.autoPlay=function(){var _=this;_.autoPlayClear();if(_.slideCount>_.options.slidesToShow)_.autoPlayTimer=setInterval(_.autoPlayIterator,_.options.autoplaySpeed)};Slick.prototype.autoPlayClear=function(){var _=this;if(_.autoPlayTimer)clearInterval(_.autoPlayTimer)};Slick.prototype.autoPlayIterator=function(){var _=this,slideTo=_.currentSlide+_.options.slidesToScroll;if(!_.paused&&!_.interrupted&&!_.focussed){if(_.options.infinite===false)if(_.direction===1&&(_.currentSlide+1)===(_.slideCount-1)){_.direction=0}else if(_.direction===0){slideTo=_.currentSlide-_.options.slidesToScroll;if(_.currentSlide-1===0)_.direction=1};_.slideHandler(slideTo)}};Slick.prototype.playpauseToggleHandler=function(event){var _=this,paused=_.paused;_.$playpausePauseIcon.css('display',paused?'':'none');_.$playpausePlayIcon.css('display',!paused?'':'none');_.$playpausePauseLabel.css('display',paused?'':'none');_.$playpausePlayLabel.css('display',!paused?'':'none');if(paused){_.pausedByUser=false;_.slickPlay()}else{_.pausedByUser=true;_.slickPause()}};Slick.prototype.buildArrows=function(){var _=this;if(_.options.arrows===true){_.$prevArrow=$(_.options.prevArrow).addClass('slick-arrow');_.$nextArrow=$(_.options.nextArrow).addClass('slick-arrow');if(_.slideCount>_.options.slidesToShow){_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');if(_.htmlExpr.test(_.options.prevArrow))_.options.rtl===true?_.$prevArrow.appendTo(_.options.appendArrows):_.$prevArrow.prependTo(_.options.appendArrows);if(_.htmlExpr.test(_.options.nextArrow))_.options.rtl===true?_.$nextArrow.prependTo(_.options.appendArrows):_.$nextArrow.appendTo(_.options.appendArrows);if(_.options.infinite!==true)_.$prevArrow.addClass('slick-disabled').attr('disabled',true)}else _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({disabled:true,tabindex:'-1'})}};Slick.prototype.buildDots=function(){var _=this,i,dot;if(_.options.dots===true&&_.slideCount>_.options.slidesToShow){_.$slider.addClass('slick-dotted');dot=$('<ul />').addClass(_.options.dotsClass);for(i=0;i<=_.getDotCount();i+=1)dot.append($('<li />').append(_.options.customPaging.call(this,_,i)));_.$dots=dot.appendTo(_.options.appendDots);_.$dots.find('li').first().addClass('slick-active')}};Slick.prototype.buildPlaypause=function(){var _=this,paused=_.paused;if(_.options.autoplay&&_.options.showPlaypause){_.$playpauseButton=$(_.options.playpauseButton);_.$playpausePlayIcon=$('.slick-play-icon',_.$playpauseButton).css('display',(paused!==true)?'none':'');_.$playpausePauseIcon=$('.slick-pause-icon',_.$playpauseButton).css('display',(paused===true)?'none':'');_.$playpausePlayLabel=$('.slick-play-text',_.$playpauseButton).css('display',paused?'none':'');_.$playpausePauseLabel=$('.slick-pause-text',_.$playpauseButton).css('display',!paused?'none':'');_.$playpauseButton.appendTo(_.options.appendPlaypause)}};Slick.prototype.buildOut=function(){var _=this;_.$slides=_.$slider.children(_.options.slide+':not(.slick-cloned)').addClass('slick-slide');_.slideCount=_.$slides.length;_.$slides.each(function(index,element){$(element).attr('data-slick-index',index).data('originalStyling',$(element).attr('style')||'').attr('role','group').attr('aria-label','slide '+(index+1))});_.$slider.addClass('slick-slider');_.$slideTrack=(_.slideCount===0)?$('<div class="slick-track"/>').appendTo(_.$slider):_.$slides.wrapAll('<div class="slick-track"/>').parent();_.$list=_.$slideTrack.wrap('<div class="slick-list"/>').parent();_.$slideTrack.css('opacity',0);if(_.options.centerMode===true||_.options.swipeToSlide===true)_.options.slidesToScroll=1;$('img[data-lazy]',_.$slider).not('[src]').addClass('slick-loading');_.setupInfinite();_.buildArrows();_.buildDots();_.buildPlaypause();_.updateDots();_.setSlideClasses(typeof _.currentSlide==='number'?_.currentSlide:0);if(_.options.draggable===true)_.$list.addClass('draggable')};Slick.prototype.buildRows=function(){var _=this,a,b,c,newSlides,numOfSlides,originalSlides,slidesPerSection;newSlides=document.createDocumentFragment();originalSlides=_.$slider.children();if(_.options.rows>0){slidesPerSection=_.options.slidesPerRow*_.options.rows;numOfSlides=Math.ceil(originalSlides.length/slidesPerSection);for(a=0;a<numOfSlides;a++){var slide=document.createElement('div');for(b=0;b<_.options.rows;b++){var row=document.createElement('div');for(c=0;c<_.options.slidesPerRow;c++){var target=(a*slidesPerSection+((b*_.options.slidesPerRow)+c));if(originalSlides.get(target))row.appendChild(originalSlides.get(target))};slide.appendChild(row)};newSlides.appendChild(slide)};_.$slider.empty().append(newSlides);_.$slider.children().children().children().css({width:(100/_.options.slidesPerRow)+'%',display:'inline-block'})}};Slick.prototype.checkResponsive=function(initial,forceUpdate){var _=this,breakpoint,targetBreakpoint,respondToWidth,triggerBreakpoint=false,sliderWidth=_.$slider.width(),windowWidth=window.innerWidth||$(window).width();if(_.respondTo==='window'){respondToWidth=windowWidth}else if(_.respondTo==='slider'){respondToWidth=sliderWidth}else if(_.respondTo==='min')respondToWidth=Math.min(windowWidth,sliderWidth);if(_.options.responsive&&_.options.responsive.length&&_.options.responsive!==null){targetBreakpoint=null;for(breakpoint in _.breakpoints)if(_.breakpoints.hasOwnProperty(breakpoint))if(_.originalSettings.mobileFirst===false){if(respondToWidth<_.breakpoints[breakpoint])targetBreakpoint=_.breakpoints[breakpoint]}else if(respondToWidth>_.breakpoints[breakpoint])targetBreakpoint=_.breakpoints[breakpoint];if(targetBreakpoint!==null){if(_.activeBreakpoint!==null){if(targetBreakpoint!==_.activeBreakpoint||forceUpdate){_.activeBreakpoint=targetBreakpoint;if(_.breakpointSettings[targetBreakpoint]==='unslick'){_.unslick(targetBreakpoint)}else{_.options=$.extend({},_.originalSettings,_.breakpointSettings[targetBreakpoint]);if(initial===true)_.currentSlide=_.options.initialSlide;_.refresh(initial)};triggerBreakpoint=targetBreakpoint}}else{_.activeBreakpoint=targetBreakpoint;if(_.breakpointSettings[targetBreakpoint]==='unslick'){_.unslick(targetBreakpoint)}else{_.options=$.extend({},_.originalSettings,_.breakpointSettings[targetBreakpoint]);if(initial===true)_.currentSlide=_.options.initialSlide;_.refresh(initial)};triggerBreakpoint=targetBreakpoint}}else if(_.activeBreakpoint!==null){_.activeBreakpoint=null;_.options=_.originalSettings;if(initial===true)_.currentSlide=_.options.initialSlide;_.refresh(initial);triggerBreakpoint=targetBreakpoint};if(!initial&&triggerBreakpoint!==false)_.$slider.trigger('breakpoint',[_,triggerBreakpoint])}};Slick.prototype.changeSlide=function(event,dontAnimate){var _=this,$target=$(event.currentTarget),indexOffset,slideOffset,unevenOffset;if($target.is('a'))event.preventDefault();if(!$target.is('li'))$target=$target.closest('li');unevenOffset=(_.slideCount%_.options.slidesToScroll!==0);indexOffset=unevenOffset?0:(_.slideCount-_.currentSlide)%_.options.slidesToScroll;switch(event.data.message){case'previous':slideOffset=indexOffset===0?_.options.slidesToScroll:_.options.slidesToShow-indexOffset;if(_.slideCount>_.options.slidesToShow)_.slideHandler(_.currentSlide-slideOffset,false,dontAnimate);break;case'next':slideOffset=indexOffset===0?_.options.slidesToScroll:indexOffset;if(_.slideCount>_.options.slidesToShow)_.slideHandler(_.currentSlide+slideOffset,false,dontAnimate);break;case'index':var index=event.data.index===0?0:event.data.index||$target.index()*_.options.slidesToScroll;_.slideHandler(_.checkNavigable(index),false,dontAnimate);$target.children().trigger('focus');break;default:return}};Slick.prototype.checkNavigable=function(index){var _=this,navigables,prevNavigable;navigables=_.getNavigableIndexes();prevNavigable=0;if(index>navigables[navigables.length-1]){index=navigables[navigables.length-1]}else for(var n in navigables){if(index<navigables[n]){index=prevNavigable;break};prevNavigable=navigables[n]};return index};Slick.prototype.cleanUpEvents=function(){var _=this;if(_.$playpauseButton!==null)_.$playpauseButton.off('click.slick',_.playpauseToggleHandler);if(_.options.dots&&_.$dots!==null){$('li',_.$dots).off('click.slick',_.changeSlide).off('mouseenter.slick',$.proxy(_.interrupt,_,true)).off('mouseleave.slick',$.proxy(_.interrupt,_,false));if(_.options.keyboardNavigation===true)_.$dots.off('keydown.slick',_.keyHandler)};_.$slider.off('focus.slick blur.slick');if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){_.$prevArrow&&_.$prevArrow.off('click.slick',_.changeSlide);_.$nextArrow&&_.$nextArrow.off('click.slick',_.changeSlide);if(_.options.keyboardNavigation===true){_.$prevArrow&&_.$prevArrow.off('keydown.slick',_.keyHandler);_.$nextArrow&&_.$nextArrow.off('keydown.slick',_.keyHandler)}};_.$list.off('touchstart.slick mousedown.slick',_.swipeHandler);_.$list.off('touchmove.slick mousemove.slick',_.swipeHandler);_.$list.off('touchend.slick mouseup.slick',_.swipeHandler);_.$list.off('touchcancel.slick mouseleave.slick',_.swipeHandler);_.$list.off('click.slick',_.clickHandler);$(document).off(_.visibilityChange,_.visibility);_.cleanUpSlideEvents();if(_.options.keyboardNavigation===true)_.$list.off('keydown.slick',_.keyHandler);if(_.options.focusOnSelect===true)$(_.$slideTrack).children().off('click.slick',_.selectHandler);$(window).off('orientationchange.slick.slick-'+_.instanceUid,_.orientationChange);$(window).off('resize.slick.slick-'+_.instanceUid,_.resize);$('[draggable!=true]',_.$slideTrack).off('dragstart',_.preventDefault);$(window).off('load.slick.slick-'+_.instanceUid,_.setPosition)};Slick.prototype.cleanUpSlideEvents=function(){var _=this;_.$list.off('mouseenter.slick',$.proxy(_.interrupt,_,true));_.$list.off('mouseleave.slick',$.proxy(_.interrupt,_,false))};Slick.prototype.cleanUpRows=function(){var _=this,originalSlides;if(_.options.rows>0){originalSlides=_.$slides.children().children();originalSlides.removeAttr('style');_.$slider.empty().append(originalSlides)}};Slick.prototype.clickHandler=function(event){var _=this;if(_.shouldClick===false){event.stopImmediatePropagation();event.stopPropagation();event.preventDefault()}};Slick.prototype.destroy=function(refresh){var _=this;_.autoPlayClear();_.touchObject={};_.cleanUpEvents();$('.slick-cloned',_.$slider).detach();if(_.$playpauseButton!==null)_.$playpauseButton.remove();if(_.$dots)_.$dots.remove();if(_.$prevArrow&&_.$prevArrow.length)_.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden disabled tabindex').css('display','').remove();if(_.$nextArrow&&_.$nextArrow.length)_.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden disabled tabindex').css('display','').remove();if(_.$slides){_.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function(){$(this).attr('style',$(this).data('originalStyling'))});_.$slideTrack.children(this.options.slide).detach();_.$slideTrack.detach();_.$list.detach();_.$slider.append(_.$slides)};_.cleanUpRows();_.$slider.removeClass('slick-slider');_.$slider.removeClass('slick-initialized');_.$slider.removeClass('slick-dotted');_.unslicked=true;if(!refresh)_.$slider.trigger('destroy',[_])};Slick.prototype.disableTransition=function(slide){var _=this,transition={};transition[_.transitionType]='';if(_.options.fade===false){_.$slideTrack.css(transition)}else _.$slides.eq(slide).css(transition)};Slick.prototype.fadeSlide=function(slideIndex,callback){var _=this;if(_.cssTransitions===false){_.$slides.eq(slideIndex).css({zIndex:_.options.zIndex});_.$slides.eq(slideIndex).animate({opacity:1},_.options.speed,_.options.easing,callback)}else{_.applyTransition(slideIndex);_.$slides.eq(slideIndex).css({opacity:1,zIndex:_.options.zIndex});if(callback)setTimeout(function(){_.disableTransition(slideIndex);callback.call()},_.options.speed)}};Slick.prototype.fadeSlideOut=function(slideIndex){var _=this;if(_.cssTransitions===false){_.$slides.eq(slideIndex).animate({opacity:0,zIndex:_.options.zIndex-2},_.options.speed,_.options.easing)}else{_.applyTransition(slideIndex);_.$slides.eq(slideIndex).css({opacity:0,zIndex:_.options.zIndex-2})}};Slick.prototype.filterSlides=Slick.prototype.slickFilter=function(filter){var _=this;if(filter!==null){_.$slidesCache=_.$slides;_.unload();_.$slideTrack.children(this.options.slide).detach();_.$slidesCache.filter(filter).appendTo(_.$slideTrack);_.reinit()}};Slick.prototype.focusHandler=function(){var _=this;_.$slider.off('focus.slick blur.slick').on('focus.slick','*',function(event){var $sf=$(this);setTimeout(function(){if(_.options.pauseOnFocus)if($sf.is(':focus')){_.focussed=true;_.autoPlay()}},0)}).on('blur.slick','*',function(event){var $sf=$(this);if(_.options.pauseOnFocus){_.focussed=false;_.autoPlay()}})};Slick.prototype.getCurrent=Slick.prototype.slickCurrentSlide=function(){var _=this;return _.currentSlide};Slick.prototype.getDotCount=function(){var _=this,breakPoint=0,counter=0,pagerQty=0;if(_.options.infinite===true){if(_.slideCount<=_.options.slidesToShow){++pagerQty}else while(breakPoint<_.slideCount){++pagerQty;breakPoint=counter+_.options.slidesToScroll;counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow}}else if(_.options.centerMode===true){pagerQty=_.slideCount}else if(!_.options.asNavFor){pagerQty=1+Math.ceil((_.slideCount-_.options.slidesToShow)/_.options.slidesToScroll)}else while(breakPoint<_.slideCount){++pagerQty;breakPoint=counter+_.options.slidesToScroll;counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow};return pagerQty-1};Slick.prototype.getLeft=function(slideIndex){var _=this,targetLeft,verticalHeight,verticalOffset=0,targetSlide,coef;_.slideOffset=0;verticalHeight=_.$slides.first().outerHeight(true);if(_.options.infinite===true){if(_.slideCount>_.options.slidesToShow){_.slideOffset=(_.slideWidth*_.options.slidesToShow)*-1;coef=-1;if(_.options.vertical===true&&_.options.centerMode===true)if(_.options.slidesToShow===2){coef=-1.5}else if(_.options.slidesToShow===1)coef=-2;verticalOffset=(verticalHeight*_.options.slidesToShow)*coef};if(_.slideCount%_.options.slidesToScroll!==0)if(slideIndex+_.options.slidesToScroll>_.slideCount&&_.slideCount>_.options.slidesToShow)if(slideIndex>_.slideCount){_.slideOffset=((_.options.slidesToShow-(slideIndex-_.slideCount))*_.slideWidth)*-1;verticalOffset=((_.options.slidesToShow-(slideIndex-_.slideCount))*verticalHeight)*-1}else{_.slideOffset=((_.slideCount%_.options.slidesToScroll)*_.slideWidth)*-1;verticalOffset=((_.slideCount%_.options.slidesToScroll)*verticalHeight)*-1}}else if(slideIndex+_.options.slidesToShow>_.slideCount){_.slideOffset=((slideIndex+_.options.slidesToShow)-_.slideCount)*_.slideWidth;verticalOffset=((slideIndex+_.options.slidesToShow)-_.slideCount)*verticalHeight};if(_.slideCount<=_.options.slidesToShow){_.slideOffset=0;verticalOffset=0};if(_.options.centerMode===true&&_.slideCount<=_.options.slidesToShow){_.slideOffset=((_.slideWidth*Math.floor(_.options.slidesToShow))/2)-((_.slideWidth*_.slideCount)/2)}else if(_.options.centerMode===true&&_.options.infinite===true){_.slideOffset+=_.slideWidth*Math.floor(_.options.slidesToShow/2)-_.slideWidth}else if(_.options.centerMode===true){_.slideOffset=0;_.slideOffset+=_.slideWidth*Math.floor(_.options.slidesToShow/2)};if(_.options.vertical===false){targetLeft=((slideIndex*_.slideWidth)*-1)+_.slideOffset}else targetLeft=((slideIndex*verticalHeight)*-1)+verticalOffset;if(_.options.variableWidth===true){if(_.slideCount<=_.options.slidesToShow||_.options.infinite===false){targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex)}else targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex+_.options.slidesToShow);if(_.options.rtl===true){if(targetSlide[0]){targetLeft=(_.$slideTrack.width()-targetSlide[0].offsetLeft-targetSlide.width())*-1}else targetLeft=0}else targetLeft=targetSlide[0]?targetSlide[0].offsetLeft*-1:0;if(_.options.centerMode===true){if(_.slideCount<=_.options.slidesToShow||_.options.infinite===false){targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex)}else targetSlide=_.$slideTrack.children('.slick-slide').eq(slideIndex+_.options.slidesToShow+1);if(_.options.rtl===true){if(targetSlide[0]){targetLeft=(_.$slideTrack.width()-targetSlide[0].offsetLeft-targetSlide.width())*-1}else targetLeft=0}else targetLeft=targetSlide[0]?targetSlide[0].offsetLeft*-1:0;targetLeft+=(_.$list.width()-targetSlide.outerWidth())/2}};return targetLeft};Slick.prototype.getOption=Slick.prototype.slickGetOption=function(option){var _=this;return _.options[option]};Slick.prototype.getNavigableIndexes=function(){var _=this,breakPoint=0,counter=0,indexes=[],max;if(_.options.infinite===false){max=_.slideCount}else{breakPoint=_.options.slidesToScroll*-1;counter=_.options.slidesToScroll*-1;max=_.slideCount*2};while(breakPoint<max){indexes.push(breakPoint);breakPoint=counter+_.options.slidesToScroll;counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow};return indexes};Slick.prototype.getSlick=function(){return this};Slick.prototype.getSlideCount=function(){var _=this,slidesTraversed,swipedSlide,swipeTarget,centerOffset;centerOffset=_.options.centerMode===true?Math.floor(_.$list.width()/2):0;swipeTarget=(_.swipeLeft*-1)+centerOffset;if(_.options.swipeToSlide===true){_.$slideTrack.find('.slick-slide').each(function(index,slide){var slideOuterWidth,slideOffset,slideRightBoundary;slideOuterWidth=$(slide).outerWidth();slideOffset=slide.offsetLeft;if(_.options.centerMode!==true)slideOffset+=(slideOuterWidth/2);slideRightBoundary=slideOffset+slideOuterWidth;if(swipeTarget<slideRightBoundary){swipedSlide=slide;return false}});slidesTraversed=Math.abs($(swipedSlide).attr('data-slick-index')-_.currentSlide)||1;return slidesTraversed}else return _.options.slidesToScroll};Slick.prototype.goTo=Slick.prototype.slickGoTo=function(slide,dontAnimate){var _=this;_.changeSlide({data:{message:'index',index:parseInt(slide)}},dontAnimate)};Slick.prototype.init=function(creation){var _=this;if(!$(_.$slider).hasClass('slick-initialized')){$(_.$slider).addClass('slick-initialized');if(_.pausedByUser)_.paused=true;_.buildRows();_.buildOut();_.setProps();_.startLoad();_.loadSlider();_.initializeEvents();_.updateArrows();_.updateDots();_.checkResponsive(true);_.focusHandler()};if(creation)_.$slider.trigger('init',[_]);if(_.options.accessibility===true)_.initADA();if(_.options.autoplay&&!_.pausedByUser){_.paused=false;_.autoPlay()}};Slick.prototype.initADA=function(){var _=this,numDotGroups=Math.ceil(_.slideCount/_.options.slidesToShow),tabControlIndexes=_.getNavigableIndexes().filter(function(val){return(val>=0)&&(val<_.slideCount)});_.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({'aria-hidden':'true',tabindex:'-1'}).find('a, input, button, select').attr({tabindex:'-1'});if(_.$dots!==null){_.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i){var slideControlIndex=tabControlIndexes.indexOf(i);$(this).attr({id:'slick-slide'+_.instanceUid+i});if(slideControlIndex!==-1){var ariaButtonControl='slick-slide-control'+_.instanceUid+slideControlIndex;if($('#'+ariaButtonControl).length)$(this).attr({'aria-describedby':ariaButtonControl})}});_.$dots.find('li').each(function(i){var mappedSlideIndex=tabControlIndexes[i];$(this).find('button').first().attr({id:'slick-slide-control'+_.instanceUid+i,'aria-controls':'slick-slide'+_.instanceUid+mappedSlideIndex,'aria-label':(i+1)+' of '+numDotGroups,'aria-selected':null})}).eq(_.currentSlide).find('button').attr({'aria-selected':'true'}).end()};for(var i=_.currentSlide,max=i+_.options.slidesToShow;i<max;i++)if(_.options.focusOnChange){_.$slides.eq(i).attr({tabindex:'0'})}else _.$slides.eq(i).removeAttr('tabindex');_.activateADA()};Slick.prototype.initArrowEvents=function(){var _=this;if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){_.$prevArrow.off('click.slick').on('click.slick',{message:'previous'},_.changeSlide);_.$nextArrow.off('click.slick').on('click.slick',{message:'next'},_.changeSlide);if(_.options.keyboardNavigation===true){_.$prevArrow.on('keydown.slick',_.keyHandler);_.$nextArrow.on('keydown.slick',_.keyHandler)}}};Slick.prototype.initDotEvents=function(){var _=this;if(_.options.dots===true&&_.slideCount>_.options.slidesToShow){$('li',_.$dots).on('click.slick',{message:'index'},_.changeSlide);if(_.options.keyboardNavigation===true)_.$dots.on('keydown.slick',_.keyHandler)};if(_.options.dots===true&&_.options.pauseOnDotsHover===true&&_.slideCount>_.options.slidesToShow)$('li',_.$dots).on('mouseenter.slick',$.proxy(_.interrupt,_,true)).on('mouseleave.slick',$.proxy(_.interrupt,_,false))};Slick.prototype.initAutoplayEvents=function(){var _=this;if(_.$playpauseButton!=null)_.$playpauseButton.on('click.slick',_.playpauseToggleHandler)};Slick.prototype.initSlideEvents=function(){var _=this;if(_.options.pauseOnHover){_.$list.on('mouseenter.slick',$.proxy(_.interrupt,_,true));_.$list.on('mouseleave.slick',$.proxy(_.interrupt,_,false))}};Slick.prototype.initializeEvents=function(){var _=this;_.initArrowEvents();_.initDotEvents();_.initAutoplayEvents();_.initSlideEvents();_.$list.on('touchstart.slick mousedown.slick',{action:'start'},_.swipeHandler);_.$list.on('touchmove.slick mousemove.slick',{action:'move'},_.swipeHandler);_.$list.on('touchend.slick mouseup.slick',{action:'end'},_.swipeHandler);_.$list.on('touchcancel.slick mouseleave.slick',{action:'end'},_.swipeHandler);_.$list.on('click.slick',_.clickHandler);$(document).on(_.visibilityChange,$.proxy(_.visibility,_));if(_.options.keyboardNavigation===true)_.$list.on('keydown.slick',_.keyHandler);if(_.options.focusOnSelect===true)$(_.$slideTrack).children().on('click.slick',_.selectHandler);$(window).on('orientationchange.slick.slick-'+_.instanceUid,$.proxy(_.orientationChange,_));$(window).on('resize.slick.slick-'+_.instanceUid,$.proxy(_.resize,_));$('[draggable!=true]',_.$slideTrack).on('dragstart',_.preventDefault);$(window).on('load.slick.slick-'+_.instanceUid,_.setPosition);$(_.setPosition)};Slick.prototype.initUI=function(){var _=this;if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){_.$prevArrow.show();_.$nextArrow.show()};if(_.options.dots===true&&_.slideCount>_.options.slidesToShow)_.$dots.show()};Slick.prototype.keyHandler=function(event){var _=this
function reFocus(direction){if(direction==='next'&&_.$nextArrow){_.$nextArrow.trigger('focus')}else if(direction==='previous'&&_.$prevArrow){_.$prevArrow.trigger('focus')}else _.$slides.filter('[tabindex="0"]').trigger('focus')};if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT'))if(event.keyCode===37&&_.options.keyboardNavigation===true){_.changeSlide({data:{message:_.options.rtl===true?'next':'previous'}});reFocus(_.options.rtl===true?'next':'previous')}else if(event.keyCode===39&&_.options.keyboardNavigation===true){_.changeSlide({data:{message:_.options.rtl===true?'previous':'next'}});reFocus(_.options.rtl===true?'previous':'next')}};Slick.prototype.lazyLoad=function(){var _=this,loadRange,cloneRange,rangeStart,rangeEnd
function loadImages(imagesScope){$('img[data-lazy]',imagesScope).each(function(){var image=$(this),imageSource=$(this).attr('data-lazy'),imageSrcSet=$(this).attr('data-srcset'),imageSizes=$(this).attr('data-sizes')||_.$slider.attr('data-sizes'),imageToLoad=document.createElement('img');imageToLoad.onload=function(){image.animate({opacity:0},100,function(){if(imageSrcSet){image.attr('srcset',imageSrcSet);if(imageSizes)image.attr('sizes',imageSizes)};image.attr('src',imageSource).animate({opacity:1},200,function(){image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading')});_.$slider.trigger('lazyLoaded',[_,image,imageSource])})};imageToLoad.onerror=function(){image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');_.$slider.trigger('lazyLoadError',[_,image,imageSource])};imageToLoad.src=imageSource})};if(_.options.centerMode===true){if(_.options.infinite===true){rangeStart=_.currentSlide+(_.options.slidesToShow/2+1);rangeEnd=rangeStart+_.options.slidesToShow+2}else{rangeStart=Math.max(0,_.currentSlide-(_.options.slidesToShow/2+1));rangeEnd=2+(_.options.slidesToShow/2+1)+_.currentSlide}}else{rangeStart=_.options.infinite?_.options.slidesToShow+_.currentSlide:_.currentSlide;rangeEnd=Math.ceil(rangeStart+_.options.slidesToShow);if(_.options.fade===true){if(rangeStart>0)rangeStart--;if(rangeEnd<=_.slideCount)rangeEnd++}};loadRange=_.$slider.find('.slick-slide').slice(rangeStart,rangeEnd);if(_.options.lazyLoad==='anticipated'){var prevSlide=rangeStart-1,nextSlide=rangeEnd,$slides=_.$slider.find('.slick-slide');for(var i=0;i<_.options.slidesToScroll;i++){if(prevSlide<0)prevSlide=_.slideCount-1;loadRange=loadRange.add($slides.eq(prevSlide));loadRange=loadRange.add($slides.eq(nextSlide));prevSlide--;nextSlide++}};loadImages(loadRange);if(_.slideCount<=_.options.slidesToShow){cloneRange=_.$slider.find('.slick-slide');loadImages(cloneRange)}else if(_.currentSlide>=_.slideCount-_.options.slidesToShow){cloneRange=_.$slider.find('.slick-cloned').slice(0,_.options.slidesToShow);loadImages(cloneRange)}else if(_.currentSlide===0){cloneRange=_.$slider.find('.slick-cloned').slice(_.options.slidesToShow*-1);loadImages(cloneRange)}};Slick.prototype.loadSlider=function(){var _=this;_.setPosition();_.$slideTrack.css({opacity:1});_.$slider.removeClass('slick-loading');_.initUI();if(_.options.lazyLoad==='progressive')_.progressiveLazyLoad()};Slick.prototype.next=Slick.prototype.slickNext=function(){var _=this;_.changeSlide({data:{message:'next'}})};Slick.prototype.orientationChange=function(){var _=this;_.checkResponsive();_.setPosition()};Slick.prototype.pause=Slick.prototype.slickPause=function(){var _=this;_.autoPlayClear();_.paused=true};Slick.prototype.play=Slick.prototype.slickPlay=function(){var _=this;_.autoPlay();_.options.autoplay=true;_.paused=false;_.focussed=false;_.interrupted=false};Slick.prototype.postSlide=function(index){var _=this;if(!_.unslicked){_.$slider.trigger('afterChange',[_,index]);_.animating=false;if(_.slideCount>_.options.slidesToShow)_.setPosition();_.swipeLeft=null;if(_.options.autoplay)_.autoPlay();if(_.options.accessibility===true){_.initADA();if(_.options.focusOnChange){var $currentSlide=$(_.$slides.get(_.currentSlide));$currentSlide.attr('tabindex',0).focus()}}}};Slick.prototype.prev=Slick.prototype.slickPrev=function(){var _=this;_.changeSlide({data:{message:'previous'}})};Slick.prototype.preventDefault=function(event){event.preventDefault()};Slick.prototype.progressiveLazyLoad=function(tryCount){tryCount=tryCount||1;var _=this,$imgsToLoad=$('img[data-lazy]',_.$slider),image,imageSource,imageSrcSet,imageSizes,imageToLoad;if($imgsToLoad.length){image=$imgsToLoad.first();imageSource=image.attr('data-lazy');imageSrcSet=image.attr('data-srcset');imageSizes=image.attr('data-sizes')||_.$slider.attr('data-sizes');imageToLoad=document.createElement('img');imageToLoad.onload=function(){if(imageSrcSet){image.attr('srcset',imageSrcSet);if(imageSizes)image.attr('sizes',imageSizes)};image.attr('src',imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');if(_.options.adaptiveHeight===true)_.setPosition();_.$slider.trigger('lazyLoaded',[_,image,imageSource]);_.progressiveLazyLoad()};imageToLoad.onerror=function(){if(tryCount<3){setTimeout(function(){_.progressiveLazyLoad(tryCount+1)},500)}else{image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');_.$slider.trigger('lazyLoadError',[_,image,imageSource]);_.progressiveLazyLoad()}};imageToLoad.src=imageSource}else _.$slider.trigger('allImagesLoaded',[_])};Slick.prototype.refresh=function(initializing){var _=this,currentSlide,lastVisibleIndex;lastVisibleIndex=_.slideCount-_.options.slidesToShow;if(!_.options.infinite&&(_.currentSlide>lastVisibleIndex))_.currentSlide=lastVisibleIndex;if(_.slideCount<=_.options.slidesToShow)_.currentSlide=0;currentSlide=_.currentSlide;_.destroy(true);$.extend(_,_.initials,{currentSlide:currentSlide});_.init();if(!initializing)_.changeSlide({data:{message:'index',index:currentSlide}},false)};Slick.prototype.registerBreakpoints=function(){var _=this,breakpoint,currentBreakpoint,l,responsiveSettings=_.options.responsive||null;if($.type(responsiveSettings)==='array'&&responsiveSettings.length){_.respondTo=_.options.respondTo||'window';for(breakpoint in responsiveSettings){l=_.breakpoints.length-1;if(responsiveSettings.hasOwnProperty(breakpoint)){currentBreakpoint=responsiveSettings[breakpoint].breakpoint;while(l>=0){if(_.breakpoints[l]&&_.breakpoints[l]===currentBreakpoint)_.breakpoints.splice(l,1);l--};_.breakpoints.push(currentBreakpoint);_.breakpointSettings[currentBreakpoint]=responsiveSettings[breakpoint].settings}};_.breakpoints.sort(function(a,b){return(_.options.mobileFirst)?a-b:b-a})}};Slick.prototype.reinit=function(){var _=this;_.$slides=_.$slideTrack.children(_.options.slide).addClass('slick-slide');_.slideCount=_.$slides.length;if(_.currentSlide>=_.slideCount&&_.currentSlide!==0)_.currentSlide=_.currentSlide-_.options.slidesToScroll;if(_.slideCount<=_.options.slidesToShow)_.currentSlide=0;_.registerBreakpoints();_.setProps();_.setupInfinite();_.buildArrows();_.updateArrows();_.initArrowEvents();_.buildDots();_.updateDots();_.initDotEvents();_.cleanUpSlideEvents();_.initSlideEvents();_.checkResponsive(false,true);if(_.options.focusOnSelect===true)$(_.$slideTrack).children().on('click.slick',_.selectHandler);_.setSlideClasses(typeof _.currentSlide==='number'?_.currentSlide:0);_.setPosition();_.focusHandler();_.paused=!_.options.autoplay;_.autoPlay();_.$slider.trigger('reInit',[_])};Slick.prototype.resize=function(){var _=this;if($(window).width()!==_.windowWidth){clearTimeout(_.windowDelay);_.windowDelay=window.setTimeout(function(){_.windowWidth=$(window).width();_.checkResponsive();if(!_.unslicked)_.setPosition()},50)}};Slick.prototype.removeSlide=Slick.prototype.slickRemove=function(index,removeBefore,removeAll){var _=this;if(typeof index==='boolean'){removeBefore=index;index=removeBefore===true?0:_.slideCount-1}else index=removeBefore===true?--index:index;if(_.slideCount<1||index<0||index>_.slideCount-1)return false;_.unload();if(removeAll===true){_.$slideTrack.children().remove()}else _.$slideTrack.children(this.options.slide).eq(index).remove();_.$slides=_.$slideTrack.children(this.options.slide);_.$slideTrack.children(this.options.slide).detach();_.$slideTrack.append(_.$slides);_.$slidesCache=_.$slides;_.reinit()};Slick.prototype.setCSS=function(position){var _=this,positionProps={},x,y;if(_.options.rtl===true)position=-position;x=_.positionProp=='left'?Math.ceil(position)+'px':'0px';y=_.positionProp=='top'?Math.ceil(position)+'px':'0px';positionProps[_.positionProp]=position;if(_.transformsEnabled===false){_.$slideTrack.css(positionProps)}else{positionProps={};if(_.cssTransitions===false){positionProps[_.animType]='translate('+x+', '+y+')';_.$slideTrack.css(positionProps)}else{positionProps[_.animType]='translate3d('+x+', '+y+', 0px)';_.$slideTrack.css(positionProps)}}};Slick.prototype.setDimensions=function(){var _=this;if(_.options.vertical===false){if(_.options.centerMode===true)_.$list.css({padding:('0px '+_.options.centerPadding)})}else{_.$list.height(_.$slides.first().outerHeight(true)*_.options.slidesToShow);if(_.options.centerMode===true)_.$list.css({padding:(_.options.centerPadding+' 0px')})};_.listWidth=_.$list.width();_.listHeight=_.$list.height();if(_.options.vertical===false&&_.options.variableWidth===false){_.slideWidth=_.listWidth/_.options.slidesToShow;_.$slideTrack.width(Math.ceil((_.slideWidth*_.$slideTrack.children('.slick-slide').length)))}else if(_.options.variableWidth===true){_.$slideTrack.width(5e3*_.slideCount)}else{_.slideWidth=Math.ceil(_.listWidth);_.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true)*_.$slideTrack.children('.slick-slide').length)))};var offset=_.$slides.first().outerWidth(true)-_.$slides.first().width();if(_.options.variableWidth===false)_.$slideTrack.children('.slick-slide').width(_.slideWidth-offset)};Slick.prototype.setFade=function(){var _=this,targetLeft;_.$slides.each(function(index,element){targetLeft=(_.slideWidth*index)*-1;if(_.options.rtl===true){$(element).css({position:'relative',right:targetLeft,top:0,zIndex:_.options.zIndex-2,opacity:0})}else $(element).css({position:'relative',left:targetLeft,top:0,zIndex:_.options.zIndex-2,opacity:0})});_.$slides.eq(_.currentSlide).css({zIndex:_.options.zIndex-1,opacity:1})};Slick.prototype.setHeight=function(){var _=this;if(_.options.slidesToShow===1&&_.options.adaptiveHeight===true&&_.options.vertical===false){var targetHeight=_.$slides.eq(_.currentSlide).outerHeight(true);_.$list.css('height',targetHeight)}};Slick.prototype.setOption=Slick.prototype.slickSetOption=function(){var _=this,l,item,option,value,refresh=false,type;if($.type(arguments[0])==='object'){option=arguments[0];refresh=arguments[1];type='multiple'}else if($.type(arguments[0])==='string'){option=arguments[0];value=arguments[1];refresh=arguments[2];if(arguments[0]==='responsive'&&$.type(arguments[1])==='array'){type='responsive'}else if(typeof arguments[1]!=='undefined')type='single'};if(type==='single'){_.options[option]=value}else if(type==='multiple'){$.each(option,function(opt,val){_.options[opt]=val})}else if(type==='responsive')for(item in value)if($.type(_.options.responsive)!=='array'){_.options.responsive=[value[item]]}else{l=_.options.responsive.length-1;while(l>=0){if(_.options.responsive[l].breakpoint===value[item].breakpoint)_.options.responsive.splice(l,1);l--};_.options.responsive.push(value[item])};if(refresh){_.unload();_.reinit()}};Slick.prototype.setPosition=function(){var _=this;_.setDimensions();_.setHeight();if(_.options.fade===false){_.setCSS(_.getLeft(_.currentSlide))}else _.setFade();_.$slider.trigger('setPosition',[_])};Slick.prototype.setProps=function(){var _=this,bodyStyle=document.body.style;_.positionProp=_.options.vertical===true?'top':'left';if(_.positionProp==='top'){_.$slider.addClass('slick-vertical')}else _.$slider.removeClass('slick-vertical');if(bodyStyle.WebkitTransition!==undefined||bodyStyle.MozTransition!==undefined||bodyStyle.msTransition!==undefined)if(_.options.useCSS===true)_.cssTransitions=true;if(_.options.fade)if(typeof _.options.zIndex==='number'){if(_.options.zIndex<3)_.options.zIndex=3}else _.options.zIndex=_.defaults.zIndex;if(bodyStyle.OTransform!==undefined){_.animType='OTransform';_.transformType='-o-transform';_.transitionType='OTransition';if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.webkitPerspective===undefined)_.animType=false};if(bodyStyle.MozTransform!==undefined){_.animType='MozTransform';_.transformType='-moz-transform';_.transitionType='MozTransition';if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.MozPerspective===undefined)_.animType=false};if(bodyStyle.webkitTransform!==undefined){_.animType='webkitTransform';_.transformType='-webkit-transform';_.transitionType='webkitTransition';if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.webkitPerspective===undefined)_.animType=false};if(bodyStyle.msTransform!==undefined){_.animType='msTransform';_.transformType='-ms-transform';_.transitionType='msTransition';if(bodyStyle.msTransform===undefined)_.animType=false};if(bodyStyle.transform!==undefined&&_.animType!==false){_.animType='transform';_.transformType='transform';_.transitionType='transition'};_.transformsEnabled=_.options.useTransform&&(_.animType!==null&&_.animType!==false)};Slick.prototype.setSlideClasses=function(index){var _=this,centerOffset,allSlides,indexOffset,remainder;allSlides=_.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden','true').attr('aria-label',function(){return $(this).attr('aria-label').replace(' (centered)','')});_.$slides.eq(index).addClass('slick-current');if(_.options.centerMode===true){var evenCoef=_.options.slidesToShow%2===0?1:0;centerOffset=Math.floor(_.options.slidesToShow/2);if(_.options.infinite===true){if(index>=centerOffset&&index<=(_.slideCount-1)-centerOffset){_.$slides.slice(index-centerOffset+evenCoef,index+centerOffset+1).addClass('slick-active').attr('aria-hidden','false')}else{indexOffset=_.options.slidesToShow+index;allSlides.slice(indexOffset-centerOffset+1+evenCoef,indexOffset+centerOffset+2).addClass('slick-active').attr('aria-hidden','false')};if(index===0){allSlides.eq(allSlides.length-1-_.options.slidesToShow).addClass('slick-center').attr('aria-label',function(){return $(this).attr('aria-label')+' (centered)'})}else if(index===_.slideCount-1)allSlides.eq(_.options.slidesToShow).addClass('slick-center').attr('aria-label',function(){return $(this).attr('aria-label')+' (centered)'})};_.$slides.eq(index).addClass('slick-center').attr('aria-label',function(){return $(this).attr('aria-label')+' (centered)'})}else if(index>=0&&index<=(_.slideCount-_.options.slidesToShow)){_.$slides.slice(index,index+_.options.slidesToShow).addClass('slick-active').attr('aria-hidden','false')}else if(allSlides.length<=_.options.slidesToShow){allSlides.addClass('slick-active').attr('aria-hidden','false')}else{remainder=_.slideCount%_.options.slidesToShow;indexOffset=_.options.infinite===true?_.options.slidesToShow+index:index;if(_.options.slidesToShow==_.options.slidesToScroll&&(_.slideCount-index)<_.options.slidesToShow){allSlides.slice(indexOffset-(_.options.slidesToShow-remainder),indexOffset+remainder).addClass('slick-active').attr('aria-hidden','false')}else allSlides.slice(indexOffset,indexOffset+_.options.slidesToShow).addClass('slick-active').attr('aria-hidden','false')};if(_.options.lazyLoad==='ondemand'||_.options.lazyLoad==='anticipated')_.lazyLoad()};Slick.prototype.setupInfinite=function(){var _=this,i,slideIndex,infiniteCount;if(_.options.fade===true)_.options.centerMode=false;if(_.options.infinite===true&&_.options.fade===false){slideIndex=null;if(_.slideCount>_.options.slidesToShow){if(_.options.centerMode===true){infiniteCount=_.options.slidesToShow+1}else infiniteCount=_.options.slidesToShow;for(i=_.slideCount;i>(_.slideCount-infiniteCount);i-=1){slideIndex=i-1;$(_.$slides[slideIndex]).clone(true).attr('id','').attr('data-slick-index',slideIndex-_.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned')};for(i=0;i<infiniteCount+_.slideCount;i+=1){slideIndex=i;$(_.$slides[slideIndex]).clone(true).attr('id','').attr('data-slick-index',slideIndex+_.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned')};_.$slideTrack.find('.slick-cloned').find('[id]').each(function(){$(this).attr('id','')})}}};Slick.prototype.interrupt=function(toggle){var _=this;if(!toggle)_.autoPlay();_.interrupted=toggle};Slick.prototype.selectHandler=function(event){var _=this,targetElement=$(event.target).is('.slick-slide')?$(event.target):$(event.target).parents('.slick-slide'),index=parseInt(targetElement.attr('data-slick-index'));if(!index)index=0;if(_.slideCount<=_.options.slidesToShow){_.slideHandler(index,false,true);return};_.slideHandler(index)};Slick.prototype.slideHandler=function(index,sync,dontAnimate){var targetSlide,animSlide,oldSlide,slideLeft,targetLeft=null,_=this,navTarget;sync=sync||false;if(_.animating===true&&_.options.waitForAnimate===true)return;if(_.options.fade===true&&_.currentSlide===index)return;if(sync===false)_.asNavFor(index);targetSlide=index;targetLeft=_.getLeft(targetSlide);slideLeft=_.getLeft(_.currentSlide);_.currentLeft=_.swipeLeft===null?slideLeft:_.swipeLeft;if(_.options.infinite===false&&_.options.centerMode===false&&(index<0||index>_.getDotCount()*_.options.slidesToScroll)){if(_.options.fade===false){targetSlide=_.currentSlide;if(dontAnimate!==true&&_.slideCount>_.options.slidesToShow){_.animateSlide(slideLeft,function(){_.postSlide(targetSlide)})}else _.postSlide(targetSlide)};return}else if(_.options.infinite===false&&_.options.centerMode===true&&(index<0||index>(_.slideCount-_.options.slidesToScroll))){if(_.options.fade===false){targetSlide=_.currentSlide;if(dontAnimate!==true&&_.slideCount>_.options.slidesToShow){_.animateSlide(slideLeft,function(){_.postSlide(targetSlide)})}else _.postSlide(targetSlide)};return};if(_.options.autoplay)clearInterval(_.autoPlayTimer);if(targetSlide<0){if(_.slideCount%_.options.slidesToScroll!==0){animSlide=_.slideCount-(_.slideCount%_.options.slidesToScroll)}else animSlide=_.slideCount+targetSlide}else if(targetSlide>=_.slideCount){if(_.slideCount%_.options.slidesToScroll!==0){animSlide=0}else animSlide=targetSlide-_.slideCount}else animSlide=targetSlide;_.animating=true;_.$slider.trigger('beforeChange',[_,_.currentSlide,animSlide]);oldSlide=_.currentSlide;_.currentSlide=animSlide;_.setSlideClasses(_.currentSlide);if(_.options.asNavFor){navTarget=_.getNavTarget();navTarget=navTarget.slick('getSlick');if(navTarget.slideCount<=navTarget.options.slidesToShow)navTarget.setSlideClasses(_.currentSlide)};_.updateDots();_.updateArrows();if(_.options.fade===true){if(dontAnimate!==true){_.fadeSlideOut(oldSlide);_.fadeSlide(animSlide,function(){_.postSlide(animSlide)})}else _.postSlide(animSlide);_.animateHeight();return};if(dontAnimate!==true&&_.slideCount>_.options.slidesToShow){_.animateSlide(targetLeft,function(){_.postSlide(animSlide)})}else _.postSlide(animSlide)};Slick.prototype.startLoad=function(){var _=this;if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){_.$prevArrow.hide();_.$nextArrow.hide()};if(_.options.dots===true&&_.slideCount>_.options.slidesToShow)_.$dots.hide();_.$slider.addClass('slick-loading')};Slick.prototype.swipeDirection=function(){var xDist,yDist,r,swipeAngle,_=this;xDist=_.touchObject.startX-_.touchObject.curX;yDist=_.touchObject.startY-_.touchObject.curY;r=Math.atan2(yDist,xDist);swipeAngle=Math.round(r*180/Math.PI);if(swipeAngle<0)swipeAngle=360-Math.abs(swipeAngle);if((swipeAngle<=45)&&(swipeAngle>=0))return(_.options.rtl===false?'left':'right');if((swipeAngle<=360)&&(swipeAngle>=315))return(_.options.rtl===false?'left':'right');if((swipeAngle>=135)&&(swipeAngle<=225))return(_.options.rtl===false?'right':'left');if(_.options.verticalSwiping===true)if((swipeAngle>=35)&&(swipeAngle<=135)){return'down'}else return'up';return'vertical'};Slick.prototype.swipeEnd=function(event){var _=this,slideCount,direction;_.dragging=false;_.swiping=false;if(_.scrolling){_.scrolling=false;return false};_.interrupted=false;_.shouldClick=(_.touchObject.swipeLength>10)?false:true;if(_.touchObject.curX===undefined)return false;if(_.touchObject.edgeHit===true)_.$slider.trigger('edge',[_,_.swipeDirection()]);if(_.touchObject.swipeLength>=_.touchObject.minSwipe){direction=_.swipeDirection();switch(direction){case'left':case'down':slideCount=_.options.swipeToSlide?_.checkNavigable(_.currentSlide+_.getSlideCount()):_.currentSlide+_.getSlideCount();_.currentDirection=0;break;case'right':case'up':slideCount=_.options.swipeToSlide?_.checkNavigable(_.currentSlide-_.getSlideCount()):_.currentSlide-_.getSlideCount();_.currentDirection=1;break;default:};if(direction!='vertical'){_.slideHandler(slideCount);_.touchObject={};_.$slider.trigger('swipe',[_,direction])}}else if(_.touchObject.startX!==_.touchObject.curX){_.slideHandler(_.currentSlide);_.touchObject={}}};Slick.prototype.swipeHandler=function(event){var _=this;if((_.options.swipe===false)||('ontouchend'in document&&_.options.swipe===false)){return}else if(_.options.draggable===false&&event.type.indexOf('mouse')!==-1)return;_.touchObject.fingerCount=event.originalEvent&&event.originalEvent.touches!==undefined?event.originalEvent.touches.length:1;_.touchObject.minSwipe=_.listWidth/_.options.touchThreshold;if(_.options.verticalSwiping===true)_.touchObject.minSwipe=_.listHeight/_.options.touchThreshold;switch(event.data.action){case'start':_.swipeStart(event);break;case'move':_.swipeMove(event);break;case'end':_.swipeEnd(event);break}};Slick.prototype.swipeMove=function(event){var _=this,edgeWasHit=false,curLeft,swipeDirection,swipeLength,positionOffset,touches,verticalSwipeLength;touches=event.originalEvent!==undefined?event.originalEvent.touches:null;if(!_.dragging||_.scrolling||touches&&touches.length!==1)return false;curLeft=_.getLeft(_.currentSlide);_.touchObject.curX=touches!==undefined?touches[0].pageX:event.clientX;_.touchObject.curY=touches!==undefined?touches[0].pageY:event.clientY;_.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(_.touchObject.curX-_.touchObject.startX,2)));verticalSwipeLength=Math.round(Math.sqrt(Math.pow(_.touchObject.curY-_.touchObject.startY,2)));if(!_.options.verticalSwiping&&!_.swiping&&verticalSwipeLength>4){_.scrolling=true;return false};if(_.options.verticalSwiping===true)_.touchObject.swipeLength=verticalSwipeLength;swipeDirection=_.swipeDirection();if(event.originalEvent!==undefined&&_.touchObject.swipeLength>4){_.swiping=true;event.preventDefault()};positionOffset=(_.options.rtl===false?1:-1)*(_.touchObject.curX>_.touchObject.startX?1:-1);if(_.options.verticalSwiping===true)positionOffset=_.touchObject.curY>_.touchObject.startY?1:-1;swipeLength=_.touchObject.swipeLength;_.touchObject.edgeHit=false;if(_.options.infinite===false)if((_.currentSlide===0&&swipeDirection==='right')||(_.currentSlide>=_.getDotCount()&&swipeDirection==='left')){swipeLength=_.touchObject.swipeLength*_.options.edgeFriction;_.touchObject.edgeHit=true};if(_.options.vertical===false){_.swipeLeft=curLeft+swipeLength*positionOffset}else _.swipeLeft=curLeft+(swipeLength*(_.$list.height()/_.listWidth))*positionOffset;if(_.options.verticalSwiping===true)_.swipeLeft=curLeft+swipeLength*positionOffset;if(_.options.fade===true||_.options.touchMove===false)return false;if(_.animating===true){_.swipeLeft=null;return false};_.setCSS(_.swipeLeft)};Slick.prototype.swipeStart=function(event){var _=this,touches;_.interrupted=true;if(_.touchObject.fingerCount!==1||_.slideCount<=_.options.slidesToShow){_.touchObject={};return false};if(event.originalEvent!==undefined&&event.originalEvent.touches!==undefined)touches=event.originalEvent.touches[0];_.touchObject.startX=_.touchObject.curX=touches!==undefined?touches.pageX:event.clientX;_.touchObject.startY=_.touchObject.curY=touches!==undefined?touches.pageY:event.clientY;_.dragging=true};Slick.prototype.unfilterSlides=Slick.prototype.slickUnfilter=function(){var _=this;if(_.$slidesCache!==null){_.unload();_.$slideTrack.children(this.options.slide).detach();_.$slidesCache.appendTo(_.$slideTrack);_.reinit()}};Slick.prototype.unload=function(){var _=this;$('.slick-cloned',_.$slider).remove();if(_.$dots)_.$dots.remove();if(_.$prevArrow&&_.htmlExpr.test(_.options.prevArrow))_.$prevArrow.remove();if(_.$nextArrow&&_.htmlExpr.test(_.options.nextArrow))_.$nextArrow.remove();_.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden','true').css('width','')};Slick.prototype.unslick=function(fromBreakpoint){var _=this;_.$slider.trigger('unslick',[_,fromBreakpoint]);_.destroy()};Slick.prototype.updateArrows=function(){var _=this,centerOffset;centerOffset=Math.floor(_.options.slidesToShow/2);if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow&&!_.options.infinite){_.$prevArrow.removeClass('slick-disabled').attr('disabled',false);_.$nextArrow.removeClass('slick-disabled').attr('disabled',false);if(_.currentSlide===0){_.$prevArrow.addClass('slick-disabled').attr('disabled',true);_.$nextArrow.removeClass('slick-disabled').attr('disabled',false)}else if(_.currentSlide>=_.slideCount-_.options.slidesToShow&&_.options.centerMode===false){_.$nextArrow.addClass('slick-disabled').attr('disabled',true);_.$prevArrow.removeClass('slick-disabled').attr('disabled',false)}else if(_.currentSlide>=_.slideCount-1&&_.options.centerMode===true){_.$nextArrow.addClass('slick-disabled').attr('disabled',true);_.$prevArrow.removeClass('slick-disabled').attr('disabled',false)}}};Slick.prototype.updateDots=function(){var _=this;if(_.$dots!==null){_.$dots.find('li').removeClass('slick-active').end();_.$dots.find('li').eq(Math.floor(_.currentSlide/_.options.slidesToScroll)).addClass('slick-active')}};Slick.prototype.visibility=function(){var _=this;if(_.options.autoplay)if(document[_.hidden]){_.interrupted=true}else _.interrupted=false};$.fn.slick=function(){var _=this,opt=arguments[0],args=Array.prototype.slice.call(arguments,1),l=_.length,i,ret;for(i=0;i<l;i++){if(typeof opt=='object'||typeof opt=='undefined'){_[i].slick=new Slick(_[i],opt)}else ret=_[i].slick[opt].apply(_[i].slick,args);if(typeof ret!='undefined')return ret};return _}}))
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/slider-container/slick.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/slider-container/init.slick.js. */
(function($,Drupal,drupalSettings){"use strict";Drupal.behaviors.CohesionSlick={attach:function(context){var gridSettings=drupalSettings.cohesion.responsive_grid_settings,cmm=new Drupal.CohesionResponsiveBreakpoints(drupalSettings.cohesion.responsive_grid_settings),once='coh-slider-container-init';$.each($('.coh-slider-container',context),function(){var $this=$(this),$slider=$('> .coh-slider-container-mid > .coh-slider-container-inner',this),$slides=$('> .coh-slider-item',$slider);if(!$slides.length){$slider.addClass('slick-initialized');return};if($this.data('jquery-once-'+once)){$slider.slick('refresh');return}
function updateCount(slick){var i=(slick.currentSlide?slick.currentSlide:0)+1;slick.$slideCounter.text(i+'/'+slick.slideCount)}
function updateCounter(slick){if(slick.options.counter){if(!$(slick.options.appendCounter).find(slick.$slideCounter).length)$(slick.options.appendCounter).append(slick.$slideCounter)}else slick.$slideCounter.detach();updateCount(slick)}
function updateNavigationLabels(slick){if(slick.options.infinite&&slick.options.arrows){if(i===1){$(slick.$prevArrow).attr('aria-label','Last slide')}else $(slick.$prevArrow).attr('aria-label','Previous slide');if(i===slick.slideCount){$(slick.$nextArrow).attr('aria-label','First slide')}else $(slick.$nextArrow).attr('aria-label','Next slide')}};$slider.on('init',function(event,slick){var clones=$($('.slick-cloned',slick.$slideTrack));slick.$slideCounter=$('<div />',{class:slick.options.counterClass});$this.once(once);$.each(clones,function(){Drupal.behaviors.CohesionSlick.attach($(this))});updateCounter(slick);updateNavigationLabels(slick)});$slider.on('afterChange',function(event,slick){updateCount(slick);updateNavigationLabels(slick)});$slider.on('breakpoint',function(event,slick,breakpoint){updateCounter(slick)});var settings=$slider.data().cohSlider;settings.mobileFirst=(cmm.getGridType()===cmm.constants.mobile);settings.customPaging=function(slider,i){return settings.dotsNumbers==true?$('<button type="button" />').text(i+1):$('<button type="button" />')};if(typeof settings.asNavFor!=='undefined'&&settings.asNavFor!==null)settings.asNavFor=$(settings.asNavFor+' .coh-slider-container-inner');var responsive=[],matchHeights={},matchHeightsInit=false,previousResponsiveSettings=false;for(var i=0;i<cmm.breakpoints.length;i++){var breakpointKey=cmm.breakpoints[i].key,breakpoint=settings.responsive[breakpointKey];if(typeof breakpoint!=='undefined'&&typeof breakpoint.matchHeights!=='undefined'&&!$.isArray(breakpoint.matchHeights)){matchHeights[breakpointKey]=settings.responsive[breakpointKey].matchHeights;if(typeof matchHeights[breakpointKey].class!=='undefined')matchHeights[breakpointKey].target=matchHeights[breakpointKey].class;matchHeightsInit=true};if(cmm.getGridType()!==cmm.constants.mobile&&breakpointKey==='xl'){if(typeof breakpoint.appendArrows!=='undefined')breakpoint.appendArrows=$(breakpoint.appendArrows.trim()+':first',$this);if(typeof breakpoint.appendDots!=='undefined')breakpoint.appendDots=$(breakpoint.appendDots.trim()+':first',$this);if(typeof breakpoint.appendCounter!=='undefined')breakpoint.appendCounter=$(breakpoint.appendCounter.trim()+':first',$this);if(typeof breakpoint.appendPlaypause!=='undefined')breakpoint.appendPlaypause=$(breakpoint.appendPlaypause.trim()+':first',$this);jQuery.extend(settings,breakpoint)}else if(!jQuery.isEmptyObject(breakpoint)){var responsive_obj={settings:breakpoint};if(typeof gridSettings.breakpoints[breakpointKey].width==='undefined'){responsive_obj.breakpoint=0}else if(cmm.getGridType()===cmm.constants.desktop){responsive_obj.breakpoint=cmm.getBreakpointMediaWidth(breakpointKey)+1}else responsive_obj.breakpoint=cmm.getBreakpointMediaWidth(breakpointKey);if(typeof breakpoint.appendArrows!=='undefined')responsive_obj.settings.appendArrows=$(breakpoint.appendArrows.trim()+'',$this);if(typeof breakpoint.appendDots!=='undefined')responsive_obj.settings.appendDots=$(breakpoint.appendDots.trim()+'',$this);if(typeof breakpoint.appendCounter!=='undefined')responsive_obj.settings.appendCounter=$(breakpoint.appendCounter.trim()+'',$this);if(typeof breakpoint.appendPlaypause!=='undefined')responsive_obj.settings.appendPlaypause=$(breakpoint.appendPlaypause.trim()+':first',$this);if(previousResponsiveSettings!==false)responsive_obj.settings=$.extend({},previousResponsiveSettings,responsive_obj.settings);previousResponsiveSettings=responsive_obj.settings;responsive.push(responsive_obj)}};settings.rtl=document.dir==='ltr'?false:true;settings.responsive=responsive;$slider.slick(settings);if(matchHeightsInit!==false)$slider.cohesionContainerMatchHeights({excludeElements:['slide'],targets:matchHeights,context:context,expressionPrefixes:['.slick-list > .slick-track','.slick-list > .slick-track > .coh-slider-item'],loaders:['.coh-slider-container > .coh-slider-container-mid > .coh-slider-container-inner img','.coh-slider-container > .coh-slider-container-mid > .coh-slider-container-inner frame','.coh-slider-container > .coh-slider-container-mid > .coh-slider-container-inner iframe','.coh-slider-container > .coh-slider-container-mid > .coh-slider-container-inner img','.coh-slider-container > .coh-slider-container-mid > .coh-slider-container-inner input[type="image"]','.coh-slider-container > .coh-slider-container-mid > .coh-slider-container-inner link','.coh-slider-container > .coh-slider-container-mid > .coh-slider-container-inner script','.coh-slider-container > .coh-slider-container-mid > .coh-slider-container-inner style']});var breakpointOriginal=false;if($.fn.matchHeight._groups.length>0)$slider.on('breakpoint',function(event,slick,breakpoint){if(breakpointOriginal!==breakpoint){$.fn.matchHeight._update();breakpointOriginal=breakpoint}})})}}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://www.Gulf Bank/sites/default/files/cohesion/scripts/slider-container/init.slick.js. */;
