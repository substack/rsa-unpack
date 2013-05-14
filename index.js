var binary = require('bops');

module.exports = function (pem) {
    if (typeof pem !== 'string') pem = String(pem);
    var m = /^-----BEGIN RSA (PRIVATE|PUBLIC) KEY-----/.exec(pem);
    if (!m) return undefined;
    var type = m[1].toLowerCase();
    
    if (pem.split('\n').slice(-2)[0] !== '-----END RSA ' + m[1] + ' KEY-----') {
        return undefined;
    }
    
    var buf = binary.from(pem.split('\n').slice(1,-2).join(''), 'base64');
    var field = {};
    var size = {};
    var snd = binary.readUInt8(buf, 1);
    var offset = {
        private : snd & 0x80 ? snd - 0x80 + 5 : 7,
        public : snd & 0x80 ? snd - 0x80 + 2 : 2,
    }[type];
    
    function read () {
        var s = binary.readUInt8(buf, offset + 1);
        
        if (s & 0x80) {
            var n = s - 0x80;
            s = binary[[
                'readUInt8', 'readUInt16BE'
            ][n - 1]](buf, offset + 2);
            offset += n;
        }
        
        offset += 2;
        
        var b = binary.subarray(buf, offset, offset + s);
        offset += s;
        return b;
    }
    
    field.modulus = read();
    
    field.bits = (field.modulus.length - 1) * 8 + Math.ceil(
        Math.log(binary.readUInt8(field.modulus, 0) + 1) / Math.log(2)
    );
    field.publicExponent = parseInt(binary.to(read(), 'hex'), 16);
    
    if (type === 'private') {
        field.privateExponent = read();
        field.prime1 = read();
        field.prime2 = read();
        field.exponent1 = read();
        field.exponent2 = read();
        field.coefficient = read();
    }
    
    return field;
};
