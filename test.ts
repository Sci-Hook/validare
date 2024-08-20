import * as express from 'express';
import {Schema, loadSchemas, validateSwitch} from './index';
import { validateFields } from './src/express-middlewares/validate-fields';

loadSchemas(['requiments.json','test.json']);

var app = express();

app.use(express.json());

app.post('/' , 
    validateSwitch('body.test', 
        {
            'armut':['password'],
            'kebap':['username'],
            'default':['username','password']
        },
    (test,req,res) => res.json(test)),
    () => {}
);

app.listen(8000);