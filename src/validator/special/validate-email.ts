const regex = '^[\\w-\\.]+@(?<service>[\\w-]+\\.+[\\w-]{2,4}$)';

export function validate_email(value,options) {
    return new Promise<'no_error'|'invalid'|'services'>((resolve, reject) => {
        
        if (typeof value != 'string') {
            resolve('invalid');    
            return;
        }

        var email_regex = new RegExp(regex,'g').exec(value);

        if (email_regex) {
            if (email_regex.groups) {
                var service = email_regex.groups.service;
                if (options.services) {
                    if (options.services.indexOf(service) != -1) {
                        resolve('no_error');
                    }else{
                        resolve('services');
                    }
                }else{
                    resolve('no_error');
                }
            }
        }else{
            resolve('invalid');    
        }

    });
}