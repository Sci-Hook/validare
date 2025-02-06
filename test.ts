import {Schema, validator,loadSchemas} from './index';

loadSchemas(['requiments.json'])

async function main() {    
    console.log(await validator('username','a',{dont_validate:['min_length']}));
    console.log(await validator('username','a'));
}

main();
