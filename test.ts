import * as express from 'express';
import {Schema, loadSchemas, validateSwitch, validator, validateFields} from './index';

// var test = new Schema({
//     type:'url',
//     ignored_hostnames:['bilimetri.com']
// });

// async function main() {
//     console.log(await test.validate('http://bilimetri.com'))
// }

// main();