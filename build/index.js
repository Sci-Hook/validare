"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expess = require("express");
var app = expess();
app.use(expess.json());
app.use('/', function (req, res) {
    res.json(res.locals.invalid_values);
});
app.listen(80);
