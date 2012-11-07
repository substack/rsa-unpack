# rsa-unpack

unpack rsa fields from PEM strings

# example

``` js
var fs = require('fs');
var key = fs.readFileSync(__dirname + '/private.pem');

var unpack = require('rsa-unpack');
var rsa = unpack(key);
console.dir(rsa);
```
