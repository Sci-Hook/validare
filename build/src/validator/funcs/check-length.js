"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_length = void 0;
function check_length(schema, value) {
    return new Promise(function (resolve, reject) {
        if (schema.length) {
            if (value.length !== schema.length)
                resolve('length');
        }
        if (schema.max_length) {
            if (value.length > schema.max_length)
                resolve('max_length');
        }
        if (schema.min_length) {
            if (value.length < schema.min_length)
                resolve('min_length');
        }
        resolve('no_error');
    });
}
exports.check_length = check_length;
