export function randomize(options:{min?:number,max?:number,len?:number}) :number {
    
    var min:number = 0;
    var max:number = 1;
    var b:number = 10;

    if (!options.len) {
        if (options.min) min = options.min
        if (options.max) max = options.max 
    }else{
        max = options.len;
    }

    var number = Math.floor(Math.random() * (max - min) + min);

    return number;

}