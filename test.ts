import { readFileSync } from 'fs';
import {loadValidatonRules,Schema,validate_files,validate_request,} from './index';
import * as express from 'express';
import * as multer from 'multer';

loadValidatonRules(['requiments.json','test.json']);

var file = new Schema({
    type:'file',
    extension:['aac']
});

var buffer = readFileSync('examples/image.jpg')

async function main() {
    var a = await file.validate(buffer);
}

main();

var upload = multer();

var app = express();

app.use(express.json());

app.use('/' , 
    upload.array('test'),
    validate_files(['test']),
    (req,res) => {
        res.send('res.locals')
    }
);

app.listen(9090);