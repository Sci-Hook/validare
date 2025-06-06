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
                if (schema.regex) {
                    
                    let pattern = schema.regex.pattern;
                    let flag = schema.regex.flag;

                    try {
                        var regex = new RegExp(pattern,flag);
                        if (!regex.test(value)) {
                            return resolve('regex')  
                        }
                    } catch (error) {
                        console.log("Invalid regex", schema)
                        console.log(error);
                    }
                    
                }
            }else{
                return resolve('regex');
            }
        }
     
        return resolve('no_error');

    });

}