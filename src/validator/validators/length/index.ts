import { check_length } from "../../../types/schemas";

export function validate_length(schema:check_length,value:string) {
    return new Promise<'length'|'min_length'|'max_length'|'no_error'>(async (resolve, reject) => {
        
        if (schema.min_length && typeof schema.min_length != 'number') {
            return console.error('To use string length validator, the min_length property must take a number type value.')
        }
    
        if (schema.max_length && typeof schema.max_length != 'number') {
            return console.error('To use string length validator, the max_length property must take a number type value')
        }
    
        if (schema.length && typeof schema.length != 'number') {
            return console.error('To use string length validator, the length property must take a number type value')
        }
    
        if (schema.length) {
            if (value.length !== schema.length) resolve('length');
        }

        if (typeof schema.max_length == 'number') if (value.length > schema.max_length) resolve('max_length');
        if (typeof schema.min_length == 'number') if (value.length < schema.min_length) resolve('min_length');
        
        resolve('no_error');
        
    });
}