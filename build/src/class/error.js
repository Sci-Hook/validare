"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status = /** @class */ (function () {
    function Status(error, name, reason, value) {
        var messages = global.validare.messages;
        if (messages && name) {
            if (messages[name]) {
                if (messages[name][error]) {
                    this.message = messages[name][error].replaceAll('#{value}', reason);
                }
                else {
                    if (messages[name]['$default']) {
                        this.message = messages[name]['$default'].replaceAll('#{value}', reason);
                    }
                }
            }
            if (!this.message) {
                if (messages['$default']) {
                    if (messages['$default'][error]) {
                        this.message = messages['$default'][error].replaceAll('#{value}', reason);
                    }
                }
            }
        }
        this.value = value;
        this.error = error;
        if (error == 'no_error') {
            this.status = true;
        }
        else {
            this.status = false;
        }
        this.reason = reason;
    }
    return Status;
}());
exports.Status = Status;
