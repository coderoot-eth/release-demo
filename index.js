'use strict';

/** A greeting for `name`. */
function hello(name) {
  if (typeof name !== 'string' || name.trim() === '') throw new TypeError('name must be a non-empty string');
  return `Hello, ${name.trim()}!`;
}

module.exports = { hello };
