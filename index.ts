import {Schema, validate} from './src';
import * as expess from 'express';

var app = expess();

app.use(expess.json());

app.use('/', 
    (req,res) => {
        res.json(res.locals.invalid_values);
    }
);


app.listen(80);