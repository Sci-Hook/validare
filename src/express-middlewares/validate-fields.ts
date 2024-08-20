import {Request,Response,NextFunction} from 'express';
import { field } from '../types/fields';
import 'syncforeachloop';
import { get_value } from '../functions/get-value';
import { validator } from '../validator';
import { invalid_value } from '../types/invalid_value';

export function validateFields(fields:(field|string)[],callback:Function){

    return (req:Request,res:Response,next:NextFunction) => {

        var invalid_values:invalid_value[] = [];
        
        fields.syncForEach(async (field:string|field,next) => {
            
            var filed_location:string;
            var schema:string;

            if (typeof field == 'string') {
                let splitted = field.split('.')
                filed_location = field;
                schema = splitted[splitted.length-1];
            }else{
                filed_location = field.dataname;
                schema = field.schema; 
            }

            var value = await get_value(filed_location,req,res);
            var result = await validator(schema,value);
            
            if (!result.status) {
                
                let splitted = filed_location.split('.')
                var dataname = splitted[splitted.length - 1]

                invalid_values.push({
                    data:value,
                    dataname,
                    error:result.error,
                    reason:result.reason
                });
                
            }

            next();
            
        },() => {
            if (invalid_values.length != 0) return callback(invalid_values,req,res);
            next();
        });
        
    }
} 