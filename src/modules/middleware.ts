import {Schema} from '../class/schema';
import {Request,Response,NextFunction} from 'express';

export function validate(values:object) {
    
    return (req:Request,res:Response,next:NextFunction) => {

        var value_keys = Object.keys(values);
        
        var invalid_values:{data_name:string,error:string}[] = [];

        value_keys.syncForEach(async function (name:string,next_value) {

            var schema:Schema = values[name];
            var value;

            if (req.body) {if (req.body[name]) value = req.body[name];}
            if(req.query){if (req.query[name]) value = req.query[name];}
            
            var result = await schema.validate(value);

            if (!result.status) {
                invalid_values.push({data_name:name,error:result.error});
            }

            next_value();
            
        },() => {
            res.locals.invalid_values = invalid_values;
            next();
        })
    }
    
}