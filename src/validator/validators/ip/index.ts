import {ip_schemas} from "../../../types/schemas";

const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export function validate_ip(schema:ip_schemas,value) {
    return new Promise<'no_error'|'invalid'|'services'>(async (resolve, reject) => {

        if (typeof value != 'string') {
            resolve('invalid');    
            return;
        }

        if (typeof value != 'string') {
            return resolve('invalid');
        }
        if (value.match(regex)) {
            return resolve('no_error')
        }else{
            return resolve('invalid');
        }

    });
}