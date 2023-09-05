import {  values_schemas} from "../../../types/schemas";

const regex = '^[\\w-\\.]+@(?<service>[\\w-]+\\.+[\\w-]{2,4}$)';

export function validate_values(schema:values_schemas,value) {
    return new Promise<'values'|'no_error'>(async (resolve, reject) => {

        if (schema.values) {
            if (schema.values.indexOf(value) == -1) {
                return resolve('values')  
            }
        }

        resolve('no_error');

    });

}