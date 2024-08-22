import * as express from 'express';
import * as multer from 'multer';
import {Schema, loadSchemas, validateSwitch, validator,validateFile} from './index';

loadSchemas(['test.json'])

var app = express();
var upload = multer();

app.post('/' , 
    upload.single('image'),  
    validateFile('image',(a,b,c) => {c.json(a)}),  
    (req,res,next) => {
        res.json('ok');
    }
);

app.listen(8000);