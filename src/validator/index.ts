import { schema } from '../types/schema';
import { validate_email } from './special/validate-email';
import { validate_url } from './special/validate-url';
import { validate_ip } from './special/validate-ip';
import { validate_phone } from './special/validate-phone';
import { validate_types } from './validate-types';
import { validate_values } from './validate-values';
import { CreateStatus } from '../class/error';

const special_controolers = {
    email:validate_email,
    url:validate_url,
    ip:validate_ip,
    phone:validate_phone
};


export async function validator(schema:schema,value:any){
    return new Promise<CreateStatus>(async (resolve, reject) => {

        if (schema.required) {
            if (value === undefined) return resolve(new CreateStatus('undefined'))
            if (value === null) return resolve(new CreateStatus('null'))
        }
    
        if (schema.values) {
            let status = await validate_values(value,schema.values);
            if (status){ 
                return resolve(new CreateStatus('no_error'))
            }else{
                return resolve(new CreateStatus('values'))
            };
        }
    
        if (schema.ignore_empty) {
            if (value === '') return resolve(new CreateStatus('empty'))
        }
    
        if (schema.type) {
            if (typeof schema.type == 'string') {
                if (typeof value != schema.type && schema.type != 'any') return resolve(new CreateStatus('type'));
            }
            if (typeof schema.type == 'object') {
                let status = await validate_types(value,schema.type);
                if (!status) return resolve(new CreateStatus('type'))
                
            }
        }
        
        if (schema.special_controllers) {
            let status = await special_controolers[schema.special_controllers.type](value,schema.special_controllers.options);
            if (status != 'no_error') return resolve(new CreateStatus(status));
        }
    
        var length;
        if (typeof value == 'number') length = value;
        if (typeof value == 'string') length = value.length;
    
        if (schema.length) {
            if (length != schema.length) return resolve(new CreateStatus('length'));
        }
    
        if (schema.min_length) {
            if (length < schema.min_length) return resolve(new CreateStatus('min_length'));
        }
    
        if (schema.max_length) {
            if (length > schema.max_length) return resolve(new CreateStatus('max_length'));
        }
    
        if (schema.regex) {
            if (typeof value == 'string') {
                if (!value.match(schema.regex)) return resolve(new CreateStatus('regex'));
            }else{
                return resolve(new CreateStatus('regex'));
            }
        }
    
        return resolve(new CreateStatus('no_error'))
           
    }); 
}