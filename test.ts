import { readFileSync } from 'fs';
import {Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema({
    type:'email',
    services:['gmail.com'],
});

var file = readFileSync('C:\\Users\\lim10\\Documents\\examples\\example.wav')

async function main() {
    console.log(await a.validate('lim10tech@gmail.com'));
}

main();