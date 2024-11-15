import {unicode_name } from "../../../types/schemas";

//@ts-ignore
const regex = /\p{L}/u;

export function validate_unicode_name(schema:unicode_name,value) {

    return new Promise<'invalid'|'type'|'no_error'>(async (resolve, reject) => {
        
        if (typeof value != 'string') {
            return resolve('type')
        }

        var chars = value.split('');

        chars.syncForEach(function (char,next) {

            if (regex.test(char)) {
                return next();
            }

            if (schema.allowed_chars) if (schema.allowed_chars.indexOf(char) != -1) {
                return next(); 
            }
            
            return resolve('invalid');

        },() => {
            resolve('no_error');
        })
   
    });

}