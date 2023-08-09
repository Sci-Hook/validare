"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_ip = void 0;
var regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
function validate_ip(value, options) {
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
exports.validate_ip = validate_ip;
