"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_url = void 0;
function validate_url(url, protocols, ports, hostnames) {
    return new Promise(function (resolve, reject) {
        if (typeof url != 'string') {
            resolve('invalid');
            return;
        }
        try {
            var parsed_url = new URL(url);
            if (protocols) {
                var protocol = parsed_url.protocol.substring(0, parsed_url.protocol.length - 1);
                if (protocols.indexOf(protocol) == -1) {
                    resolve('protocols');
                    return;
                }
            }
            if (ports) {
                var port = Number(parsed_url.port);
                if (ports.indexOf(port) == -1) {
                    resolve('ports');
                    return;
                }
            }
            if (hostnames) {
                var hostname = parsed_url.hostname;
                if (hostnames.indexOf(hostname) == -1) {
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
