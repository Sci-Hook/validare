import { value_array } from '../types/value-arrays';

export function create_query(values:value_array[],type:'or'|'and'|undefined) {

    return new Promise<object>((resolve, reject) => {
    
        var query:object = {};
        var condition:string;

        if (!type) condition = '$and';
        else condition = '$' + type;
        
        query[condition] = [];

        values.syncForEach(function (value:value_array,next_value) {
            var data = {};
            if (value.key) {
                data[value.key] = value.value;
            }else{
                data[value.name] = value.value;
            }
            query[condition].push(data);
            next_value();
        },() => {
            resolve(query);
        });

    });

}