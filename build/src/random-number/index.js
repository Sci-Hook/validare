"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomize = randomize;
function randomize(options) {
    if (typeof options.min != 'number') {
        return console.error('To use random number, the min_length property must take a number type value.');
    }
    if (typeof options.max != 'number') {
        return console.error('To use random number, the max_length property must take a number type value');
    }
    if (typeof options.len != 'number') {
        return console.error('To use random number, the length property must take a number type value');
    }
    var min = 0;
    var max = 1;
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
