import 'syncforeachloop';

export function validate_inner_keys(value:string,object:any) {
    let keys = value.split('.');
    let new_object = object;
    return new Promise<boolean>(async (resolve, reject) => {
        await keys.syncForEach(function (key,next) {
            if (new_object[key] === undefined || new_object[key] === null) {
                return resolve(false);
            }
            new_object = new_object[key]
            next();
        })    
        resolve(true);
    })
}