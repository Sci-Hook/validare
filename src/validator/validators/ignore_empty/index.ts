import { string_schemas } from "../../../types/schemas";

export function ignore_empty(schema:string_schemas,value) {

    return new Promise<'no_error'|'empty'>(async (resolve, reject) => {
        
        if (schema.ignore_empty) {
            if (value === '') return resolve('empty')
        }
     
        return resolve('no_error');

    });

}