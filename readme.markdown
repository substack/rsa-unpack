# rsa-unpack

unpack rsa fields from PEM strings

# example

```
$ rsa-json > keys.json
```

``` js
var fs = require('fs');
var keys = require('./keys.json');

var unpack = require('rsa-unpack');
var rsa = unpack(keys.private);
console.dir(rsa);
```
