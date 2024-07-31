import {Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema({
    type:'string',
    ignored:['armut','yumurta','kebab']
});

async function main() {
    console.log(await a.validate('kebab'));
}

main();
