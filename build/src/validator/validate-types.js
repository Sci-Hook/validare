"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_types = void 0;
require("syncforeachloop");
var special_types = ['buffer', 'file'];
function validate_types(value, types) {
    return new Promise(function (resolve, reject) {
        types.syncForEach(function (type, next_type) {
            if (special_types.indexOf(type) != -1) {
                if (type == 'buffer') {
                    if (Buffer.isBuffer(value)) {
                        resolve(true);
                    }
                    else {
                        next_type();
                    }
                }
                else {
                    next_type();
                }
            }
            else {
                if (typeof value == type) {
                    resolve(true);
                }
                else {
                    next_type();
                }
            }
        }, function () {
            resolve(false);
        });
    });
}
exports.validate_types = validate_types;
