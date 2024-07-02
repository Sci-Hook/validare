import { Status } from './error';
import {schema} from '../types/schema';
import {validator} from '../validator';
import {create_id} from '../create-id';
import { randomize } from '../random-number';

interface SchemaInterface {schema: schema;}

class Schema implements SchemaInterface {

    schema:schema;
 
    constructor(schema:schema){
        this.schema = schema;
    }

    validate(value:any) {
        return new Promise<Status>(async (resolve, reject) => {
            var status = await validator(this.schema,value);
            resolve(status);
        });
    }
    
    create_id(){
        return new Promise<string>(async (resolve, reject) => {
            var id = await create_id(this.schema);
            resolve(id);
        });
    }
    
    random(){
        return new Promise<string>(async (resolve, reject) => {

            if (this.schema.type == 'number' || this.schema.type == 'bigint' || this.schema.type == 'string-number') {

                var randomized_number = await randomize({
                    max:this.schema.max_length,
                    min:this.schema.min_length,
                    len:this.schema.length
                });
                
                if (randomized_number) {
                    var base = 10;
                    if (this.schema.base) {
                        base = this.schema.base;
                    }
                    resolve(randomized_number.toString(base));
                }

            }
        })
    }

}

export{
    Schema,
    SchemaInterface
}