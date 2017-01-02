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

  it('can find keys that have dot notation', function () {
    var data = { 'foo.bar': 'lol' };

    assume(propget(data, 'foo.bar')).equals('lol');
  });

  describe('function execution', function () {
    it('can execute a function using dot notation', function () {
      var data = {
        foo: {
          bar: function () {
            return 'baz';
          }
        }
      };

      assume(propget(data, 'foo.bar()')).equals('baz');
    });

    it('can execute a function with arguments using dot notation', function (next) {
      next = assume.plan(3, next);

      var data = {
        foo: {
          bar: function (arg1, arg2) {
            assume(arg1).equals('he');
            assume(arg2).equals('hoo');

            return 'baz';
          }
        }
      };

      assume(propget(data, 'foo.bar(first, second)', 'he', 'hoo')).equals('baz');
      next();
    });

    it('can continue searching the returned object from function call', function () {
      var data = {
        foo: {
          bar: function () {
            return {
              what: 'lol'
            }
          }
        }
      };

      assume(propget(data, 'foo.bar().what')).equals('lol');
    });
  });
});
