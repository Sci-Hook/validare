import { array, base64 } from "../../../types/schemas";

var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export function validate_base64(schema:base64,value:any) {
    return new Promise<'type'|'max_size'|'min_size'|'no_error'>(async (resolve, reject) => {
        

        if (!base64regex.test(value)) {
            return resolve('type')
        }

        if (schema.max_size) {
            if (value.length > schema.max_size) {
                return resolve('max_size')
            }  
        }

        if (schema.min_size) {
            if (value.length < schema.min_size) {
                return resolve('min_size')
            }  
        }

        resolve('no_error');

    });
}