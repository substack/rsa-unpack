var test = require('tap').test;
var expected = [
    require('./data/expected0.json'),
    require('./data/expected1.json'),
];
var keys = [
    require('./data/keys0.json'),
    require('./data/keys1.json')
];
var unpack = require('../');

test('output matches openssl rsa -text', function (t) {
    t.same(unbuffer(unpack(keys[0].private)), expected[0]);
    t.same(unbuffer(unpack(keys[1].private)), expected[1]);
    t.end();
});

function unbuffer (c) {
    return Object.keys(c).reduce(function (acc, key) {
        if (Buffer.isBuffer(c[key])) {
            acc[key] = c[key].toString('base64');
        }
        else acc[key] = c[key];
        return acc;
    }, {});
}
