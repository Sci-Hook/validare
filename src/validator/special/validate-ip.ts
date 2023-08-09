const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export function validate_ip(value:any,options) {
    return new Promise<'invalid'|'no_error'>((resolve, reject) => {
        
        if (typeof value != 'string') {
            return resolve('invalid');
        }

        if (value.match(regex)) {
            return resolve('no_error')
        }else{
            return resolve('invalid');
        }

    });
}