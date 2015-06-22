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
 * @returns {Mixed}
 * @api private
 */
module.exports = function find(data, prop) {
  if (!prop || !~prop.indexOf('.') || prop in data) return data[prop];

  var paths = prop.split('.')
    , length = paths.length
    , structure = data
    , result = prop
    , i = 0;

  for (; i < length && structure; i++) {
    result = structure[paths[i]];
    structure = result;
  }

  return result;
};
