var binary = require('bops');
var test = require('tape');
var expected = [
    require('./data/expected0.json'),
    require('./data/expected1.json'),
    require('./data/expected2.json'),
    require('./data/expected3.json'),
];
var keys = [
    require('./data/keys0.json'),
    require('./data/keys1.json'),
    require('./data/keys2.json'),
    require('./data/keys3.json'),
];
var unpack = require('../');

test('output matches openssl rsa -text', function (t) {
    t.plan(keys.length * 4);
    
    keys.forEach(function (key, ix) {
        var priv = unpack(key.private);
        var pub = unpack(key.public);
        t.same(unbuffer(priv), expected[ix]);
        t.same(binary.to(pub.modulus, 'base64'), binary.to(priv.modulus, 'base64'));
        t.same(pub.bits, priv.bits);
        t.same(pub.publicExponent, priv.publicExponent);
    });
    t.end();
});

test('invalid pem data returns undefined', function (t) {
    t.equal(unpack('blah'), undefined);
    t.end();
});

function unbuffer (c) {
    return Object.keys(c).reduce(function (acc, key) {
        if (binary.is(c[key])) {
            acc[key] = binary.to(c[key], 'base64');
        }
        else acc[key] = c[key];
        return acc;
    }, {});
}
