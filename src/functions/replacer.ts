import { value_array } from "../types/value-arrays";

export function replacer(new_datas:value_array[],schema) {
    var new_data = schema;
    return new Promise<void>((resolve, reject) => {
        new_datas.syncForEach(function (data:value_array,next_data) {
            var keys:string[];

            if (data.key) {
                keys = data.key?.split('.');
            }else{
                keys = [data.name];
            }
            keys.syncForEach(function (key,next_key,index,length) { 
                if (index != length) {
                    new_data = new_data[key];
                }else{
                    new_data[key] = data.value;
                }
                next_key();
            },next_data);
        },() => {
            resolve();
        });
    })
    
}