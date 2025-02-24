import {loadSchemas, Schema} from './index';
import { validate_inner_keys, validator } from './src';
import { load_validare_messages } from './src/functions/validare-messages';

loadSchemas(['requiments.json'])

load_validare_messages('messages')

async function main() {    
    console.log(await validator('username','a'));
}

main();
