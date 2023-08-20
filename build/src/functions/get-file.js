"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_file = void 0;
function get_file(req, res, file) {
    return new Promise(function (resolve, reject) {
        var _a;
        if (req.files) {
            if (((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) === undefined) {
                if (req.files[file]) {
                    return resolve(req.files[file]);
                }
                else {
                    return resolve(undefined);
                }
            }
            else {
                if (req.files) {
                    return resolve(req.files);
                }
            }
        }
        if (req.file) {
            return resolve([req.file]);
        }
    });
}
exports.get_file = get_file;
