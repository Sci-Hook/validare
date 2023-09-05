import { url_schemas} from "../../../types/schemas";

export function validate_url(schema:url_schemas,value:string) {
    return new Promise<'protocols'|'ports'|'hostnames'|'invalid'|'no_error'>((resolve, reject) => {

        if (typeof value != 'string') {
            resolve('invalid');    
            return;
        }
        
        try {
            const parsed_url = new URL(value);

            if (schema.protocols) {
                var protocol = parsed_url.protocol.substring(0,parsed_url.protocol.length-1);
                if (schema.protocols.indexOf(protocol) == -1) {
                    resolve('protocols');
                    return
                }
            }

            if (schema.ports) {
                var port = Number(parsed_url.port);
                if (schema.ports.indexOf(port) == -1) {
                    resolve('ports');
                    return
                }
            }

            if (schema.hostnames) {
                var hostname = parsed_url.hostname;
                if (schema.hostnames.indexOf(hostname) == -1) {
                    resolve('hostnames');
                    return
                }
            }

            resolve('no_error');
            
        } catch (error) {
            resolve('invalid');    
        }
    });
}