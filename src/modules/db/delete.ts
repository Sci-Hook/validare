import {Request,Response,NextFunction} from 'express';
import {db_options_type, options_type, params} from '../../types/middleware-params';
import { create_value_array } from '../../functions/create-value-array';
import { create_query } from '../../functions/create-query';
import { response } from 'response-schema';

export function delete_value(schema:any,values:params,options?:db_options_type&{save?:string,many?:boolean}) {
    
    return async (req:Request,res:Response,next:NextFunction) => {

        var value_array = await create_value_array(req,res,values,options);
        var query = await create_query(value_array,options?.type);

        try {
            var delete_count;
            if (options?.many) delete_count = await schema.deleteMany(query);
            else delete_count = await schema.deleteOne(query);
        } catch (error) {
            return res.json(response(res,{code:500,
                msg:'Is not valid schema.'
            })); 
        }

        if (options?.error) {
            if (delete_count.deletedCount == 0) {
                return res.json(response(res,{
                    code:400,
                    msg:options?.error
                })); 
            }
        }

        if (options?.save) res.locals[options?.save] = delete_count.deletedCount;
        
        next();

    }
    
}