import { schema } from "../types/schema";

export function get_requiments(schema) {
    return new Promise<schema>((resolve, reject) => {
        if (typeof schema == 'string') {
            if (!global.validare) {
                resolve({required:true});
            }
            if (!global.validare.requiments) {
                resolve({required:true});
            }
            if (!global.validare.requiments[schema]) {
                resolve({required:true});
            }else{
                resolve(<schema>global.validare.requiments[schema]);
            }
        }
        resolve(schema);
    });
}