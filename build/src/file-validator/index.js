"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_file = void 0;
var mime_controller_1 = require("mime-controller");
var error_1 = require("../class/error");
var values = {
    bit: {
        bit: Math.pow(2, 0) / 8,
        kib: Math.pow(2, 10) / 8,
        mib: Math.pow(2, 20) / 8,
        gib: Math.pow(2, 30) / 8,
        tib: Math.pow(2, 40) / 8
    },
    byte: {
        byte: Math.pow(2, 0),
        kb: Math.pow(2, 10),
        mb: Math.pow(2, 20),
        gb: Math.pow(2, 30),
        tb: Math.pow(2, 40)
    }
};
function validate_file(schema, value) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var result;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!Buffer.isBuffer(value)) {
                        return [2 /*return*/, resolve(new error_1.Status('is_not_buffer', 'buffer'))];
                    }
                    if (!(schema.extension || schema.mime)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, mime_controller_1.findMime)(value)];
                case 1:
                    result = _c.sent();
                    if (!result.extension) {
                        return [2 /*return*/, resolve(new error_1.Status('extension', schema.extension))];
                    }
                    if (!result.mime) {
                        return [2 /*return*/, resolve(new error_1.Status('extension', schema.mime))];
                    }
                    if (typeof schema.extension == 'string') {
                        if (result.extension != schema.extension) {
                            return [2 /*return*/, resolve(new error_1.Status('extension', schema.extension))];
                        }
                    }
                    else {
                        if (((_a = schema.extension) === null || _a === void 0 ? void 0 : _a.indexOf(result.extension)) == -1) {
                            return [2 /*return*/, resolve(new error_1.Status('extension', schema.extension))];
                        }
                    }
                    if (typeof schema.mime == 'string') {
                        if (result.mime != schema.mime) {
                            return [2 /*return*/, resolve(new error_1.Status('mime', schema.mime))];
                        }
                    }
                    else {
                        if (((_b = schema.mime) === null || _b === void 0 ? void 0 : _b.indexOf(result.mime)) == -1) {
                            return [2 /*return*/, resolve(new error_1.Status('mime', schema.mime))];
                        }
                    }
                    _c.label = 2;
                case 2: return [2 /*return*/, resolve(new error_1.Status('no_error'))];
            }
        });
    }); });
}
exports.validate_file = validate_file;
