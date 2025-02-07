import {validator,loadSchemas, Schema} from './index';

loadSchemas(['requiments.json'])

let schema = new Schema({
    type:'string'
})

async function main() {    
    let test ;
    console.log(await schema.validate(test));
}

main();
