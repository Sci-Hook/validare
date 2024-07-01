type units = 'milisecond'|'second'|'minute'|'hour'|'day'|'week'|'month'|'year';

type factors = {
    [key:string]:number
};

var factor:factors = {
    milisecond:1,
    second:1000,
    minute:1000*60,
    hour:(1000*60)*60,
    day:(1000*60*60)*24,
    week:(1000*60*60*24)*7,
    month:(1000*60*60*24)*30,
    year:(1000*60*60*24)*365

}

export function get_time(scale:number,unit:units) {
    return(scale*factor[unit]);
}