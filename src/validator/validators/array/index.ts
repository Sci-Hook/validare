import { validator } from "../..";
import { array } from "../../../types/schemas";

export function validate_array(schema:array,value:any) {
    return new Promise<'type'|'max_element'|'min_element'|'no_error'|'possible_types'>(async (resolve, reject) => {
        
        if (typeof value != 'object') return resolve('type')
        if (!Array.isArray(value)) return resolve('type')

        if (schema.max_element) {
            if (value.length > schema.max_element) {
                return resolve('max_element')
            }  
        }

        if (schema.min_element) {
            if (value.length < schema.min_element) {
                return resolve('min_element')
            }  
        }

        if (schema.max_element_eq) {
            if (value.length > schema.max_element_eq) {
                return resolve('max_element')
            }  
        }

        if (schema.min_element_eq) {
            if (value.length < schema.min_element_eq) {
                return resolve('min_element')
            }  
        }

        if (schema.possible_types) {
            return value.syncForEach(function (value:any,next_value) {

                schema.possible_types?.syncForEach(async function (possible_type,next_type) {
                    var result = await validator(possible_type,value);
                    if (result.status) return next_value();
                    next_type()
                },() => {
                    resolve('possible_types')
                });

            }, ()=> {
                return resolve('no_error')
            })
        }
        
        return resolve('no_error')

        
    });
}