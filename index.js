module.exports = function (pem) {
    if (typeof pem !== 'string') pem = String(pem);
    if (!/^-----BEGIN RSA PRIVATE KEY-----/.test(pem)) {
        return undefined;
    }
    if (!/\n-----END RSA PRIVATE KEY-----\s*$/.test(pem)) {
        return undefined;
    }
    
    var buf = Buffer(pem.split('\n').slice(1,-2).join(''), 'base64');
    var field = {};
    var size = {};
    var offset = 7;
    
    function read () {
        var s = buf.readUInt8(offset + 1);
        
        if (s & 0x80) {
            offset ++;
            s = buf.readUInt8(offset + 1);
        }
        
        offset += 2;
        
        var b = buf.slice(offset, offset + s);
        offset += s;
        return b;
    }
    
    field.modulus = read();
    
    field.bits = (field.modulus.length - 1) * 8 + Math.ceil(
        Math.log(field.modulus[0] + 1) / Math.log(2)
    );
    
    field.publicExponent = parseInt(read().toString('hex'), 16);
    field.privateExponent = read();
    field.prime1 = read();
    field.prime2 = read();
    field.exponent1 = read();
    field.exponent2 = read();
    field.coefficient = read();
    
    return field;
};
