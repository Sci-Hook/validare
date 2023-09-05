"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_email = void 0;
var regex = '^[\\w-\\.]+@(?<service>[\\w-]+\\.+[\\w-]{2,4}$)';
function validate_email(email, services) {
    return new Promise(function (resolve, reject) {
        if (typeof email != 'string') {
            resolve('invalid');
            return;
        }
        var email_regex = new RegExp(regex, 'g').exec(email);
        if (email_regex) {
            if (email_regex.groups) {
                var service = email_regex.groups.service;
                if (services) {
                    if (services.indexOf(service) != -1) {
                        resolve('no_error');
                    }
                    else {
                        resolve('services');
                    }
                }
                else {
                    resolve('no_error');
                }
            }
        }
        else {
            resolve('invalid');
        }
    });
}
exports.validate_email = validate_email;
