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

        value.syncForEach(function (value:any,next) {
            if (schema.possible_types.indexOf(<any>(typeof value)) == -1) {
                return resolve('possible_types')
            }
            next();
        }, ()=> {
            return resolve('no_error')
        })
        
    });
}