import 'syncforeachloop';
export function validate_values(value,accepted_values:any[]) {
    return new Promise<boolean>((resolve, reject) => {
        accepted_values.syncForEach(function (accepted_value,next_accepted_value) {
            if (value == accepted_value) {
                resolve(true);
            }else{
                next_accepted_value();
            }
        },() => {
            resolve(false);
        })
    });
}