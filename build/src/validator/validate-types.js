"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_types = void 0;
require("syncforeachloop");
var schema_1 = require("../types/schema");
var special_type_validator_1 = require("./special-type-validator");
function validate_types(value, types) {
    return new Promise(function (resolve, reject) {
        types.syncForEach(function (type, next_type) {
            if (schema_1.special_types.indexOf(type) != -1) {
                (0, special_type_validator_1.specialTypeValidate)(type, value);
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
