"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJPEG = void 0;
function validateJPEG(binary) {
    var hex = binary.toString('hex').toLocaleUpperCase();
    if (!hex.startsWith('FFD8')) {
        return false;
    }
    if (!hex.endsWith('FFD9')) {
        return false;
    }
    if (hex.indexOf('4A46494600') == -1) {
        return false;
    }
    return true;
}
exports.validateJPEG = validateJPEG;
