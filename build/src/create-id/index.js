"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_id = void 0;
var presets_1 = require("./presets");
var presets_characters_keys = Object.keys(presets_1.presets_characters);
function makeid(length, characters) {
    if (!length) {
        length = 8;
    }
    var result = '';
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
function create_id(schema) {
    var id_schema = { chars: 'standart', length: 8 };
    if (typeof schema == 'string') {
        if (global.validare) {
            if (global.validare[schema]) {
                var len = global.validare[schema].length;
                var chars = global.validare[schema].chars;
                id_schema = { length: len, chars: chars };
            }
        }
    }
    else if (typeof schema == 'object') {
        // id_schema = {length:schema.length,chars:schema.chars}
    }
    var created_characters = '';
    return new Promise(function (resolve, reject) {
        if (id_schema.chars) {
            var chars = id_schema.chars;
            presets_characters_keys.syncForEach(function name(preset_name, next_preset) {
                var _a;
                if (((_a = id_schema.chars) === null || _a === void 0 ? void 0 : _a.indexOf(preset_name)) != -1) {
                    if (id_schema.chars) {
                        chars = chars.replace(preset_name, "");
                    }
                    created_characters = created_characters + presets_1.presets_characters[preset_name];
                }
                next_preset();
            }, function () {
                created_characters = created_characters + chars;
                var id = makeid(id_schema.length, created_characters);
                resolve(id);
            });
        }
        else {
            var id = makeid(id_schema.length, presets_1.presets_characters.all);
            resolve(id);
        }
    });
}
exports.create_id = create_id;
