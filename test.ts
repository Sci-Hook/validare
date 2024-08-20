import * as express from 'express';
import {Schema, loadSchemas} from './index';
import { validateFields } from './src/express-middlewares/validate-fields';

loadSchemas(['requiments.json','test.json']);

var app = express();

app.use(express.json());

app.post('/' , validateFields([{dataname:'body.a',schema:'password'}],function (test) {
    console.log(test);
}), (req,res,next) => {
    
} )

app.listen(8080);






