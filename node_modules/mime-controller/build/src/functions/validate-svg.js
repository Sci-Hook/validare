"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSVG = void 0;
var fast_xml_parser_1 = require("fast-xml-parser");
var parser = new fast_xml_parser_1.XMLParser();
function validateSVG(data) {
    try {
        var error = fast_xml_parser_1.XMLValidator.validate(data);
        if (error.err) {
            return false;
        }
        else {
            var data = parser.parse(data);
            if (data.svg) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    catch (error) {
        return false;
    }
}
exports.validateSVG = validateSVG;
