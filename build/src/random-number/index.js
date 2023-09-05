"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomize = void 0;
function randomize(options) {
    var min = 0;
    var max = 1;
    var b = 10;
    if (!options.len) {
        if (options.min)
            min = options.min;
        if (options.max)
            max = options.max;
    }
    else {
        max = options.len;
    }
    var number = Math.floor(Math.random() * (max - min) + min);
    return number;
}
exports.randomize = randomize;
