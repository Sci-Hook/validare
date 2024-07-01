import {Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema({
    type:'number',
    max_length:'date 5:year:add',
    min_length:"date 5:year:minus",

});

async function main() {
    console.log(await a.validate(1514754000000));
}

main();
