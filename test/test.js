
var eventhash = require('..');
var assert = require('assert');
var hash = require('uniquid')();

describe('eventhash', function() {
  it('should be function', function() {
    assert(typeof eventhash === 'function');
  });
});

describe('eventhash(fn)', function() {
  it('should call handler', function(done) {
    eventhash(function() {
      assert(location.hash.substr(1) === hash);
      done();
    });

    location.hash = hash;
  });
});
