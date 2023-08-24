"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasher = exports.validate_url = exports.validate_phone = exports.validate_ip = exports.validate_email = exports.ID = exports.validator = exports.loadSchemas = exports.Schema = void 0;
var scihook_schema_loader_1 = require("scihook-schema-loader");
function loadSchemas(files) { (0, scihook_schema_loader_1.loadFiles)('validare', files); }
exports.loadSchemas = loadSchemas;
//types
var create_hash_1 = require("./create-hash");
Object.defineProperty(exports, "hasher", { enumerable: true, get: function () { return create_hash_1.hasher; } });
var schema_1 = require("./class/schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return schema_1.Schema; } });
var create_id_1 = require("./create-id");
Object.defineProperty(exports, "ID", { enumerable: true, get: function () { return create_id_1.create_id; } });
var validator_1 = require("./validator");
Object.defineProperty(exports, "validator", { enumerable: true, get: function () { return validator_1.validator; } });
var validate_email_1 = require("./validator/special/validate-email");
Object.defineProperty(exports, "validate_email", { enumerable: true, get: function () { return validate_email_1.validate_email; } });
var validate_ip_1 = require("./validator/special/validate-ip");
Object.defineProperty(exports, "validate_ip", { enumerable: true, get: function () { return validate_ip_1.validate_ip; } });
var validate_phone_1 = require("./validator/special/validate-phone");
Object.defineProperty(exports, "validate_phone", { enumerable: true, get: function () { return validate_phone_1.validate_phone; } });
var validate_url_1 = require("./validator/special/validate-url");
Object.defineProperty(exports, "validate_url", { enumerable: true, get: function () { return validate_url_1.validate_url; } });
