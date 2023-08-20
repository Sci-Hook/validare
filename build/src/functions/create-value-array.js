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
exports.create_value_array = void 0;
var get_value_1 = require("./get-value");
var get_name_1 = require("./get-name");
var get_file_1 = require("./get-file");
function create_value_array(req, res, values, options, type) {
    var array_values;
    var value_array = [];
    if (values.length !== undefined) {
        array_values = values;
    }
    return new Promise(function (resolve, reject) {
        array_values.syncForEach(function (arr_value, next_value) {
            return __awaiter(this, void 0, void 0, function () {
                var value, name, schema;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(type == 'value' || !type)) return [3 /*break*/, 7];
                            if (!(typeof arr_value == 'string')) return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, get_value_1.get_value)(req, res, arr_value)];
                        case 1:
                            value = _a.sent();
                            return [4 /*yield*/, (0, get_name_1.get_name)(arr_value)];
                        case 2:
                            name = _a.sent();
                            return [3 /*break*/, 6];
                        case 3: return [4 /*yield*/, (0, get_value_1.get_value)(req, res, arr_value.name)];
                        case 4:
                            value = _a.sent();
                            return [4 /*yield*/, (0, get_name_1.get_name)(arr_value.name)];
                        case 5:
                            name = _a.sent();
                            _a.label = 6;
                        case 6: return [3 /*break*/, 11];
                        case 7:
                            if (!(typeof arr_value == 'string')) return [3 /*break*/, 9];
                            return [4 /*yield*/, (0, get_file_1.get_file)(req, res, arr_value)];
                        case 8:
                            value = _a.sent();
                            name = arr_value;
                            return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, (0, get_file_1.get_file)(req, res, arr_value.name)];
                        case 10:
                            value = _a.sent();
                            name = arr_value.name;
                            _a.label = 11;
                        case 11:
                            if (typeof arr_value == 'object') {
                                if (arr_value.allow_undefined) {
                                    if (value === undefined) {
                                        return [2 /*return*/, next_value()];
                                    }
                                }
                                if (arr_value.allow_null) {
                                    if (value === null) {
                                        return [2 /*return*/, next_value()];
                                    }
                                }
                                if (arr_value.allow_empty) {
                                    if (value === '') {
                                        return [2 /*return*/, next_value()];
                                    }
                                }
                            }
                            if (options) {
                                if (options === null || options === void 0 ? void 0 : options.allow_undefined) {
                                    if (value === undefined) {
                                        if (typeof arr_value == 'object') {
                                            if (arr_value.allow_undefined !== false) {
                                                return [2 /*return*/, next_value()];
                                            }
                                        }
                                        else {
                                            return [2 /*return*/, next_value()];
                                        }
                                    }
                                }
                                if (options === null || options === void 0 ? void 0 : options.allow_null) {
                                    if (value === null) {
                                        if (typeof arr_value == 'object') {
                                            if (arr_value.allow_null !== false) {
                                                return [2 /*return*/, next_value()];
                                            }
                                        }
                                        else {
                                            return [2 /*return*/, next_value()];
                                        }
                                    }
                                }
                                if (options === null || options === void 0 ? void 0 : options.allow_empty) {
                                    if (value === '') {
                                        if (typeof arr_value == 'object') {
                                            if (arr_value.allow_empty !== false) {
                                                return [2 /*return*/, next_value()];
                                            }
                                        }
                                        else {
                                            return [2 /*return*/, next_value()];
                                        }
                                    }
                                }
                            }
                            if (typeof arr_value === 'string') {
                                schema = global.validare.requiments[arr_value];
                            }
                            else {
                                schema = arr_value.schema.schema;
                            }
                            value_array.push({ name: name, value: value, schema: schema });
                            next_value();
                            return [2 /*return*/];
                    }
                });
            });
        }, function () {
            resolve(value_array);
        });
    });
}
exports.create_value_array = create_value_array;
