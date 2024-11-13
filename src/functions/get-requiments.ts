import { schema } from "../types/schema";
import { get_remote_laded_schemas } from "./remote-load";

export function get_requiments(schema) {
    return new Promise<schema>(async (resolve, reject) => {
        if (typeof schema == 'string') {
            
            var loaded_validation_schemas;

            if (typeof window != 'undefined') {
                loaded_validation_schemas = await get_remote_laded_schemas();
            }else {
                loaded_validation_schemas = global.validare;
            }

            if (!loaded_validation_schemas) {
                resolve({type:'string',required:true});
            }
            if (!loaded_validation_schemas) {
                resolve({type:'string',required:true});
            }
            if (!loaded_validation_schemas[schema]) {
                resolve({type:'string',required:true});
            }else{
                resolve(<schema>loaded_validation_schemas[schema]);
            }
        }
        resolve(schema);
    });
}