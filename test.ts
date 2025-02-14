import {loadSchemas, Schema} from './index';
import { validate_inner_keys } from './src';

loadSchemas(['requiments.json'])

let schema = new Schema({
    type:'url',
    origins:[
        "http://127.0.0.1:8080"
    ]
})

let test = {
    "test":{
        mest:{
            least:'hello'
        }
    }
}

async function main() {    
    let result = await validate_inner_keys('test.mest.least',test)
    console.log(result);
}

main();
