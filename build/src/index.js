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
exports.validate_inner_keys = exports.validate_element = exports.validateFile = exports.validateSwitch = exports.validateFields = exports.ID = exports.validator = exports.Schema = void 0;
exports.loadSchemas = loadSchemas;
var scihook_schema_loader_1 = require("scihook-schema-loader");
require("syncforeachloop");
function loadSchemas(files) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, scihook_schema_loader_1.loadFiles)('validare', files);
            return [2 /*return*/];
        });
    });
}
//types
var schema_1 = require("./class/schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return schema_1.Schema; } });
var create_id_1 = require("./create-id");
Object.defineProperty(exports, "ID", { enumerable: true, get: function () { return create_id_1.create_id; } });
var validator_1 = require("./validator");
Object.defineProperty(exports, "validator", { enumerable: true, get: function () { return validator_1.validator; } });
var validate_fields_1 = require("./express-middlewares/validate-fields");
Object.defineProperty(exports, "validateFields", { enumerable: true, get: function () { return validate_fields_1.validateFields; } });
var validate_switch_1 = require("./express-middlewares/validate-switch");
Object.defineProperty(exports, "validateSwitch", { enumerable: true, get: function () { return validate_switch_1.validateSwitch; } });
var validate_file_1 = require("./express-middlewares/validate-file");
Object.defineProperty(exports, "validateFile", { enumerable: true, get: function () { return validate_file_1.validateFile; } });
var validator_inputs_1 = require("./functions/validator-inputs");
Object.defineProperty(exports, "validate_element", { enumerable: true, get: function () { return validator_inputs_1.validate_element; } });
var validate_inner_keys_1 = require("./functions/validate-inner-keys");
Object.defineProperty(exports, "validate_inner_keys", { enumerable: true, get: function () { return validate_inner_keys_1.validate_inner_keys; } });
require("./functions/validator-inputs");
