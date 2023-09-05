import { check_length } from "../../../types/schemas";

export function validate_length(schema:check_length,value:string) {
    return new Promise<'length'|'min_length'|'max_length'|'no_error'>((resolve, reject) => {
        
        if (schema.length) {
            if (value.length !== schema.length) resolve('length');
        }
        if (schema.max_length) {
            if (value.length > schema.max_length) resolve('max_length');
        }
        if (schema.min_length) {
            if (value.length < schema.min_length) resolve('min_length');
        }
        
        resolve('no_error');
    });
}