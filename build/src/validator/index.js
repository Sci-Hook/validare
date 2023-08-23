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
exports.validator = void 0;
var validate_email_1 = require("./special/validate-email");
var validate_url_1 = require("./special/validate-url");
var validate_ip_1 = require("./special/validate-ip");
var validate_phone_1 = require("./special/validate-phone");
var validate_types_1 = require("./validate-types");
var validate_values_1 = require("./validate-values");
var error_1 = require("../class/error");
var get_requiments_1 = require("../functions/get-requiments");
var validate_size_1 = require("./buffer/validate-size");
var validate_mime_extension_1 = require("./buffer/validate-mime-extension");
var special_controolers = {
    email: validate_email_1.validate_email,
    url: validate_url_1.validate_url,
    ip: validate_ip_1.validate_ip,
    phone: validate_phone_1.validate_phone
};
var special_types = [
    'any',
    'file',
    'buffer'
];
function validator(schema, value) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var status_1, status_2, status_3, reason, status_4, reason, status_5, length, splitted, flag, pattern, regex;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, get_requiments_1.get_requiments)(schema)];
                            case 1:
                                schema = _a.sent();
                                // Required validation
                                if (schema.required) {
                                    if (value === undefined)
                                        return [2 /*return*/, resolve(new error_1.Status('undefined', schema.required))];
                                    if (value === null)
                                        return [2 /*return*/, resolve(new error_1.Status('null', schema.required))];
                                }
                                if (!schema.values) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, validate_values_1.validate_values)(value, schema.values)];
                            case 2:
                                status_1 = _a.sent();
                                if (status_1) {
                                    return [2 /*return*/, resolve(new error_1.Status('no_error', schema.values))];
                                }
                                else {
                                    return [2 /*return*/, resolve(new error_1.Status('values', schema.values))];
                                }
                                ;
                                _a.label = 3;
                            case 3:
                                // Accpeted values validation
                                // Empty string validation
                                if (schema.ignore_empty) {
                                    if (value === '')
                                        return [2 /*return*/, resolve(new error_1.Status('empty', schema.ignore_empty))];
                                }
                                if (!schema.type) return [3 /*break*/, 5];
                                if (typeof schema.type == 'string') {
                                    if (typeof value != schema.type && special_types.indexOf(schema.type) == -1) {
                                        return [2 /*return*/, resolve(new error_1.Status('type', schema.type))];
                                    }
                                    if (schema.type == 'buffer') {
                                        if (!Buffer.isBuffer(value))
                                            return [2 /*return*/, resolve(new error_1.Status('type', schema.type))];
                                    }
                                }
                                if (!(typeof schema.type == 'object')) return [3 /*break*/, 5];
                                return [4 /*yield*/, (0, validate_types_1.validate_types)(value, schema.type)];
                            case 4:
                                status_2 = _a.sent();
                                if (!status_2)
                                    return [2 /*return*/, resolve(new error_1.Status('type', schema.type))];
                                _a.label = 5;
                            case 5:
                                if (!(schema.type == 'file' || schema.type == 'buffer' || schema.type == 'string')) return [3 /*break*/, 7];
                                if (!(schema.max_size || schema.min_size)) return [3 /*break*/, 7];
                                return [4 /*yield*/, (0, validate_size_1.validate_size)(schema, value)];
                            case 6:
                                status_3 = _a.sent();
                                if (status_3 != 'no_error') {
                                    reason = void 0;
                                    if (status_3 == 'max_size') {
                                        reason = schema.max_size;
                                    }
                                    ;
                                    if (status_3 == 'min_size') {
                                        reason = schema.min_size;
                                    }
                                    ;
                                    return [2 /*return*/, resolve(new error_1.Status(status_3, reason))];
                                }
                                _a.label = 7;
                            case 7:
                                if (!(schema.type == 'file' || schema.type == 'buffer')) return [3 /*break*/, 10];
                                if (!(schema.mime || schema.extension)) return [3 /*break*/, 9];
                                return [4 /*yield*/, (0, validate_mime_extension_1.validate_mime_extension)(schema, value)];
                            case 8:
                                status_4 = _a.sent();
                                if (status_4 != 'no_error') {
                                    reason = void 0;
                                    if (status_4 == 'extension') {
                                        reason = schema.extension;
                                    }
                                    if (status_4 == 'mime') {
                                        reason = schema.mime;
                                    }
                                    return [2 /*return*/, resolve(new error_1.Status(status_4, reason))];
                                }
                                _a.label = 9;
                            case 9: return [2 /*return*/, resolve(new error_1.Status('no_error'))];
                            case 10:
                                if (!schema.special_controllers) return [3 /*break*/, 12];
                                return [4 /*yield*/, special_controolers[schema.special_controllers.type](value, schema.special_controllers.options)];
                            case 11:
                                status_5 = _a.sent();
                                if (status_5 != 'no_error')
                                    return [2 /*return*/, resolve(new error_1.Status(status_5))];
                                _a.label = 12;
                            case 12:
                                if (typeof value == 'number')
                                    length = value;
                                if (typeof value == 'string')
                                    length = value.length;
                                if (schema.length) {
                                    if (length != schema.length)
                                        return [2 /*return*/, resolve(new error_1.Status('length', schema.length))];
                                }
                                if (schema.min_length) {
                                    if (length < schema.min_length)
                                        return [2 /*return*/, resolve(new error_1.Status('min_length', schema.min_length))];
                                }
                                if (schema.max_length) {
                                    if (length > schema.max_length)
                                        return [2 /*return*/, resolve(new error_1.Status('max_length', schema.max_length))];
                                }
                                // length validations
                                if (schema.regex) {
                                    if (typeof value == 'string') {
                                        if (typeof schema.regex == 'string') {
                                            splitted = schema.regex.split('/');
                                            flag = schema.regex.split('/')[splitted.length - 1];
                                            pattern = schema.regex.replace(flag, '');
                                            pattern = pattern.slice(1, -1);
                                            try {
                                                regex = new RegExp(pattern, flag);
                                                if (!value.match(regex))
                                                    return [2 /*return*/, resolve(new error_1.Status('regex', schema.regex))];
                                            }
                                            catch (error) {
                                                console.log("Invalid regex", schema);
                                                console.log(error);
                                            }
                                        }
                                        else {
                                            if (!value.match(schema.regex))
                                                return [2 /*return*/, resolve(new error_1.Status('regex', schema.regex))];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, resolve(new error_1.Status('regex', schema.regex))];
                                    }
                                }
                                return [2 /*return*/, resolve(new error_1.Status('no_error'))]; // no error
                        }
                    });
                }); })];
        });
    });
}
exports.validator = validator;
