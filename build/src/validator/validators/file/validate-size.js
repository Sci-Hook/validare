"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_size = void 0;
var values = {
    bit: {
        bit: Math.pow(2, 0) / 8,
        kib: Math.pow(2, 10) / 8,
        mib: Math.pow(2, 20) / 8,
        gib: Math.pow(2, 30) / 8,
        tib: Math.pow(2, 40) / 8
    },
    byte: {
        byte: Math.pow(2, 0),
        kb: Math.pow(2, 10),
        mb: Math.pow(2, 20),
        gb: Math.pow(2, 30),
        tb: Math.pow(2, 40)
    }
};
function validate_size(schema, value) {
    return new Promise(function (resolve, reject) {
        var min_size;
        var max_size;
        if (schema.min_size) {
            if (values.byte[schema.min_size.size_type])
                min_size = schema.min_size.size * values.byte[schema.min_size.size_type];
            if (values.bit[schema.min_size.size_type])
                min_size = schema.min_size.size * values.bit[schema.min_size.size_type];
        }
        if (schema.max_size) {
            if (values.byte[schema.max_size.size_type])
                max_size = schema.max_size.size * values.byte[schema.max_size.size_type];
            if (values.bit[schema.max_size.size_type])
                max_size = schema.max_size.size * values.bit[schema.max_size.size_type];
        }
        var size = Buffer.byteLength(value);
        if (size > max_size) {
            return resolve('max_size');
        }
        if (size < min_size) {
            return resolve('max_size');
        }
        return resolve('no_error');
    });
}
exports.validate_size = validate_size;
