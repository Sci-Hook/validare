"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacer = void 0;
function replacer(new_datas, schema) {
    var new_data = schema;
    return new Promise(function (resolve, reject) {
        new_datas.syncForEach(function (data, next_data) {
            var _a;
            var keys;
            if (data.key) {
                keys = (_a = data.key) === null || _a === void 0 ? void 0 : _a.split('.');
            }
            else {
                keys = [data.name];
            }
            keys.syncForEach(function (key, next_key, index, length) {
                if (index != length) {
                    new_data = new_data[key];
                }
                else {
                    new_data[key] = data.value;
                }
                next_key();
            }, next_data);
        }, function () {
            resolve();
        });
    });
}
exports.replacer = replacer;
