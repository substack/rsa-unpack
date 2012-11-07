var fs = require('fs');
var keys = require('./keys.json');

var unpack = require('../');
var rsa = unpack(keys.private);
console.dir(rsa);
