import 'syncforeachloop';
export function validate_types(value,types:string[]) {
    return new Promise<boolean>((resolve, reject) => {
        types.syncForEach(function (type,next_type) {
            if (typeof value == type) {
                resolve(true);
            }else{
                next_type();
            }
        },() => {
            resolve(false);
        })
    });
}