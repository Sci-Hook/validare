import {Schema, validator,loadSchemas} from './index';

loadSchemas(['test.json'])

async function main() {    
    console.log(await validator('website','http://test.roım'));
}

main();
