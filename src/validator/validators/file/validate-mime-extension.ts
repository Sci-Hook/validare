import {findMime} from 'mime-controller';
import { file_schemas } from '../../../types/schemas';

export function validate_mime_extension(schema:file_schemas,value) {

    return new Promise<'no_error'|'extension'|'mime'|'invalid'>(async (resolve, reject) => {

        if (Buffer.isBuffer(value)) {
            var result = await findMime(value);
        }else{
            return resolve('invalid');
        }
      
        if (!result.extension) {
            return resolve('extension');
        }

        if (!result.mime) {
            return resolve('mime');
        }

        if (typeof schema.extension == 'string') {
            if (result.extension != schema.extension) {
                return resolve('extension');
            }
        }else{
            if (schema.extension?.indexOf(<any>result.extension) == -1) {
                return resolve('extension');
            }
        }

        if (typeof schema.mime == 'string') {
            if (result.mime != schema.mime) {
                return resolve('mime');
            }
        }else{
            if (schema.mime?.indexOf(<any>result.mime) == -1) {
                return resolve('mime');
            }
        }

        resolve('no_error')
        
    });
    
}