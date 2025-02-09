"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_url = validate_url;
function validate_url(schema, value) {
    return new Promise(function (resolve, reject) {
        if (typeof value != 'string') {
            resolve('invalid');
            return;
        }
        try {
            var parsed_url = new URL(value);
            if (schema.protocols) {
                var protocol = parsed_url.protocol.substring(0, parsed_url.protocol.length - 1);
                if (schema.protocols.indexOf(protocol) == -1) {
                    resolve('protocols');
                    return;
                }
            }
            if (schema.ports) {
                var port = Number(parsed_url.port);
                if (schema.ports.indexOf(port) == -1) {
                    resolve('ports');
                    return;
                }
            }
            if (schema.origins) {
                var origin = parsed_url.origin;
                if (!schema.origins.includes(origin)) {
                    resolve('origins');
                    return;
                }
            }
            if (schema.hostnames) {
                var hostname = parsed_url.hostname;
                if (schema.hostnames.indexOf(hostname) == -1) {
                    resolve('hostnames');
                    return;
                }
            }
            if (schema.ignored_hostnames) {
                var hostname = parsed_url.hostname;
                if (schema.ignored_hostnames.indexOf(hostname) != -1) {
                    resolve('ignored_hostnames');
                    return;
                }
            }
            resolve('no_error');
        }
        catch (error) {
            resolve('invalid');
        }
    });
}
