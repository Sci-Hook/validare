import { Schema, validationConfig, validator } from './';

validationConfig({
    files:['requiments.json'],
    messages:'messages'
})

async function main() {    
    console.log(await validator('special',''));
}

main();