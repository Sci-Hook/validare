import {Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema({
    type:'string-number',
    base:16,
    max_length:9999999999999999,
    min_length:1000000000000000
});

async function main() {
    console.log(await a.random());
}

main();
