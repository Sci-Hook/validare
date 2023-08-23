import { readFileSync } from 'fs';
import {loadValidatonSchemas} from './index';
import {Schema} from './index';

loadValidatonSchemas(['requiments.json','test.json']);

var a = new Schema({extension:['mp3']});

var buffer = readFileSync('C:\\Users\\lim10\\Documents\\examples\\example.aac');

async function main() {
    console.log(await a.validate(buffer));
}

main();