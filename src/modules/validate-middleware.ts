import {Request,Response,NextFunction} from 'express';
import {options_type, params} from '../types/middleware-params';
import { create_value_array } from '../functions/create-value-array';
import { validator } from '../validator';
import { value_array } from '../types/value-arrays';
import { response } from 'response-schema';

export function validate_request(values:params,options?:options_type) {
    
    return async (req:Request,res:Response,next:NextFunction) => {

        var value_array = await create_value_array(req,res,values,options);

        var invalid_values:{
            data_name:string,
            error:string,
            msg?:string,
            reason:any
        }[] = [];

        value_array.syncForEach(async function (value:value_array,next_value) {
            var result = await validator(value.schema,value.value);
            var msg = result.get_error(res,value.name);
           
            if (!result.status) {
                invalid_values.push({
                    data_name:value.name,
                    error:result.error,
                    msg,
                    reason:result.reason
                })
            }
            
            next_value();
        },() => {
            if (invalid_values.length == 0) {
                next();                
            }else{
                response(res,{
                    code:400,
                    data:invalid_values,
                    msg:'invalid_values'
                });
            }
        });

    }
    
}