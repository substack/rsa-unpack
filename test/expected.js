var test = require('tap').test;
var expected = require('./data/expected.json');
var keys = require('./data/keys.json');
var unpack = require('../');

test('output matches openssl rsa -text', function (t) {
    t.same(unpack(keys.private), expected);
    t.end();
});
