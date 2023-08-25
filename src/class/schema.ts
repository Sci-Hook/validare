import { Status } from './error';
import {schema} from '../types/schema';
import {validator} from '../validator';
import {create_id} from '../create-id';

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
    
}

export{
    Schema,
    SchemaInterface
}