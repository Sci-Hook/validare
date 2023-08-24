"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasher = void 0;
var crypto_1 = require("crypto");
function hasher(value, alogrithm, key) {
    return new Promise(function (resolve, reject) {
        var hash = (0, crypto_1.createHmac)(alogrithm, key).update(value).digest('hex');
        resolve(hash);
    });
}
exports.hasher = hasher;
