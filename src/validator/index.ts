import { schema } from '../types/schema';
import { Status } from '../class/error';
import { get_requiments } from '../functions/get-requiments';
import { validators } from './validators';

export async function validator(schema:schema|string,value:any){
    return new Promise<Status>(async (resolve, reject) => {
        
        schema = await get_requiments(schema);

        // Required validation
        if (schema.required) {
            if (value === undefined) return resolve(new Status('undefined',schema.required))
            if (value === null) return resolve(new Status('null',schema.required))
        }
        // Required validation

        var functions:Function[] = await validators[schema.type];

        functions.syncForEach(async function (validator:Function,next) {
            var status = await validator(schema,value);
            if (status == 'no_error') {
                next();                
            }else{
                resolve(new Status(status,schema[status]));
            }
        },() => {
            resolve(new Status('no_error'))
        })

        // // Size validation in byte
        // if (schema.type == 'file'|| schema.type == 'buffer' || schema.type == 'string') {
        //     if (schema.max_size || schema.min_size) {
        //         let status = await validate_size(schema,value);
        //         if (status != 'no_error') {
        //             let reason;
        //             if (status == 'max_size') {reason = schema.max_size};
        //             if (status == 'min_size') {reason = schema.min_size};
        //             return resolve(new Status(status,reason));
        //         }
        //     }      
        // }
        // // Size validation in byte

        // // Mime validation
        // if (schema.type == 'file' || schema.type == 'buffer') {
        //     if (schema.mime || schema.extension) {
        //         let status = await validate_mime_extension(schema,value);
        //         if (status != 'no_error') {
        //             let reason
        //             if (status == 'extension') {reason = schema.extension}
        //             if (status == 'mime') {reason = schema.mime}
        //             return resolve(new Status(status,reason));
        //         }
        //     }
        //     return resolve(new Status('no_error'))
        // }
        // // Mime validation
        
        // // length validations
        // var length;
        // if (typeof value == 'number') length = value;
        // if (typeof value == 'string') length = value.length;
    
        // if (schema.length) {
        //     if (length != schema.length) return resolve(new Status('length',schema.length));
        // }
    
        // if (schema.min_length) {
        //     if (length < schema.min_length) return resolve(new Status('min_length',schema.min_length));
        // }
    
        // if (schema.max_length) {
        //     if (length > schema.max_length) return resolve(new Status('max_length',schema.max_length));
        // }
        // // length validations
    

        // return resolve(new Status('no_error')); // no error
           
    }); 

}