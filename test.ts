import * as express from 'express';
import {Schema, loadSchemas, validateSwitch, validator, validateFields} from './index';
import { remoteLoadFiles } from './src/functions/remote-load';

var test = new Schema({
    type:'doi'
});

async function main() {
    console.log(await test.validate('10.3389/fendo.2018.00513'))
}

main();