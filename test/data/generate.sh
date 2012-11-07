#!/bin/bash

# npm install -g rsa-json first

rsa-json > keys.json
openssl rsa \
    -in <(node -e "console.log(require('./keys.json').private)") \
    -noout -text \
    > keys.txt
