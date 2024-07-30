import { string_schemas } from "../../../types/schemas";

export function validate_case(schema:string_schemas,value:string) {
    return new Promise<'lowercase'|'uppercase'|'combined'|'no_error'>(async (resolve, reject) => {

        if (!schema.casetype) return resolve('no_error');
        if (schema.casetype == 'unset') return resolve('no_error');
        
        if (schema.casetype == 'lowercase') {
            if (value == value.toLowerCase()) {
                return resolve('no_error');
            }
        }

        if (schema.casetype == 'uppercase') {
            if (value == value.toUpperCase()) {
                return resolve('no_error');
            }
        }

        if (schema.casetype  == 'combined') {
            if (value != value.toUpperCase() && value != value.toLowerCase()) {
                return resolve('no_error');
            }
        }

        resolve(schema.casetype);
        
    });
}