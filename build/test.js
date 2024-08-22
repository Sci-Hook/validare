"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var index_1 = require("./index");
(0, index_1.loadSchemas)(['test.json']);
var app = express();
var upload = multer();
app.post('/', upload.single('image'), (0, index_1.validateFile)('image', function (a, b, c) { c.json(a); }), function (req, res, next) {
    res.json('ok');
});
app.listen(8000);
