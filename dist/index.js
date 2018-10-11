// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class EventBus
 * @description Simple library to trigger custom events
 * @example
 * import EventBus from '@docomodigital/js-eventbus';
 *
 * const Bus = new EventBus();
 * const callback = (args) => {
 *   // Do something...
 * };
 *
 * Bus.on('customEvent', callback);
 * Bus.trigger('customEvent', {foo: 'bar'}); // callback is called
 */
var EventBus =
/*#__PURE__*/
function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    this.events = {};
  }
  /**
   * @memberOf EventBus
   * @function on
   * @description Register a new callback for the specified custom event
   * @param {String} eventType - if not exists it defines a new one
   * @param {Function} func - the function to call when the event is triggered
   * @param {Object} [context=null] - the 'this' applied to the function. default null,
   * this will not work with arrow functions.
   * @return {void}
   * @example
   * const Bus = new EventBus();
   * Bus.on('customEvent', (args) => {
   *     // Do something...
   * });
   *
   * const ctx = {foo: 'bar'}
   * Bus.on('customEvent', (args) => {
   *     console.log(this.foo) // Uncaught TypeError: Cannot read property 'foo' of undefined
   * }, ctx);
   * Bus.on('customEvent', function(args) {
   *     console.log(this.foo) // 'bar'
   * }, ctx);
   */


  _createClass(EventBus, [{
    key: "on",
    value: function on(eventType, func) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!this.events[eventType]) {
        this.events[eventType] = [];
      }

      this.events[eventType].push({
        func: func,
        context: context
      });
    }
    /**
     * @memberOf EventBus
     * @function trigger
     * @description Trigger the specified event, pass the other arguments to the callbacks
     * @param {String} eventType - the eventType to trigger. if not exists nothing happens
     * @param {*} args - Arguments to pass to the eventType callbacks
     * @return {void}
     * @example
     * const Bus = new EventBus();
     * const cb = (args) => {}
     * Bus.on('customEvent', cb);
     * Bus.trigger('customEvent'); //cb is called
     */

  }, {
    key: "trigger",
    value: function trigger(eventType) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var event = this.events[eventType];

      if (!event || event.length === 0) {
        return;
      }

      event.map(function (obj) {
        obj.func.apply(obj.context, args);
        return obj;
      });
    }
    /**
     * @memberOf EventBus
     * @function off
     * @description Remove the specified callback from the specified event
     * @param {String} eventType - the eventType
     * @param {Function} func - the reference of the function to remove from the list of function
     * @return {void}
     * @example
     *const cb = (args) => {};
     * Bus.on('evt', cb);
     * Bus.off('evt', cb);
     * Bus.trigger('evt') // cb is not called
     */

  }, {
    key: "off",
    value: function off(eventType, func) {
      var event = this.events[eventType];

      if (!event) {
        return;
      }

      this.events[eventType] = event.reduceRight(function (prev, current) {
        if (current.func !== func) {
          prev.push(current);
        }

        return prev;
      }, []);
    }
    /**
     * @memberOf EventBus
     * @function clear
     * @description Remove all the callbacks from the specified event
     * if the event not exists nothing happens
     * @param {String} eventType - the event type to clear
     * @return {void}
     * @example
     * Bus.clear('evt');
     */

  }, {
    key: "clear",
    value: function clear(eventType) {
      if (!this.events[eventType]) {
        return;
      }

      this.events[eventType] = [];
    }
    /**
     * @memberOf EventBus
     * @function clearAll
     * @description Remove all the callbacks from all the events
     * @return {void}
     * @example
     * Bus.clearAll();
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
      this.events = {};
    }
  }]);

  return EventBus;
}();

exports.default = EventBus;
},{}]},{},["Focm"], null)