"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_files_request = void 0;
function validate_files_request(values, options) {
    return function (req, res, next) {
        var value_keys;
        if (values.length === undefined) {
            value_keys = Object.keys(values);
        }
        else {
            value_keys = values;
        }
        value_keys.syncForEach(function (value, next_value) {
            console.log(value);
            next_value();
        });
    };
}
exports.validate_files_request = validate_files_request;
