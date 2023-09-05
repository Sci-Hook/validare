import { file_schemas } from "../../../types/schemas";
import { validate_mime_extension } from "./validate-mime-extension";
import { validate_size } from "./validate-size";

export function validate_file(schema:file_schemas,value:string) {
    return new Promise<'no_error'|'extension'|'mime'|'invalid'|'max_size'|'min_size'>(async (resolve, reject) => {
        
        if (schema.extension || schema.mime) {
            let status = await validate_mime_extension(schema,value);
            if (status != "no_error") {
                resolve(status);
            }
        }
        if (schema.max_size || schema.min_size) {
            let status = await validate_size(schema,value);
            if (status != "no_error") {
                resolve(status);
            }
        }

        resolve('no_error');
    });
}