import {Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema('username');

async function main() {
    console.log(await a.validate('afdsfsdfdsfdsfsdfdsfaaa'));
}

main();