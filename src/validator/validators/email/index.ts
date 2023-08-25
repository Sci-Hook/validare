import { email_schemas} from "../../../types/schemas";

const regex = '^[\\w-\\.]+@(?<service>[\\w-]+\\.+[\\w-]{2,4}$)';

export function validate_email(schema:email_schemas,value) {
    return new Promise<'no_error'|'invalid'|'services'>(async (resolve, reject) => {

        if (typeof value != 'string') {
            resolve('invalid');    
            return;
        }

        var email_regex = new RegExp(regex,'g').exec(value);

        if (email_regex) {
            if (email_regex.groups) {
                var service = email_regex.groups.service;

                if (schema.services) {
                    if (schema.services.indexOf(service) != -1) {
                        resolve('no_error');
                    }else{
                        resolve('services');
                    }
                }else{
                    resolve('no_error');
                }
            }
        }else{
            resolve('invalid');    
        }

    });
}