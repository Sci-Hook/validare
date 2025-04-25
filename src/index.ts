import {loadFiles} from 'scihook-schema-loader';
import 'syncforeachloop';

async function validationConfig(options:{
        files?:string|string[],
        messages?:string
    }) {

    global.validare = {}

    if (options.files) loadFiles('validare',options.files);    
    if (options.messages) load_validare_messages(options.messages);

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
import { validate_inner_keys } from './functions/validate-inner-keys';
import { get_schema } from './functions/get-schema';
import { load_validare_messages, load_validare_messages as loadValidareMessages } from './functions/validare-messages';
import './functions/validator-inputs';

export{
    schema,
    Schema,
    validationConfig,
    validator,
    ID,
    validateFields,
    validateSwitch,
    validateFile,
    validate_element,
    validate_inner_keys,
    loadValidareMessages,
    get_schema
}