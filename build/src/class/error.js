"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStatus = void 0;
var CreateStatus = /** @class */ (function () {
    function CreateStatus(error) {
        this.error = error;
        if (error == 'no_error') {
            this.status = true;
        }
        else {
            this.status = false;
        }
    }
    return CreateStatus;
}());
exports.CreateStatus = CreateStatus;
