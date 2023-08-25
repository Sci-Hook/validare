import { schema } from "../types/schema";

export function get_requiments(schema) {
    return new Promise<schema>((resolve, reject) => {
        if (typeof schema == 'string') {
            if (!global.validare) {
                resolve({type:'string',required:true});
            }
            if (!global.validare) {
                resolve({type:'string',required:true});
            }
            if (!global.validare[schema]) {
                resolve({type:'string',required:true});
            }else{
                resolve(<schema>global.validare[schema]);
            }
        }
        resolve(schema);
    });
}