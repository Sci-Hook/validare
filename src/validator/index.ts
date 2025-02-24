import { schema } from '../types/schema';
import { Status } from '../class/error';
import { get_requiments } from '../functions/get-requiments';
import { validators } from './validators';

export async function validate_with_schema(schema,value,name) {
    return new Promise<Status>(async (resolve, reject) => {
        var functions:Function[] = await validators[schema.type];
        functions.syncForEach(async function (validator:Function,next) {
            var status = await validator(schema,value);
            if (status == 'no_error') {
                next();                
            }else{
                resolve(new Status(status,name,schema[status],value));
            }
    
        },() => {
            resolve(new Status('no_error',name,null,value))
        })
    });
}

export async function validator(_schema:schema|string,value:any,options?:{dont_validate:string[]}){
    return new Promise<Status>(async (resolve, reject) => {
        
        let name:string = '$default';

        if (typeof _schema == 'string') {
            name = _schema;
        }else{
            // @ts-ignore
            if (_schema.name) name = _schema.name
        }
        
        _schema = await get_requiments(_schema);
        let schema = JSON.parse(JSON.stringify(_schema))

        if (options) {
            if (options.dont_validate) {
                await options?.dont_validate.syncForEach(function (key,next) {
                    delete schema[key];
                    next();
                }) 
            }
        }
        
        if ((<any>schema).dont_validate_empty && value == '') return resolve(new Status('no_error',name,null,value));
        if ((<any>schema).allow_undefined && value === undefined) return resolve(new Status('no_error',name,null,value));
        if ((<any>schema).allow_null && value === null) return resolve(new Status('no_error',name,null,value));

        // Required validation
        if ((<any>schema).required) {
            if (value === undefined) return resolve(new Status('undefined',name,(<any>schema).required,value));
            if (value === null) return resolve(new Status('null',name,(<any>schema).required,value));
        }
        // Required validation 

        if (schema.type == 'multi-type') {
            schema.types.syncForEach(async function (type_options:schema,next_type) {
                var result = await validate_with_schema(type_options,value,name);
                if (result.status == true) {
                    return resolve(result);
                }
                next_type();
            },() => {
                resolve(new Status('not-matched-with-any-type',name,(<any>schema).required,value));
            });
        }else{
            var result = await validate_with_schema(schema,value,name)
            resolve(result);
        }

    }); 

}