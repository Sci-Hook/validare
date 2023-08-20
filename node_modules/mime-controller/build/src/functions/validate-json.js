"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJSON = void 0;
function validateJSON(data) {
    try {
        var data = JSON.parse(data);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.validateJSON = validateJSON;
