module.exports = function (pem) {
    var buf = Buffer(pem.split('\n').slice(1,-2).join(''), 'base64');
    var field = {};
    var size = {};
    var offset;
    
    size.modulus = buf.readUInt8(8);
    offset = 9;
    field.modulus = buf.slice(offset, offset + size.modulus);
    offset += size.modulus;
    
    field.bits = (size.modulus - 1) * 8 + Math.ceil(
        Math.log(field.modulus[0]) / Math.log(2)
    );
    
    size.publicExponent = buf.readUInt8(offset + 1);
    offset += 2;
    
    field.publicExponent = parseInt(
        buf.slice(offset, offset + size.publicExponent).toString('hex'),
        16
    );
    
    return field;
};
