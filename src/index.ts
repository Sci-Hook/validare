import {loadFiles} from 'scihook-schema-loader';
import 'syncforeachloop';

async function loadSchemas(files:string|string[]) {
    loadFiles('validare',files);
}

//tpyes
import {schema} from './types/schema';
//types

import {Schema} from './class/schema';
import {create_id as ID} from './create-id';
import {validator} from './validator'
import {validateFields} from './express-middlewares/validate-fields'
import {validateSwitch} from './express-middlewares/validate-switch'
import {validateFile} from './express-middlewares/validate-file'
import {validate_element} from './functions/validator-inputs'
import './functions/validator-inputs';

export{
    schema,
    Schema,
    loadSchemas,
    validator,
    ID,
    validateFields,
    validateSwitch,
    validateFile,
    validate_element
}