module.exports = function (pem) {
    var buf = Buffer(pem.split('\n').slice(1,-2).join(''), 'base64');
    var field = {};
    var size = {};
    
    size.modulus = buf.readUInt8(8);
    field.modulus = buf.slice(9, size.modulus + 9);
    
    field.bits = (size.modulus - 1) * 8 + Math.ceil(
        Math.log(field.modulus[0]) / Math.log(2)
    );
    
    return field;
};
