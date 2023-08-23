import { types } from "util";

type types = 'string-number'|'file'|'buffer'|'any';

const functions:{[key in types]:(value) =>  boolean} = {
    buffer:(value) => Buffer.isBuffer(value),
    file:(value) => true,
    any:(value) => true,
    "string-number": (value) => {
        if (value == undefined || value == null) return false;
        var number = Number(value);
        if (Number.isNaN(number)) return false;
        return true
    }
}

export function specialTypeValidate(type:types,value) {
    return new Promise<boolean>((resolve, reject) => {
        if (functions[type]) {
            resolve(functions[type](value));
        }else{
            resolve(true);
        }
    })   
}