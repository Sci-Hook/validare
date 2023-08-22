import {Request,Response,NextFunction} from 'express';
import {db_options_type, options_type, params} from '../../types/middleware-params';
import { create_value_array } from '../../functions/create-value-array';
import { create_query } from '../../functions/create-query';
import { response } from 'response-schema';

export function validate_count(schema:any,values:params,options?:db_options_type&{max?:number,min?:number,save?:string}) {
    
    return async (req:Request,res:Response,next:NextFunction) => {

        var value_array = await create_value_array(req,res,values,options);
        var query = await create_query(value_array,options?.type);

        try {
            var count = await schema.count(query);
        } catch (error) {
            return res.json(response(res,{
                code:500,
                msg:'Is not valid schema.'
            })); 
        }
        
        var error:boolean = false;

        if (options?.min) {
            if (count < options.min) {
                error = true;
            }            
        }

        if (options?.max) {
            if (count > options.max) {
                error = true; 
            }            
        }

        if (error) return res.json(response(res,{
            code:400,
            msg:options?.
            error,
            data:{
                count,
                min:options?.min,
                max:options?.max
            }
        })); 

        if (options?.save) {
            res.locals[options?.save] = count;
        }   
            
        next();

    }
    
}