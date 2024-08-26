import {Request,Response,NextFunction} from 'express';
import { field } from '../types/fields';
import 'syncforeachloop';
import { get_value } from '../functions/get-value';
import { validator } from '../validator';
import { invalid_value } from '../types/invalid_value';
import { invalid_values_response } from '../types/invalid-values-response';

export function validateFields(fields:(field|string)[],callback:invalid_values_response){

    return (req:Request,res:Response,next:NextFunction) => {

        var invalid_values:invalid_value[] = [];
        
        fields.syncForEach(async (field:string|field,next) => {
            
            var filed_location:string;
            var schema:string;
            var allow_undefined:boolean = false;

            if (typeof field == 'string') {

                if (field.endsWith('?')) {
                    allow_undefined = true;
                    field = field.slice(0,field.length - 1);
                }

                let splitted = field.split('.')
                filed_location = field;
                schema = splitted[splitted.length-1];
            }else{
                filed_location = field.dataname;
                schema = field.schema; 
                allow_undefined = field.allow_undefined  !== undefined ? field.allow_undefined : false;
            }

            var value = await get_value(filed_location,req,res);

            if (value === undefined && allow_undefined) return next();

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