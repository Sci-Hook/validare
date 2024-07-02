export function randomize(options:{min?:number|string,max?:number|string,len?:number|string}) : number|void {
    
    if (typeof options.min != 'number') {
        return console.error('To use this feature, the min_length property must take a number type value.')
    }

    if (typeof options.max != 'number') {
        return console.error('To use this feature, the max_length property must take a number type value')
    }

    if (typeof options.len != 'number') {
        return console.error('To use this feature, the length property must take a number type value')
    }


    var min:number = 0;
    var max:number = 1;

    if (!options.len) {
        if (options.min) min = options.min
        if (options.max) max = options.max 
    }else{
        max = options.len;
    }

    var number = Math.floor(Math.random() * (max - min) + min);

    return number;

}