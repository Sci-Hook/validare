import { readFileSync } from 'fs';
import {ID, Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema({
    type:'values',
    values:['tost','most','vafır'],
});

var file = readFileSync('C:\\Users\\lim10\\Documents\\examples\\example.wav')

async function main() {
    console.log(await ID({length:60,type:'string'}));
}

main();