"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status = /** @class */ (function () {
    function Status(error, reason) {
        this.error = error;
        if (error == 'no_error') {
            this.status = true;
        }
        else {
            this.status = false;
        }
        this.reason = reason;
    }
    Status.prototype.get_error = function (res, name) {
        if (res.locals.i18n) {
            if (res.locals.i18n.validation) {
                if (res.locals.i18n.validation[name]) {
                    if (res.locals.i18n.validation[name][this.error]) {
                        var error = res.locals.i18n.validation[name][this.error];
                        error = error.replace('{this}', this.reason);
                        return error;
                    }
                }
            }
        }
    };
    return Status;
}());
exports.Status = Status;
