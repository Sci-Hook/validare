"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePNG = void 0;
function validatePNG(binary) {
    var hex = binary.toString('hex').toLocaleUpperCase();
    if (!hex.startsWith('89504E470D0A1A0A')) {
        return false;
    }
    return true;
}
exports.validatePNG = validatePNG;
