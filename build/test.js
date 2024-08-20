"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./index");
(0, index_1.loadSchemas)(['requiments.json', 'test.json']);
var app = express();
app.use(express.json());
app.post('/', (0, index_1.validateSwitch)('body.test', {
    'armut': ['password'],
    'kebap': ['username'],
    'default': ['username', 'password']
}, function (test, req, res) { return res.json(test); }), function () { });
app.listen(8000);
