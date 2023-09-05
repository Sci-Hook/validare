import { email_schemas} from "../../../types/schemas";

const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export function validate_phone(schema:email_schemas,value) {
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