import {Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema({
    type:'string',
    casetype:'combined'
});

async function main() {
    console.log(await a.validate('ABsC'));
}

main();
