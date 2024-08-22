import * as express from 'express';
import {Schema, loadSchemas, validateSwitch, validator} from './index';

async function main() {
    
    var schema = new Schema({type:'base64'})

    console.log(await schema.validate('ZkdzRA=='))

}

main()