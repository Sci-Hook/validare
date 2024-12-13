import { schema } from '../types/schema';
import { Status } from '../class/error';
import { get_requiments } from '../functions/get-requiments';
import { validators } from './validators';

export async function validator(schema:schema|string,value:any){
    return new Promise<Status>(async (resolve, reject) => {
        
        if ((<any>schema).dont_validate_empty && value == '') return resolve(new Status('no_error',null,value));

        schema = await get_requiments(schema);

        // Required validation
        if ((<any>schema).required) {
            if (value === undefined) return resolve(new Status('undefined',(<any>schema).required,value));
            if (value === null) return resolve(new Status('null',(<any>schema).required,value));
        }
        // Required validation

        var functions:Function[] = await validators[schema.type];

        functions.syncForEach(async function (validator:Function,next) {
            var status = await validator(schema,value);
            if (status == 'no_error') {
                next();                
            }else{
                resolve(new Status(status,schema[status],value));
            }
        },() => {
            resolve(new Status('no_error',null,value))
        })

    }); 

}