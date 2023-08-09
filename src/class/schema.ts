import { CreateStatus } from './error';
import {schema} from '../types/schema';
import {validator} from '../validator';

interface SchemaInterface {schema: schema;}

class Schema implements SchemaInterface {

    schema:schema;
    type:'nested'|'single';
 
    constructor(schema:schema){
        this.schema = schema;
    }

    validate(value:any) {
        return new Promise<CreateStatus>(async (resolve, reject) => {
            var status = await validator(this.schema,value);
            resolve(status);
        })
    }
    
}

export{
    Schema,SchemaInterface
}