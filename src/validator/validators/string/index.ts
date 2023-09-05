import { string_schemas } from "../../../types/schemas";

export function validate_string(schema:string_schemas,value) {

    return new Promise<'length'|'min_length'|'max_length'|'type'|'no_error'|'empty'|'regex'>(async (resolve, reject) => {
        
        // Empty string validation
        if (schema.ignore_empty) {
            if (value === '') return resolve('empty')
        }
        // Empty string validation

        if (schema.regex) {
            if (typeof value == 'string') {
                if (typeof schema.regex == 'string') {
                    
                    var splitted = schema.regex.split('/');
                    var flag = schema.regex.split('/')[splitted.length -1];
                    var pattern = schema.regex.replace(flag,'');
                    pattern = pattern.slice(1,-1);
                    try {
                        var regex = new RegExp(pattern,flag);
                        if (!value.match(regex)) return resolve('regex');
                    } catch (error) {
                        console.log("Invalid regex", schema)
                        console.log(error);
                    }
                }else{
                    if (!value.match(schema.regex)) return resolve('regex');
                }
            }else{
                return resolve('regex');
            }
        }
     
        return resolve('no_error');

    });

}