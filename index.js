'use strict';

/**
 * Small helper function that allows you get a key from an object by
 * specifying it's depth using dot notations.
 *
 * Example:
 *
 * - path.to.0.keys
 * - key.depth
 *
 * @param {Object|Array} data Data structure that we need search.
 * @param {String} prop Property structure.
 * @param {Args} args Possible arguments for function calls.
 * @returns {Mixed}
 * @api private
 */
module.exports = function find(data, prop) {
  data = data || {};
  prop = prop || '';

  //
  // Fastest match, direct match against a key in the data.
  //
  if (prop in data) return data[prop];

  var args = Array.prototype.slice.call(arguments, 2)
    , paths = prop.split('.')
    , length = paths.length
    , structure = data
    , result = prop
    , i = 0;

  for (; i < length && structure; i++) {
    var fn = /(.+)\(([^\)]+?)?\)$/g.exec(paths[i]);

    if (fn) {
      if (!fn[2]) {
        result = structure[fn[1]]();
      } else {
        result = structure[fn[1]].apply(null, args.splice(0, fn[2].split(/[\s,]+/).length));
      }
    } else {
      result = structure[paths[i]];
    }

    structure = result;
  }

  return result;
};
