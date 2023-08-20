export function check_end(numbers:string[],data_hex:string) {
    return new Promise<boolean>((resolve, reject) => {
        numbers.syncForEach(function (magic_number,magic_number_next) {
            var regex = new RegExp(magic_number + '$');
            if (data_hex.match(regex)) {
                return resolve(true);   
            }
            magic_number_next();
        },() => {
            resolve(false);
        })
    });
}