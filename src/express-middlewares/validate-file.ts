import {Request,Response,NextFunction} from 'express';
import { field } from '../types/fields';
import 'syncforeachloop';
import { get_value } from '../functions/get-value';
import { validator } from '../validator';
import { invalid_value } from '../types/invalid_value';
import { invalid_file_response } from '../types/invalid-values-response';

export function validateFile(field:field|string,callback:invalid_file_response){

    return async (req:Request,res:Response,next:NextFunction) => {

        var name;
        var schema;

        if (typeof field == 'string') {
            name = field;schema = field;
        }else{
            name = field.dataname;
            schema = field.schema;
        }

        if (!req.file) return callback({dataname:name,error:'undefined',reason:'type'},req,res);

        var result = await validator(schema,req.file.buffer);

        if (!result.status) {
            return callback({
                dataname:req.file.fieldname,
                error:result.error,
                reason:result.reason
            },req,res);
        }

        next();
        
    }
} 