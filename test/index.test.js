'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { hello } = require('..');

test('greets by name', () => {
  assert.equal(hello('Ada'), 'Hello, Ada!');
});

test('refuses an empty name', () => {
  assert.throws(() => hello(' '), TypeError);
});
