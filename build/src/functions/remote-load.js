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
exports.validare_messages = void 0;
exports.remoteLoadFiles = remoteLoadFiles;
exports.get_remote_loaded_schemas = get_remote_loaded_schemas;
require("syncforeachloop");
var validare_schemas = {};
exports.validare_messages = {};
var load_finished = false;
function remoteLoadFiles() {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var map_meta, messages_meta, dist_schemas, dist_mesasges, schemas, messages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map_meta = document.querySelector('[name="validare-schemas"]');
                    messages_meta = document.querySelector('[name="messages"]');
                    dist_schemas = map_meta === null || map_meta === void 0 ? void 0 : map_meta.getAttribute('dist');
                    dist_mesasges = messages_meta === null || messages_meta === void 0 ? void 0 : messages_meta.getAttribute('dist');
                    schemas = JSON.parse("[".concat(map_meta === null || map_meta === void 0 ? void 0 : map_meta.getAttribute('schemas'), "]"));
                    messages = JSON.parse("[".concat(messages_meta === null || messages_meta === void 0 ? void 0 : messages_meta.getAttribute('schemas'), "]"));
                    if (!schemas) {
                        return [2 /*return*/, console.error('No any schema attached')];
                    }
                    return [4 /*yield*/, schemas.syncForEach(function (file, next) {
                            return __awaiter(this, void 0, void 0, function () {
                                var response, schemas;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, fetch("".concat(dist_schemas, "/").concat(file))];
                                        case 1:
                                            response = _a.sent();
                                            if (response.status != 200) {
                                                console.error("".concat(file, " is not accessable"));
                                                return [2 /*return*/, next()];
                                            }
                                            return [4 /*yield*/, response.json()];
                                        case 2:
                                            schemas = _a.sent();
                                            validare_schemas = Object.assign(validare_schemas, schemas);
                                            next();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, messages.syncForEach(function (message, next) {
                            return __awaiter(this, void 0, void 0, function () {
                                var response, schemas;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, fetch("".concat(dist_mesasges, "/").concat(message))];
                                        case 1:
                                            response = _a.sent();
                                            if (response.status != 200) {
                                                console.error("".concat(message, " is not accessable"));
                                                return [2 /*return*/, next()];
                                            }
                                            return [4 /*yield*/, response.json()];
                                        case 2:
                                            schemas = _a.sent();
                                            exports.validare_messages = Object.assign(exports.validare_messages, schemas);
                                            next();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                case 2:
                    _a.sent();
                    load_finished = true;
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
}
function get_remote_loaded_schemas() {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (load_finished) {
                        return [2 /*return*/, resolve(validare_schemas)];
                    }
                    return [4 /*yield*/, remoteLoadFiles()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, resolve(validare_schemas)];
            }
        });
    }); });
}
