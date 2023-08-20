"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_url = void 0;
function validate_url(url, options) {
    return new Promise(function (resolve, reject) {
        if (typeof url != 'string') {
            resolve('invalid');
            return;
        }
        try {
            var parsed_url = new URL(url);
            if (!options) {
                return resolve('no_error');
            }
            if (options.protocols) {
                var protocol = parsed_url.protocol.substring(0, parsed_url.protocol.length - 1);
                if (options.protocols.indexOf(protocol) == -1) {
                    resolve('protocols');
                    return;
                }
            }
            if (options.ports) {
                var port = Number(parsed_url.port);
                if (options.ports.indexOf(port) == -1) {
                    resolve('ports');
                    return;
                }
            }
            if (options.hostnames) {
                var hostname = parsed_url.hostname;
                if (options.hostnames.indexOf(hostname) == -1) {
                    resolve('hostnames');
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
exports.validate_url = validate_url;
