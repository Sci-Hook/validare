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
    'mime';

export class Status {
    
    status:boolean;
    error:errors;
    reason:any;

    constructor(error:errors,reason?){
        this.error = error;
        if (error == 'no_error') {
            this.status = true;
        }else{
            this.status = false;
        }
        this.reason = reason;
    }
    
    get_error(res,name){
        if(res.locals.i18n){
            if (res.locals.i18n.validation) {
                if (res.locals.i18n.validation[name]) {
                    if (res.locals.i18n.validation[name][this.error]) {
                        var error:string = res.locals.i18n.validation[name][this.error];
                        error = error.replace('{this}',this.reason);
                        return error;
                    }
                }
            }
        }
    }
    
}