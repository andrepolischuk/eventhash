(function umd(require){
  if ('object' == typeof exports) {
    module.exports = require('1');
  } else if ('function' == typeof define && (define.amd || define.cmd)) {
    define(function(){ return require('1'); });
  } else {
    this['eventhash'] = require('1');
  }
})((function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep || req);
    }, m, m.exports, outer, modules, cache, entries);

    // store to cache after successful resolve
    cache[id] = m;

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {

'use strict';

/**
 * Module dependencies
 */

try {
  var events = require('event');
} catch (err) {
  var events = require('component-event');
}

var ies = require('ies');

/**
 * Window location
 */

var location = window.location;

/**
 * Hashchange support
 */

var support = 'onhashchange' in window && !(ies && ies < 8);

/**
 * Running fix for IE<8
 */

var running;

/**
 * Expose bind
 */

module.exports = bind.bind = bind;

/**
 * Expose bind
 * @param  {Function} fn
 * @return {Function}
 * @api public
 */

function bind(fn) {
  if (typeof fn !== 'function') return;
  if (support) return events.bind(window, 'hashchange', fn);
  if (running) return;
  running = true;
  fix(fn);
  return fn;
}

/**
 * onhashchange fix for IE<8
 * @param {Function} fn
 * @param {String} path
 * @api private
 */

function fix(fn, path) {
  if (!running) return;

  if (path !== location.hash) {
    fn();
    path = location.hash;
  }

  setTimeout(function() {
    fix(fn, path);
  }, 500);
}

/**
 * Expose unbind
 * @param  {Function} fn
 * @return {Function}
 * @api public
 */

module.exports.unbind = function(fn) {
  if (typeof fn !== 'function') return;
  if (support) return events.unbind(window, 'hashchange', fn);
  running = false;
  return fn;
};

}, {"event":2,"component-event":2,"ies":3}],
2: [function(require, module, exports) {
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
}, {}],
3: [function(require, module, exports) {

'use strict';

/**
 * User agent
 */

var ua = navigator.userAgent;

/**
 * Export version
 */

module.exports = parse();

/**
 * Get IE major version number
 * @return {Number}
 * @api private
 */

function parse() {
  var msie = /MSIE.(\d+)/i.exec(ua);
  var rv = /Trident.+rv:(\d+)/i.exec(ua);
  var version = msie || rv || undefined;
  return version ? +version[1] : version;
}

}, {}]}, {}, {"1":""}));