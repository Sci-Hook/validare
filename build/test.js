"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var mongoose_1 = require("mongoose");
var express = require("express");
(0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test-db');
var schema = new mongoose_1.Schema({ username: String, armut: { elma: Number, sogan: String }, test: String });
var user = (0, mongoose_1.model)('Users', schema);
(0, index_1.loadValidatonRules)(['requiments.json', 'test.json']);
var app = express();
app.use(express.json());
app.use('/:schema', index_1.db.validate_exist(user, [{ name: 'test', key: 'username' }], { save: 'test' }), index_1.db.replace('locals:test', [{ name: 'new_name?', key: 'armut.elma' }]), function (req, res) {
    res.json(res.locals.test);
});
app.listen(80);
