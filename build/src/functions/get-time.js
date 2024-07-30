"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_time = get_time;
var factor = {
    milisecond: 1,
    second: 1000,
    minute: 1000 * 60,
    hour: (1000 * 60) * 60,
    day: (1000 * 60 * 60) * 24,
    week: (1000 * 60 * 60 * 24) * 7,
    month: (1000 * 60 * 60 * 24) * 30,
    year: (1000 * 60 * 60 * 24) * 365
};
function get_time(scale, unit) {
    return (scale * factor[unit]);
}
