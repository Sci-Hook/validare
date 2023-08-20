import {Request,Response,NextFunction} from 'express';
import {options_type, params} from '../types/middleware-params';
import { create_value_array } from '../functions/create-value-array';
import { value_array } from '../types/value-arrays';
import { invalid_files, invalid_files_object } from '../types/invalid-files';
import { validator } from '../validator';
import { response } from 'response-schema';

export function validate_files(values:params,options?:options_type) {
    return async (req:Request,res:Response,next:NextFunction) => {

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
                };
                next_file();
            },next_value);
        },() => {
            if (Object.keys(invalid_files).length ==0 ) {
                next();
            }else{
                res.json(
                    response(res,{
                        msg:'invalid_file',
                        code:400,
                        data:invalid_files
                    })
                )
            }
        });

        // value_keys.syncForEach(function (value,next_value) {

        //     if (!req.files) {
        //         return res.send(
        //             response(res,{
        //                 code:'Internal Server Error',
        //                 msg:'The files are not parsed.'
        //             })
        //         )
        //     };

        //     if (!req.files[value]) {
        //         if (!invalid_files) {
        //             invalid_files = {}
        //         }
        //         invalid_files[value] = false;
        //         return next_value();
        //     }

        //     var fileds = req.files[value];

        //     fileds.syncForEach(async function (field,next_field) {

        //         var buffer = field.buffer;
        //         var result:Status;

        //         if (values[value]) {
        //             var schema:Schema = values[value];
        //             result = await schema.validate(buffer);
        //         }else{
        //             result = await validator(value,buffer);
        //         }

        //         if (!result.status) {
                    
        //             if (!invalid_files) {
        //                 invalid_files = {}
        //             }

        //             if (!invalid_files[value]) {
        //                 invalid_files[value] = [];
        //             }

        //             (<invalid_files[]>invalid_files[value]).push({
        //                 fieldname:field.fieldname,
        //                 originalname:field.originalname,
        //                 error:result.error,
        //                 reason:result.reason
        //             });
                    
        //         }

        //         next_field();

        //     },next_value);
            
        // } ,() => {

        //     if (invalid_files) {
        //         
        //         )
        //     }else{
        //         next();
        //     }
            
        // });

    } 

}