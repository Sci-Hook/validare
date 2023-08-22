import {Request,Response,NextFunction} from 'express';
import {options_type, params} from '../types/middleware-params';
import { create_value_array } from '../functions/create-value-array';
import { value_array } from '../types/value-arrays';
import { invalid_files, invalid_files_object } from '../types/invalid-files';
import { validator } from '../validator';
import { response } from 'response-schema';
import { files } from '../types/files';
import { findMime } from 'mime-controller';

export function validate_files(values:params,options?:options_type) {
    return async (req:Request,res:Response,next:NextFunction) => {

        if (!res.locals.files) res.locals.files = [];
        
        var value_array = await create_value_array(req,res,values,options,'file');

        var invalid_files:invalid_files_object = {};

        value_array.syncForEach(function (value:value_array,next_value) {
            var files:any[]|undefined = value.value;

            if (!files) {
                invalid_files[value.name] = false;
                return next_value();
            }

            files.syncForEach(async function (file,next_file) {
                
                var result = await validator(value.schema,file.buffer);

                if (!result.status) {
                    if (!invalid_files[value.name]) {
                        invalid_files[value.name] = [];
                    }
                    (<invalid_files[]>invalid_files[value.name]).push({
                        error:result.error,
                        fieldname:file.fieldname,
                        originalname:file.originalname,
                        reason:result.reason
                    });

                    return next_file();
                }

                var properties = await findMime(file.buffer);
                (<files[]>res.locals.files).push({
                    fieldname:value.name,
                    buffer:file.buffer,
                    size:file.size,
                    extension:properties.extension,
                    mimetype:properties.mime,
                    originalname:file.originalname,
                    name:file.originalname.split('.')[0]
                });
            
                next_file();
            },next_value);
        },() => {
            if (Object.keys(invalid_files).length ==0 ) {
                next();
            }else{
                res.json(response(res,{
                    msg:'invalid_files',
                    code:400,
                    data:invalid_files
                }))
            }
        });

    } 

}