import { readFileSync } from 'fs';
import {ID, Schema, loadSchemas} from './index';

loadSchemas(['requiments.json','test.json']);

var a = new Schema({
    type:'string',
    chars:'binary' 
});

async function main() {
    console.log(await a.create_id());
}

main();