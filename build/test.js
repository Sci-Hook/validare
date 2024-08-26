"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./index");
(0, index_1.loadSchemas)('test.json');
var app = express();
app.use(express.json());
app.post('/', (0, index_1.validateFields)(['body.username?', 'body.password'], function (err, req, res) {
    res.json(err);
}));
app.listen(5000);
