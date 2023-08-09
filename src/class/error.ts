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
    'regex';

export class CreateStatus {
    
    status:boolean;
    error:errors;
    reason:any;

    constructor(error:errors){
        this.error = error;
        if (error == 'no_error') {
            this.status = true;
        }else{
            this.status = false;
        }
    }
    
}