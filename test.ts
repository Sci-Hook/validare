import * as express from 'express';
import {Schema, loadSchemas, validateSwitch} from './index';

async function main() {
    
    var schema = new Schema({
        type:'array',
        possible_types:['boolean'],
    })

    console.log(await schema.validate([true,false]))

}

main()