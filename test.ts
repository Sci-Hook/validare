import {loadValidatonSchemas} from './index';
import {Schema} from './index';

loadValidatonSchemas(['requiments.json','test.json']);

var a = new Schema({hash:{alogrithm:'sha256',key:'asfsdafdasf'}});

async function main() {
    console.log(await a.create_hash('aa'));
}

main();