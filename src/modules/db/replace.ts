import {Request,Response,NextFunction} from 'express';
import {db_options_type, options_type, params} from '../../types/middleware-params';
import { create_value_array } from '../../functions/create-value-array';
import { get_value } from '../../functions/get-value';
import { replacer } from '../../functions/replacer';

export function replace(schema:any,values:params,options?:db_options_type&{save?:string}) {
    
    return async (req:Request,res:Response,next:NextFunction) => {
        var value_array = await create_value_array(req,res,values,options);
        var data = await get_value(req,res,schema);
        await replacer(value_array,data);
        data.save();
        next();
    }
    
}