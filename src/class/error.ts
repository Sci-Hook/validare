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
    'combined';

export class Status {
    
    status:boolean;
    error:errors;
    reason:any;
    value:any;

    constructor(error:errors,reason?,value?:any){
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