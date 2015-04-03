
var eventhash = require('..');
var assert = require('assert');
var hash = require('uniquid')();

describe('eventhash', function() {
  it('should be function', function() {
    assert(typeof eventhash === 'function');
    assert(typeof eventhash.bind === 'function');
    assert(typeof eventhash.unbind === 'function');
  });
});

describe('eventhash.bind(fn)', function() {
  it('should call handler', function(done) {
    eventhash.bind(function() {
      assert(location.hash.substr(1) === hash);
      done();
    });
    location.hash = hash;
  });
});
