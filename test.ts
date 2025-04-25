import { get_schema, Schema, validationConfig, validator } from './';

validationConfig({
    files:['requiments.json'],
    messages:'messages'
})

async function main() {
    let schema =  await get_schema('special')
    console.log(schema);
}

main();