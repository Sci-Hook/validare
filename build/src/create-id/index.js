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
exports.create_id = create_id;
var remote_load_1 = require("../functions/remote-load");
var presets_1 = require("./presets");
var presets_characters_keys = Object.keys(presets_1.presets_characters);
function makeid(length, characters) {
    if (!length) {
        length = 8;
    }
    var result = '';
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
function create_id(schema) {
    return __awaiter(this, void 0, void 0, function () {
        var id_schema, loaded_validation_schemas, len, chars, created_characters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_schema = { chars: 'standart', length: 8 };
                    if (!(typeof window != 'undefined')) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, remote_load_1.get_remote_loaded_schemas)()];
                case 1:
                    loaded_validation_schemas = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    loaded_validation_schemas = global.validare;
                    _a.label = 3;
                case 3:
                    if (typeof schema == 'string') {
                        if (loaded_validation_schemas) {
                            if (loaded_validation_schemas[schema]) {
                                len = loaded_validation_schemas[schema].length;
                                chars = loaded_validation_schemas[schema].chars;
                                id_schema = { length: len, chars: chars };
                            }
                        }
                    }
                    else if (typeof schema == 'object') {
                        if (schema.type == 'string') {
                            if (typeof schema.length == 'number') {
                                id_schema = { length: schema.length, chars: schema.chars };
                            }
                        }
                    }
                    created_characters = '';
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (id_schema.chars) {
                                var chars = id_schema.chars;
                                presets_characters_keys.syncForEach(function name(preset_name, next_preset) {
                                    var _a;
                                    if (((_a = id_schema.chars) === null || _a === void 0 ? void 0 : _a.indexOf(preset_name)) != -1) {
                                        if (id_schema.chars) {
                                            chars = chars.replace(preset_name, "");
                                        }
                                        created_characters = created_characters + presets_1.presets_characters[preset_name];
                                    }
                                    next_preset();
                                }, function () {
                                    created_characters = created_characters + chars;
                                    var id = makeid(id_schema.length, created_characters);
                                    resolve(id);
                                });
                            }
                            else {
                                var id = makeid(id_schema.length, presets_1.presets_characters.all);
                                resolve(id);
                            }
                        })];
            }
        });
    });
}
