import { Schema, validationConfig, validator } from './src';

validationConfig({
    files:['requiments.json'],
    messages:'messages'
})

let username = new Schema({
    type:'string',
    min_length:20,
    name:'username'
})

async function main() {    
    console.log(await validator('username','a'));
}

main();