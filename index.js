
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
