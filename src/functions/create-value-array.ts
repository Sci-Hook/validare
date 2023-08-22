import {Request,Response} from 'express';  
import { options, options_type, params} from "../types/middleware-params";
import { get_value } from "./get-value";
import { get_name } from "./get-name";
import { value_array } from '../types/value-arrays';
import { schema } from '../types/schema';
import { get_file } from './get-file';

export function create_value_array(req:Request,res:Response,values:params,options?:options_type,type?:'value'|'file') {

    var array_values;
    var value_array:value_array[] = [];

    if (values.length !== undefined) {
        array_values = values;
    }

    return new Promise<value_array[]>((resolve, reject) => {
        
        array_values.syncForEach(async function (arr_value:options|string,next_value) {

            var value:any;
            var name :string;
            var key:string|undefined;

            if (type == 'value' || !type) {
                if (typeof arr_value == 'string') {
                    value = await get_value(req,res,arr_value);
                    name = await get_name(arr_value);
                    key = name;     
                }else{
                    value = await get_value(req,res,arr_value.name);
                    name = await get_name(arr_value.name);  
                    key = arr_value.key; 
                }
            }else{
                if (typeof arr_value == 'string') {
                    value = await get_file(req,res,arr_value);
                    name = arr_value;
                }else{
                    value = await get_file(req,res,arr_value.name);
                    name = arr_value.name;
                }
            }

            if (typeof arr_value == 'string' ) {
                if (arr_value.endsWith('?')) {
                    if (value === undefined) return next_value();
                    if (value === null) return next_value();
                }
            }else{
                if (arr_value.name.endsWith('?')) {
                    if (value === undefined) return next_value();
                    if (value === null) return next_value();
                }
            }

            if (typeof arr_value == 'object') {
                if (arr_value.allow_undefined) {
                    if (value === undefined) return next_value();
                    
                }
                if (arr_value.allow_null) {
                    if (value === null) return next_value();

                }
                if (arr_value.allow_empty) {
                    if (value === '') return next_value();
                }
            }

            if (options) {
                if (options?.allow_undefined) {
                    if (value === undefined) {
                        if (typeof arr_value == 'object') {
                            if (arr_value.allow_undefined !== false) return next_value();
                        }else{
                            return next_value();
                        }
                    }
                }
                if (options?.allow_null) {
                    if (value === null) {
                        if (typeof arr_value == 'object') {
                            if (arr_value.allow_null !== false) return next_value();
                        }else{
                            return next_value();
                        }
                    }
                }
                if (options?.allow_empty) {
                    if (value === '') {
                        if (typeof arr_value == 'object') {
                            if (arr_value.allow_empty !== false) return next_value();
                        }else{
                            return next_value();
                        }
                    }
                }
            }

            var schema:schema;

            if (options?.params_schema_key) {
                schema = global.validare.requiments[req.params[options.params_schema_key]];
            }else{
                if (typeof arr_value === 'string') {
                    if (global.validare.requiments[name]) {
                        schema = global.validare.requiments[name];
                    }else{
                        schema = {required:true};
                    }
                }else{
                    if (typeof arr_value.schema =='string') {
                        if (global.validare.requiments[arr_value.schema]) {
                            schema = global.validare.requiments[arr_value.schema];
                        }else{
                            schema = {required:true};
                        }
                    }else{
                        if (arr_value.schema) {
                            schema = arr_value.schema.schema;
                        }else{
                            schema = global.validare.requiments[name];
                        }
                    }
                } 
            }

            value_array.push({name,value,schema:schema,key});
            next_value();
    
        },() => {
            resolve(value_array);
        });
    });

}