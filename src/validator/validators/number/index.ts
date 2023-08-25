import { number_schemas } from "../../../types/schemas";

export function validate_numbers(schema:number_schemas,value) {
    return new Promise<'length'|'min_length'|'max_length'|'type'|'no_error'>(async (resolve, reject) => {
        
        if (schema.type == "string-number") {
            value = Number(value);
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