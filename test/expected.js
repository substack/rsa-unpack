var test = require('tap').test;
var expected = require('./data/expected.json');
var keys = require('./data/keys.json');
var unpack = require('../');

test('output matches openssl rsa -text', function (t) {
    var c = unpack(keys.private);
    var b = Object.keys(c).reduce(function (acc, key) {
        if (Buffer.isBuffer(c)) {
            acc[key] = c.toString('base64');
        }
        else acc[key] = c[key];
        return acc;
    }, {});
    
    t.same(b, expected);
    t.end();
});
