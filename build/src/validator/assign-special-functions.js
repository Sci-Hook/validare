"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign_special_functions = void 0;
var functions_1 = require("../../json/functions");
function assign_special_functions(requiments) {
    return new Promise(function (resolve, reject) {
        var keys = Object.keys(requiments);
        keys.syncFor(function (key, next_key) {
            if (functions_1.functions[requiments[key]]) {
                requiments[key] = functions_1.functions[requiments[key]]();
            }
            next_key();
        }, function () {
            resolve();
        });
    });
}
exports.assign_special_functions = assign_special_functions;
