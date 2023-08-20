import 'syncforeachloop';

var special_types = ['buffer','file'];

export function validate_types(value,types:string[]) {
    return new Promise<boolean>((resolve, reject) => {
        types.syncForEach(function (type,next_type) {
            if (special_types.indexOf(type) != -1) {
                if (type == 'buffer') {
                    if (Buffer.isBuffer(value)) {
                        resolve(true);
                    }else{
                        next_type(); 
                    }
                }else{
                    next_type(); 
                }
            }else{
                if (typeof value == type) {
                    resolve(true);
                }else{
                    next_type();
                }
            }
        },() => {
            resolve(false);
        })
    });
}