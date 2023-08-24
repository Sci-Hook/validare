"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_requiments = void 0;
function get_requiments(schema) {
    return new Promise(function (resolve, reject) {
        if (typeof schema == 'string') {
            if (!global.validare) {
                resolve({ required: true });
            }
            if (!global.validare) {
                resolve({ required: true });
            }
            if (!global.validare[schema]) {
                resolve({ required: true });
            }
            else {
                resolve(global.validare[schema]);
            }
        }
        resolve(schema);
    });
}
exports.get_requiments = get_requiments;
