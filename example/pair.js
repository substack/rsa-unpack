var fs = require('fs');
var keys = require('./keys.json');

var unpack = require('../');
console.dir({
    private : unpack(keys.private),
    public : unpack(keys.public),
});
