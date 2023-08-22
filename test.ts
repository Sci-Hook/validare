import {loadValidatonRules,db} from './index';
import {Schema, model,connect} from 'mongoose';
import * as express from 'express';

connect('mongodb://127.0.0.1:27017/test-db')

var schema = new Schema({username:String,armut:{elma:Number,sogan:String},test:String});
var user = model('Users' , schema);

loadValidatonRules(['requiments.json','test.json']);
var app = express();
app.use(express.json());

app.use('/:schema' , 
    db.validate_exist(user,[{name:'test',key:'username'}],{save:'test'}),
    db.replace('locals:test',[{name:'new_name?',key:'armut.elma'}]),
    (req,res) => {
        res.json(res.locals.test)
    }
);

app.listen(80);