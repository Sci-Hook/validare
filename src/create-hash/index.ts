import {createHmac} from 'crypto';
import { alogrithms } from '../types/schema';

export function hasher(value:string,alogrithm:alogrithms,key:string) {
    return new Promise<string>((resolve, reject) => {
        var hash = createHmac(alogrithm,key).update(value).digest('hex');
        resolve(hash);
    });
}