import { ID } from '..';
import {Schema} from '../class/schema';
import {params} from '../types/middleware-params';
import {Request,Response,NextFunction} from 'express';

export function create_id(values:params) {
    
    return (req:Request,res:Response,next:NextFunction) => {

        var value_keys;
        
        if (values.length === undefined) {
            value_keys = Object.keys(values);
        }else{
            value_keys = values;
        }

        if(!res.locals.id){
            res.locals.id  = {}
        }

        value_keys.syncForEach(async function (name:string,next_value) {

            if (values[name]) {
                var schema:Schema = values[name];
                res.locals.id[name] = await schema.create_id();   
            }else{
                res.locals.id[name] = await ID(name);
            }

            next_value();
        },() => {
            next();
        });

    }
    
}