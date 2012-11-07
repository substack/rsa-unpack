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
    offset += size.publicExponent;
    
    size.privateExponent = buf.readUInt8(offset + 1);
    offset += 2;
    
    field.privateExponent = buf.slice(offset, offset + size.privateExponent);
    offset += size.privateExponent;
    
    size.prime1 = buf.readUInt8(offset + 1);
    offset += 2;
    
    field.prime1 = buf.slice(offset, offset + size.prime1);
    offset += size.prime1;
    
    size.prime2 = buf.readUInt8(offset + 1);
    offset += 2;
    
    field.prime2 = buf.slice(offset, offset + size.prime2);
    offset += size.prime2;
    
    size.exponent1 = buf.readUInt8(offset + 1);
    offset += 2;
    
    field.exponent1 = buf.slice(offset, offset + size.exponent1);
    offset += size.exponent1;
    
    size.exponent2 = buf.readUInt8(offset + 1);
    offset += 2;
    
    field.exponent2 = buf.slice(offset, offset + size.exponent2);
    offset += size.exponent2;
    
    size.coefficient = buf.readUInt8(offset + 1);
    offset += 2;
    
    field.coefficient = buf.slice(offset, offset + size.coefficient);
    offset += size.coefficient;
    
    return field;
};
