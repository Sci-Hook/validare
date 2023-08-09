"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_phone = void 0;
var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
function validate_phone(value, options) {
    return new Promise(function (resolve, reject) {
        if (typeof value != 'string') {
            return resolve('invalid');
        }
        if (value.match(regex)) {
            return resolve('no_error');
        }
        else {
            return resolve('invalid');
        }
    });
}
exports.validate_phone = validate_phone;
