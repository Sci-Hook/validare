"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_values = void 0;
require("syncforeachloop");
function validate_values(value, accepted_values) {
    return new Promise(function (resolve, reject) {
        accepted_values.syncForEach(function (accepted_value, next_accepted_value) {
            if (value == accepted_value) {
                resolve(true);
            }
            else {
                next_accepted_value();
            }
        }, function () {
            resolve(false);
        });
    });
}
exports.validate_values = validate_values;
