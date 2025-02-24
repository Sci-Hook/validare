import {loadSchemas} from './index';
import { Schema, validator } from './src';
import { load_validare_messages } from './src/functions/validare-messages';

loadSchemas(['requiments.json'])
load_validare_messages('messages')

let username = new Schema({
    type:'string',
    min_length:20,
    name:'username'
})

async function main() {    
    console.log(await username.validate('a'));
}

main();
