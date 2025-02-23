import {loadSchemas, Schema} from './index';
import { validate_inner_keys, validator } from './src';

loadSchemas(['requiments.json'])


async function main() {    
    console.log(await validator('test','a'));
}

main();
