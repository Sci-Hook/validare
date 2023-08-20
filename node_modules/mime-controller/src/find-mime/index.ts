import {signatures} from '../signatures';
import { signature_type } from '../types/signature-types';
import {validate} from '../validate';
import 'syncforeachloop';

var signature_names = Object.keys(signatures);

export function findMime(buffer:Buffer) {
    return new Promise<{mime:string|null,extension:string|null}>((resolve, reject) => {
        signature_names.syncForEach(async function (signature_name,next_name) {

            if(await validate(buffer,signature_name)){
                var signature:signature_type = signatures[signature_name];
                return resolve({
                    extension:signature.extension,
                    mime:signature.mime
                });
            };
            
            next_name();
        },() => {
            return resolve({
                extension:null,
                mime:null
            });
        });
        
    });
}