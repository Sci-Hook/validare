"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_magic = void 0;
function check_magic(numbers, data_hex) {
    return new Promise(function (resolve, reject) {
        numbers.syncForEach(function (magic_number, magic_number_next) {
            var regex = new RegExp(magic_number);
            if (data_hex.match(regex)) {
                return resolve(true);
            }
            magic_number_next();
        }, function () {
            resolve(false);
        });
    });
}
exports.check_magic = check_magic;
