import { schema } from "../../types/schema";

var values = {
    bit:{ 
        bit:2**0 /8,
        kib:2**10 /8,
        mib:2**20/8,
        gib:2**30/8,
        tib:2**40/8
    },
    byte:{
        byte:2**0,
        kb:2**10,
        mb:2**20,
        gb:2**30,
        tb:2**40 
    }
}

export function validate_size(schema:schema,value) {

    return new Promise<'no_error'|'max_size'|'min_size'>((resolve, reject) => {

        var min_size;
        var max_size;

        if (schema.min_size) {
            if (values.byte[schema.min_size.size_type]) min_size = schema.min_size.size * values.byte[schema.min_size.size_type];
            if (values.bit[schema.min_size.size_type]) min_size = schema.min_size.size * values.bit[schema.min_size.size_type];
        }
    
        if (schema.max_size) {
            if (values.byte[schema.max_size.size_type]) max_size = schema.max_size.size * values.byte[schema.max_size.size_type];
            if (values.bit[schema.max_size.size_type]) max_size = schema.max_size.size * values.bit[schema.max_size.size_type]
        }
        
        var size = Buffer.byteLength(value);

        if (size > max_size) {
            return resolve('max_size');
        }

        if (size < min_size) {
            return resolve('max_size');
        }
        return resolve('no_error');

    });
    
}