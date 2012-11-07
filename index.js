module.exports = function (pem) {
    var buf = Buffer(pem.split('\n').slice(1,-2).join(''), 'base64');
    var fields = {};
    
    var size = buf.readUInt8(8);
    fields.size = size;
    fields.modulus = buf.slice(9, size + 9);
    
    return fields;
};
