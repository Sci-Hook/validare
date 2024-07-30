"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_requiments = get_requiments;
function get_requiments(schema) {
    return new Promise(function (resolve, reject) {
        if (typeof schema == 'string') {
            if (!global.validare) {
                resolve({ type: 'string', required: true });
            }
            if (!global.validare) {
                resolve({ type: 'string', required: true });
            }
            if (!global.validare[schema]) {
                resolve({ type: 'string', required: true });
            }
            else {
                resolve(global.validare[schema]);
            }
        }
        resolve(schema);
    });
}
