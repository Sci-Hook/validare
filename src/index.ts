import {loadFiles} from 'scihook-schema-loader';

function loadSchemas(files:string|string[]) {
    loadFiles('validare',files)
}

//tpyes
import {schema} from './types/schema';
//types

import {Schema} from './class/schema';
import {create_id as ID} from './create-id';
import {validator} from './validator'

export{
    schema,
    Schema,
    loadSchemas,
    validator,
    ID
}