import 'syncforeachloop';
import { special_types } from '../types/schema';
import { specialTypeValidate } from './special-type-validator';

export function validate_types(value,types:string[]) {
    return new Promise<boolean>((resolve, reject) => {
        types.syncForEach(function (type,next_type) {
            if (special_types.indexOf(type) != -1) {
                specialTypeValidate(type,value);
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