"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status = /** @class */ (function () {
    function Status(error, reason, value) {
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
