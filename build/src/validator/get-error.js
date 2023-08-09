"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_error = void 0;
function get_error(error_result, validation_errors, requiments, lang, key) {
    return new Promise(function (resolve, reject) {
        var error = '';
        var reason;
        if (!error_result.status) {
            var message = error_result.message;
            var type = requiments.type;
            if (validation_errors.type) {
                if (validation_errors.type[type]) {
                    if (validation_errors.type[type][message]) {
                        error = validation_errors.type[type][message];
                    }
                }
            }
            if (validation_errors.value) {
                if (validation_errors.value[key]) {
                    if (validation_errors.value[key][message]) {
                        error = validation_errors.value[key][message];
                    }
                }
            }
            if (!error) {
                if (validation_errors['*']) {
                    error = validation_errors['*'][message];
                }
            }
            if (!error) {
                error = validation_errors['unkown'];
            }
            var display_name;
            if (requiments.display_name) {
                display_name = requiments.display_name;
                if (typeof display_name == 'object') {
                    display_name = display_name[lang];
                }
                else {
                    display_name = display_name;
                }
            }
            else {
                var display_name = key;
            }
            error = error.replace("{name}", display_name);
            error = error.replace("{this}", requiments[error_result.message]);
            error = error.charAt(0).toUpperCase() + error.slice(1);
            reason = requiments[error_result.message];
        }
        resolve({ error: error, reason: reason });
    });
}
exports.get_error = get_error;
