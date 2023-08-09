"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.Schema = void 0;
var schema_1 = require("./class/schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return schema_1.Schema; } });
var middleware_1 = require("./modules/middleware");
Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return middleware_1.validate; } });
