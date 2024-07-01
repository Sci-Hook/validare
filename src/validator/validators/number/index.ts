import { get_time } from "../../../functions/get-time";
import { number_schemas } from "../../../types/schemas";

function get_date(data:string) {
    return new Promise<number>((resolve, reject) => {
        var date_data = data.split(' ')[1];
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
    });
}

export function validate_numbers(schema:number_schemas,value) {
    return new Promise<'length'|'min_length'|'max_length'|'type'|'no_error'>(async (resolve, reject) => {



        if (schema.max_length) {
            if (typeof schema.max_length == 'string') {
                if (schema.max_length.startsWith('date')) {
                    console.log(get_date());
                }   
            }
        }

       

        if (schema.type == "string-number") {
            value = parseInt(value,schema.base);
            if (Number.isNaN(value)) {
                return resolve('type');
            }
        }

        if (schema.length) {
            if (value !== schema.length) return resolve('length')
        }
        if (schema.max_length) {
            if (value > schema.max_length) return resolve("max_length")
        }
        if (schema.min_length) {
            if (value < schema.min_length) return resolve('min_length')
        }

        return resolve('no_error');

    });
}