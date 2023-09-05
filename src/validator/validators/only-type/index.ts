import { boolean_schemas } from "../../../types/schemas";

export function validate_onlytype(schema:boolean_schemas,value) {
    return new Promise<'type'|'no_error'>(async (resolve, reject) => {
        if (typeof value != schema.type) {
            return resolve('type');
        }
        return resolve('no_error');
    });
}