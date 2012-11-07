#!/bin/bash

# npm install -g rsa-json first

rsa-json > keys$1.json

openssl rsa \
    -in <(node -e "console.log(require('./keys$1.json').private)") \
    -noout -text \
    > keys$1.txt

node parse.js > expected$1.json
