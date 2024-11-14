import * as express from 'express';
import {Schema, loadSchemas, validateSwitch, validator, validateFields} from './index';

var test = new Schema({
    type:'unicode-name',
    allowed_chars:' .'
});

async function main() {    
    console.log(await test.validate('Emirhan A. Gerçeker'))
}

main();
