import {Request,Response,NextFunction} from 'express';
import {db_options_type, options_type, params} from '../../types/middleware-params';
import { create_value_array } from '../../functions/create-value-array';
import { create_query } from '../../functions/create-query';
import { response } from 'response-schema';
import { value_array } from '../../types/value-arrays';

export function validate_not_exist(schema:any,values:params,options?:db_options_type) {
    
    return async (req:Request,res:Response,next:NextFunction) => {

        var value_array = await create_value_array(req,res,values,options);
        var query = await create_query(value_array,options?.type);

        try {
            var data = await schema.findOne(query);
        } catch (error) {
            return res.json(response(res,{
                code:500,
                msg:'Is not valid schema.'
            })); 
        }
        

        if (!data) return next();
        
        if (data) {
            var exist_datas:string[] = [];
            value_array.syncForEach(function (value:value_array,next_value) {
                if(data[value.name] == value.value){
                    exist_datas.push(value.name);
                } 
                next_value();
            },()=> {
                return res.json(response(res,{
                    code:400,
                    msg:options?.error,
                    data:{exist_datas}
                })); 
            })
        }

    }
    
}