import { get_schema, Schema, validationConfig, validator } from './';

validationConfig({
    files:['requiments.json'],
    messages:'messages'
})

async function main() {
    let schema =  await validator('special',Date.now()+(1000*60)+5);
    console.log(schema);
}

main();