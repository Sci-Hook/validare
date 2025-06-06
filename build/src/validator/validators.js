"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validators = void 0;
var only_type_1 = require("./validators/only-type");
var number_1 = require("./validators/number");
var string_1 = require("./validators/string");
var length_1 = require("./validators/length");
var email_1 = require("./validators/email");
var ip_1 = require("./validators/ip");
var phone_1 = require("./validators/phone");
var url_1 = require("./validators/url");
var file_1 = require("./validators/file");
var values_1 = require("./validators/values");
var check_case_1 = require("./validators/check-case");
var check_ignored_1 = require("./validators/check-ignored");
var array_1 = require("./validators/array");
var base64_1 = require("./validators/base64");
var doi_1 = require("./validators/doi");
var unicode_name_1 = require("./validators/unicode-name");
var validate_latex_1 = require("./validators/validate-latex");
var ignore_empty_1 = require("./validators/ignore_empty");
exports.validators = {
    string: [only_type_1.validate_onlytype, ignore_empty_1.ignore_empty, string_1.validate_string, length_1.validate_length, check_case_1.validate_case, check_ignored_1.validate_igonered],
    number: [only_type_1.validate_onlytype, number_1.validate_numbers],
    bigint: [only_type_1.validate_onlytype, number_1.validate_numbers],
    object: [only_type_1.validate_onlytype, length_1.validate_length],
    boolean: [only_type_1.validate_onlytype],
    undefined: [only_type_1.validate_onlytype],
    email: [ignore_empty_1.ignore_empty, email_1.validate_email, length_1.validate_length],
    ip: [ignore_empty_1.ignore_empty, ip_1.validate_ip, length_1.validate_length],
    phone: [ignore_empty_1.ignore_empty, phone_1.validate_phone, length_1.validate_length],
    url: [ignore_empty_1.ignore_empty, url_1.validate_url, length_1.validate_length],
    "string-number": [number_1.validate_numbers],
    "file": [file_1.validate_file],
    "values": [values_1.validate_values],
    'array': [array_1.validate_array],
    'base64': [base64_1.validate_base64],
    'doi': [ignore_empty_1.ignore_empty, doi_1.validate_doi],
    "unicode-name": [unicode_name_1.validate_unicode_name, ignore_empty_1.ignore_empty, length_1.validate_length, check_case_1.validate_case],
    "latex": [length_1.validate_length, validate_latex_1.validate_latex]
};
