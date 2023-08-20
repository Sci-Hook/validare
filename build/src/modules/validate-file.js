"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_files_request = void 0;
function validate_files_request(values, options) {
    return function (req, res, next) {
        console.log(req.files);
        next();
    };
}
exports.validate_files_request = validate_files_request;
