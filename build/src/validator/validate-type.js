"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.special_types = exports.validate_type = void 0;
var validate_email_1 = require("./validate-email");
var validate_url_1 = require("./validate-url");
var regexs_1 = require("../../json/regexs");
var special_types = ["email", "phone", "ip", "url"];
exports.special_types = special_types;
function validate_type(regex, value, requiments) {
    return new Promise(function (resolve, reject) {
        if (regex == 'email')
            return resolve((0, validate_email_1.validate_email)(value, requiments.services));
        if (regex == 'url')
            return resolve((0, validate_url_1.validate_url)(value, requiments.protocols, requiments.ports, requiments.hostnames));
        var regex_expression = new RegExp(regexs_1.regex_expressions[regex], 'g');
        if (value.match(regex_expression)) {
            resolve('invalid');
        }
        else {
            resolve('no_error');
        }
    });
}
exports.validate_type = validate_type;
