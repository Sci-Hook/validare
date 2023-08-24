import {createHash, createHmac} from 'crypto';

export function hasher(value,alogrithm,key) {
    return new Promise<string>((resolve, reject) => {
        var hash = createHmac(alogrithm,key).update(value).digest('hex');
        resolve(hash);
    });
}