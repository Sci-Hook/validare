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
exports.validate_request = void 0;
var create_value_array_1 = require("../functions/create-value-array");
var validator_1 = require("../validator");
var response_schema_1 = require("response-schema");
function validate_request(values, options) {
    var _this = this;
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var value_array, invalid_values;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_value_array_1.create_value_array)(req, res, values, options)];
                case 1:
                    value_array = _a.sent();
                    invalid_values = [];
                    value_array.syncForEach(function (value, next_value) {
                        return __awaiter(this, void 0, void 0, function () {
                            var result, msg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, validator_1.validator)(value.schema, value.value)];
                                    case 1:
                                        result = _a.sent();
                                        msg = result.get_error(res, value.name);
                                        if (!result.status) {
                                            invalid_values.push({
                                                data_name: value.name,
                                                error: result.error,
                                                msg: msg,
                                                reason: result.reason
                                            });
                                        }
                                        next_value();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }, function () {
                        if (invalid_values.length == 0) {
                            next();
                        }
                        else {
                            (0, response_schema_1.response)(res, {
                                code: 400,
                                data: invalid_values,
                                msg: 'invalid_values'
                            });
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); };
}
exports.validate_request = validate_request;
