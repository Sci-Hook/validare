import {loadValidatonSchemas} from './index';
import {Schema} from './index';
import { loadSchemas } from './src';

loadSchemas(['requiments.json','test.json']);

var a = new Schema('username');

async function main() {
    console.log(await a.validate('afdsfsdfdsfdsfsdfdsfaaa'));
}

main();