import {loadSchemas, Schema} from './index';

loadSchemas(['requiments.json'])

let schema = new Schema({
    type:'url',
    origins:[
        "http://127.0.0.1:8080"
    ]
})

async function main() {    

    // console.log(await schema.validate('http://127.0.0.1:8080/a'));
}

main();
