
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
 * Expose onhashchange
 * @param {Function} fn
 * @api public
 */

module.exports = function(fn) {
  if (typeof fn !== 'function') return;

  if (!support) {
    fix(fn);
  } else {
    events.bind(window, 'hashchange', fn);
  }
};

/**
 * onhashchange fix for IE < 8
 * @param {Function} fn
 * @param {String} path
 * @api private
 */

function fix(fn, path) {
  if (path !== location.hash) {
    fn();
    path = location.hash;
  }

  setTimeout(function() {
    fix(fn, path);
  }, 500);
}
