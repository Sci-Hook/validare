import { phone } from "../../types/options";

const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export function validate_phone(value:any,options:phone) {
    return new Promise<'invalid'|'no_error'>((resolve, reject) => {
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