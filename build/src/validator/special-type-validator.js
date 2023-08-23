"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialTypeValidate = void 0;
var functions = {
    buffer: function (value) { return Buffer.isBuffer(value); },
    file: function (value) { return true; },
    any: function (value) { return true; },
    "string-number": function (value) {
        if (value == undefined || value == null)
            return false;
        var number = Number(value);
        if (Number.isNaN(number))
            return false;
        return true;
    }
};
function specialTypeValidate(type, value) {
    return new Promise(function (resolve, reject) {
        if (functions[type]) {
            resolve(functions[type](value));
        }
        else {
            resolve(true);
        }
    });
}
exports.specialTypeValidate = specialTypeValidate;
