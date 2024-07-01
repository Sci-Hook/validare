import {Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema({
    type:'number',
    max_length:'date 3:month:minus',
    min_length:'now-date:20'

});

async function main() {
    console.log(await a.validate(1));
}

main();
