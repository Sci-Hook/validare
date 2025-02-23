import {loadSchemas, Schema} from './index';
import { validate_inner_keys } from './src';

loadSchemas(['requiments.json'])

let schema = new Schema({
    type:'unicode-name',
    max_length:20
    
})

async function main() {    
    console.log(await schema.validate(undefined));
}

main();
