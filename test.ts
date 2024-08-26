import * as express from 'express';
import {Schema, loadSchemas, validateSwitch, validator, validateFields} from './index';

// loadSchemas('test.json')

// var app = express();

// app.use(express.json());

// app.post('/' , validateFields(['body.username?','body.password'],function (err,req,res) {
//     res.json(err)
// }))

// app.listen(5000);