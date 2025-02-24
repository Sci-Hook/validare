import { validate_inner_keys } from "../functions/validate-inner-keys";

type errors = 
    'undefined'|
    'null'|
    'empty'|
    'type'|
    'length'|
    'min_length'|
    'max_length'|
    'values'|
    'no_error'|
    'services'|
    'invalid'|
    'protocols'|
    'ports'|
    'hostnames'|
    'regex'|
    'is_not_buffer'|
    'max_size'|
    'min_size'|
    'extension'|
    'mime'|
    'ignored'|
    'lowercase'|
    'uppercase'|
    'combined'|
    'not-matched-with-any-type';

export class Status {
    
    status:boolean;
    error:errors;
    reason:any;
    value:any;
    message:string;

    constructor(error:errors,name:string,reason?,value?:any){

        let messages = global.validare.messages
        
        if (messages) {
            if (messages[name]) {
                if (messages[name][error]) {
                    this.message = messages[name][error].replaceAll('#{value}',reason)
                }else{
                    if (messages[name]['$default']) {
                        this.message = messages[name]['$default'].replaceAll('#{value}',reason)
                    }
                }
            }
        }

        if (!this.message) {
            if (messages['$default']) {
                if (messages['$default'][error]) {
                    this.message = messages['$default'][error].replaceAll('#{value}',reason);
                }
            }
        }

        this.value = value;
        this.error = error;
        if (error == 'no_error') {
            this.status = true;
        }else{
            this.status = false;
        }
        this.reason = reason;

    }
    
}