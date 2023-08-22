"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_query = void 0;
function create_query(values, type) {
    return new Promise(function (resolve, reject) {
        var query = {};
        var condition;
        if (!type)
            condition = '$and';
        else
            condition = '$' + type;
        query[condition] = [];
        values.syncForEach(function (value, next_value) {
            var data = {};
            if (value.key) {
                data[value.key] = value.value;
            }
            else {
                data[value.name] = value.value;
            }
            query[condition].push(data);
            next_value();
        }, function () {
            resolve(query);
        });
    });
}
exports.create_query = create_query;
