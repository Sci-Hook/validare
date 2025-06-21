import { get_time } from "../../../functions/get-time";
import { number_schemas } from "../../../types/schemas";

function get_date(data:string) {
    return new Promise<number>((resolve, reject) => {
        var date_data = data.split(' ')[1];
        if (date_data) {
            var splitted =  date_data.split(':');
            var time:any = Number(splitted[0]);
            var unit:any = splitted[1];
            var type = splitted[2];
            var date = get_time(time,unit);
            if (type == 'add') {
                resolve(Date.now() + date);
            }else if(type == 'minus'){
                resolve(Date.now() - date);
            }
        }else{
            resolve(Date.now());
        }
    });
}

export function validate_numbers(schema:number_schemas,value) {
    return new Promise<'length'|'min_length'|'max_length'|'type'|'no_error'>(async (resolve, reject) => {

        var max_length = schema.max_length;
        var min_length = schema.min_length;
        var length = schema.length;
        
        if (schema.max_length) {
            if (typeof schema.max_length == 'string') {
                if (schema.max_length.startsWith('date')) {
                    max_length = await get_date(schema.max_length);
                }
            }
        }

        if (schema.min_length) {
            if (typeof schema.min_length == 'string') {
                if (schema.min_length.startsWith('date')) {
                    min_length = await get_date(schema.min_length);
                }   
            }
        }

        if (schema.length) {
            if (typeof schema.length == 'string') {
                if (schema.length.startsWith('date')) {
                    length = await get_date(schema.length);
                }   
            }
        }

        if (schema.type == "string-number") {
            value = parseInt(value,schema.base);
            if (Number.isNaN(value)) {
                return resolve('type');
            }
        }

        if (length) {
            if (value !== length) return resolve('length')
        }

        if (max_length) {
            if (value > max_length) return resolve("max_length")
        }
    
        if (min_length) {
            if (value < min_length) return resolve('min_length')
        }

        return resolve('no_error');

    });
}