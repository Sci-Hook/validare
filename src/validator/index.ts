import { schema } from '../types/schema';
import { validate_email } from './special/validate-email';
import { validate_url } from './special/validate-url';
import { validate_ip } from './special/validate-ip';
import { validate_phone } from './special/validate-phone';
import { validate_types } from './validate-types';
import { validate_values } from './validate-values';
import { Status } from '../class/error';
import { get_requiments } from '../functions/get-requiments';
import { validate_size } from './buffer/validate-size';
import { validate_mime_extension } from './buffer/validate-mime-extension';

const special_controolers = {
    email:validate_email,
    url:validate_url,
    ip:validate_ip,
    phone:validate_phone
};

var special_types = [
    'any',
    'file',
    'buffer'
];

export async function validator(schema:schema|string,value:any){
    return new Promise<Status>(async (resolve, reject) => {
        
        schema = await get_requiments(schema);

        // Required validation
        if (schema.required) {
            if (value === undefined) return resolve(new Status('undefined',schema.required))
            if (value === null) return resolve(new Status('null',schema.required))
        }
        // Required validation

        // Accpeted values validation
        if (schema.values) {
            let status = await validate_values(value,schema.values);
            if (status){ 
                return resolve(new Status('no_error',schema.values))
            }else{
                return resolve(new Status('values',schema.values))
            };
        }
        // Accpeted values validation
    
        // Empty string validation
        if (schema.ignore_empty) {
            if (value === '') return resolve(new Status('empty',schema.ignore_empty))
        }
        // Empty string validation

        
        // Type validation
        if (schema.type) {
            if (typeof schema.type == 'string') {
                if (typeof value != schema.type && special_types.indexOf(schema.type) == -1) {
                    return resolve(new Status('type',schema.type))
                }
                if (schema.type =='buffer') {
                    if (!Buffer.isBuffer(value)) return resolve(new Status('type',schema.type))
                }
            }
            if (typeof schema.type == 'object') {
                let status = await validate_types(value,schema.type);
                if (!status) return resolve(new Status('type',schema.type))
            }
        }
        // Type validation

        // Size validation in byte
        if (schema.type == 'file'|| schema.type == 'buffer' || schema.type == 'string') {
            if (schema.max_size || schema.min_size) {
                let status = await validate_size(schema,value);
                if (status != 'no_error') {
                    let reason;
                    if (status == 'max_size') {reason = schema.max_size};
                    if (status == 'min_size') {reason = schema.min_size};
                    return resolve(new Status(status,reason));
                }
            }      
        }
        // Size validation in byte

        // Mime validation
        if (schema.type == 'file' || schema.type == 'buffer') {
            if (schema.mime || schema.extension) {
                let status = await validate_mime_extension(schema,value);
                if (status != 'no_error') {
                    let reason
                    if (status == 'extension') {reason = schema.extension}
                    if (status == 'mime') {reason = schema.mime}
                    return resolve(new Status(status,reason));
                }
            }
            return resolve(new Status('no_error'))
        }
        // Mime validation
        
        // Special validations
        if (schema.special_controllers) {
            let status = await special_controolers[schema.special_controllers.type](value,<any>schema.special_controllers.options);
            if (status != 'no_error') return resolve(new Status(status));
        }
        // Special validations


        // length validations
        var length;
        if (typeof value == 'number') length = value;
        if (typeof value == 'string') length = value.length;
    
        if (schema.length) {
            if (length != schema.length) return resolve(new Status('length',schema.length));
        }
    
        if (schema.min_length) {
            if (length < schema.min_length) return resolve(new Status('min_length',schema.min_length));
        }
    
        if (schema.max_length) {
            if (length > schema.max_length) return resolve(new Status('max_length',schema.max_length));
        }
        // length validations
    
        if (schema.regex) {
            if (typeof value == 'string') {
                if (typeof schema.regex == 'string') {
                    
                    var splitted = schema.regex.split('/');
                    var flag = schema.regex.split('/')[splitted.length -1];
                    var pattern = schema.regex.replace(flag,'');
                    pattern = pattern.slice(1,-1);
                    try {
                        var regex = new RegExp(pattern,flag);
                        if (!value.match(regex)) return resolve(new Status('regex',schema.regex));
                    } catch (error) {
                        console.log("Invalid regex", schema)
                        console.log(error);
                    }
                }else{
                    if (!value.match(schema.regex)) return resolve(new Status('regex',schema.regex));
                }
            }else{
                return resolve(new Status('regex',schema.regex));
            }
        }

        return resolve(new Status('no_error')); // no error
           
    }); 

}