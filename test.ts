import { Schema, validationConfig, validator } from './';

validationConfig({
    files:['requiments.json'],
    messages:'messages'
})

let username = new Schema({
    type:'string',
})

async function main() {    
    console.log(await validator('username','yusufyıgıtarslan'));
}

main();