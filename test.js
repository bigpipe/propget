describe('propget', function () {
  'use strict';

  var propget = require('./')
    , assume = require('assume');

  it('is exported as function', function () {
    assume(propget).is.a('function');
  });

  it('can find item in array using dot notation', function () {
    var data = { foo: ['bar', 'baz'] };

    assume(propget(data, 'foo.1')).equals('baz');
    assume(propget(data, 'foo.3')).equals(undefined);
  });

  it('can find deeply nested object', function () {
    var data = { foo: {'bar': 'baz'} };

    assume(propget(data, 'foo.bar')).equals('baz');
    assume(propget(data, 'foo.lol')).equals(undefined);
  });

  it('does not worry about undefined keys', function () {
    var data = {};

    assume(propget(data, 'foo.bar.l1.4.0.afa')).equals(undefined);
  });

  it('can find keys that have dot noatiation', function () {
    var data = { 'foo.bar': 'lol' };

    assume(propget(data, 'foo.bar')).equals('lol');
  });
});
