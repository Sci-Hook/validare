import * as express from 'express';
import {Schema, loadSchemas, validateSwitch, validator} from './index';

async function main() {
    
    var schema = new Schema({
        type:'array',
        possible_types:[
            {type:'array',possible_types:[{type:'string'}]}
        ],
    })

    console.log(await schema.validate([['2'],['4'],['a',2,2,34]]))

}

main()