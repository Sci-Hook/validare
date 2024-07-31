import { string_schemas } from "../../../types/schemas";

export function validate_igonered(schema:string_schemas,value:string) {
    return new Promise<'ignored'|'no_error'>(async (resolve, reject) => {

        if (schema.ignored?.indexOf(value) != -1) {
            return resolve('ignored');
        }

        return resolve('no_error')
        
    });
}