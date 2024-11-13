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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.validate_numbers = validate_numbers;
var get_time_1 = require("../../../functions/get-time");
function get_date(data) {
    return new Promise(function (resolve, reject) {
        var date_data = data.split(' ')[1];
        var splitted = date_data.split(':');
        var time = Number(splitted[0]);
        var unit = splitted[1];
        var type = splitted[2];
        var date = (0, get_time_1.get_time)(time, unit);
        if (type == 'add') {
            resolve(Date.now() + date);
        }
        else if (type == 'minus') {
            resolve(Date.now() - date);
        }
    });
}
function validate_numbers(schema, value) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var max_length, min_length, length;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    max_length = schema.max_length;
                    min_length = schema.min_length;
                    length = schema.length;
                    if (!schema.max_length) return [3 /*break*/, 2];
                    if (!(typeof schema.max_length == 'string')) return [3 /*break*/, 2];
                    if (!schema.max_length.startsWith('date')) return [3 /*break*/, 2];
                    return [4 /*yield*/, get_date(schema.max_length)];
                case 1:
                    max_length = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!schema.min_length) return [3 /*break*/, 4];
                    if (!(typeof schema.min_length == 'string')) return [3 /*break*/, 4];
                    if (!schema.min_length.startsWith('date')) return [3 /*break*/, 4];
                    return [4 /*yield*/, get_date(schema.min_length)];
                case 3:
                    min_length = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!schema.length) return [3 /*break*/, 6];
                    if (!(typeof schema.length == 'string')) return [3 /*break*/, 6];
                    if (!schema.length.startsWith('date')) return [3 /*break*/, 6];
                    return [4 /*yield*/, get_date(schema.length)];
                case 5:
                    length = _a.sent();
                    _a.label = 6;
                case 6:
                    if (schema.type == "string-number") {
                        value = parseInt(value, schema.base);
                        if (Number.isNaN(value)) {
                            return [2 /*return*/, resolve('type')];
                        }
                    }
                    if (length) {
                        if (value !== length)
                            return [2 /*return*/, resolve('length')];
                    }
                    if (max_length) {
                        if (value > max_length)
                            return [2 /*return*/, resolve("max_length")];
                    }
                    if (min_length) {
                        if (value < min_length)
                            return [2 /*return*/, resolve('min_length')];
                    }
                    return [2 /*return*/, resolve('no_error')];
            }
        });
    }); });
}
