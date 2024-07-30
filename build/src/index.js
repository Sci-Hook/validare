"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID = exports.validator = exports.Schema = void 0;
exports.loadSchemas = loadSchemas;
var scihook_schema_loader_1 = require("scihook-schema-loader");
function loadSchemas(files) {
    (0, scihook_schema_loader_1.loadFiles)('validare', files);
}
//types
var schema_1 = require("./class/schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return schema_1.Schema; } });
var create_id_1 = require("./create-id");
Object.defineProperty(exports, "ID", { enumerable: true, get: function () { return create_id_1.create_id; } });
var validator_1 = require("./validator");
Object.defineProperty(exports, "validator", { enumerable: true, get: function () { return validator_1.validator; } });
