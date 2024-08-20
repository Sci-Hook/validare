"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./index");
var validate_fields_1 = require("./src/express-middlewares/validate-fields");
(0, index_1.loadSchemas)(['requiments.json', 'test.json']);
var app = express();
app.use(express.json());
app.post('/', (0, validate_fields_1.validateFields)([{ dataname: 'body.a', schema: 'password' }], function (test) {
    console.log(test);
}), function (req, res, next) {
});
app.listen(8080);
