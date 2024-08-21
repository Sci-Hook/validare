import * as express from 'express';
import {Schema, loadSchemas, validateSwitch, validator} from './index';

async function main() {
    
    var schema = new Schema({
        type:'array',
        possible_types:[
            {type:'string','max_length':15},
            {type:'number','max_length':15}
        ],
    })

    console.log(await schema.validate(['asdasd','asdasd','asdasd',20]))

}

main()